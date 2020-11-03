// The point and size class used in this program
function Point(x, y) {
    this.x = (x) ? parseFloat(x) : 0.0;
    this.y = (y) ? parseFloat(y) : 0.0;
}

function Size(w, h) {
    this.w = (w) ? parseFloat(w) : 0.0;
    this.h = (h) ? parseFloat(h) : 0.0;
}
var helperfun = {
    L1: (p1, p2) => {
        return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    },
    L2: (p1, p2) => {
        return Math.hypot(p1.x - p2.x, p1.y - p2.y);
    }
}



const collision_mask = {
    MONSTER: 'monster',
    PLAYER: 'player',
    BULLET: 'bullet',
    WALL: 'wall'
}


class PlanarObject {
    constructor(x, y, w, h) {
        this.position = new Point(x, y);       // The size of the game screen
        this.boundingBox = new Size(w, h);
    }
}

class Monster extends PlanarObject {
    constructor(x, y) {
        super(x, y, 50, 50);
    }
}
class bullet extends PlanarObject {
    constructor(x, y) {
        super(x, y, 50, 50);
    }
}


// Helper function for checking intersection between two rectangles
// simple AABB
function intersect(pos1, size1, pos2, size2) {
    return (pos1.x < pos2.x + size2.w && pos1.x + size1.w > pos2.x &&
        pos1.y < pos2.y + size2.h && pos1.y + size1.h > pos2.y);
}


// The player class used in this program
function Player() {
    this.node = document.getElementById("player");
    this.position = PLAYER_INIT_POS;
    this.motion = motionType.NONE;
    this.verticalSpeed = 0;
}

Player.prototype.isOnPlatform = function () {
    var platforms = document.getElementById("platforms");
    for (var i = 0; i < platforms.childNodes.length; i++) {
        var node = platforms.childNodes.item(i);
        if (node.nodeName != "rect") continue;

        var x = parseFloat(node.getAttribute("x"));
        var y = parseFloat(node.getAttribute("y"));
        var w = parseFloat(node.getAttribute("width"));
        var h = parseFloat(node.getAttribute("height"));

        if (((this.position.x + PLAYER_SIZE.w > x && this.position.x < x + w) ||
            ((this.position.x + PLAYER_SIZE.w) == x && this.motion == motionType.RIGHT) ||
            (this.position.x == (x + w) && this.motion == motionType.LEFT)) &&
            this.position.y + PLAYER_SIZE.h == y) return true;
    }
    if (this.position.y + PLAYER_SIZE.h == SCREEN_SIZE.h) return true;

    return false;
}

Player.prototype.collidePlatform = function (position) {
    var platforms = document.getElementById("platforms");
    for (var i = 0; i < platforms.childNodes.length; i++) {
        var node = platforms.childNodes.item(i);
        if (node.nodeName != "rect") continue;

        var x = parseFloat(node.getAttribute("x"));
        var y = parseFloat(node.getAttribute("y"));
        var w = parseFloat(node.getAttribute("width"));
        var h = parseFloat(node.getAttribute("height"));
        var pos = new Point(x, y);
        var size = new Size(w, h);

        if (intersect(position, PLAYER_SIZE, pos, size)) {
            position.x = this.position.x;
            if (intersect(position, PLAYER_SIZE, pos, size)) {
                if (this.position.y >= y + h)
                    position.y = y + h;
                else
                    position.y = y - PLAYER_SIZE.h;
                this.verticalSpeed = 0;
            }
        }
    }
}

Player.prototype.collideScreen = function (position) {
    if (position.x < 0) position.x = 0;
    if (position.x + PLAYER_SIZE.w > SCREEN_SIZE.w) position.x = SCREEN_SIZE.w - PLAYER_SIZE.w;
    if (position.y < 0) {
        position.y = 0;
        this.verticalSpeed = 0;
    }
    if (position.y + PLAYER_SIZE.h > SCREEN_SIZE.h) {
        position.y = SCREEN_SIZE.h - PLAYER_SIZE.h;
        this.verticalSpeed = 0;
    }
}


//
// Below are constants used in the game
//
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var PLAYER_SIZE = new Size(40, 40);         // The size of the player
var MONSTER_SIZE = new Size(20, 20);         // The size of the player

var SCREEN_SIZE = new Size(600, 560);       // The size of the game screen
var PLAYER_INIT_POS = new Point(0, 0);     // The initial position of the player

var MOVE_DISPLACEMENT = 5;                  // The speed of the player in motion
var JUMP_SPEED = 15;                        // The speed of the player jumping
var VERTICAL_DISPLACEMENT = 1;              // The displacement of vertical speed

var GAME_INTERVAL = 25;                     // The time interval of running the game


//
// Variables in the game
//
var motionType = { NONE: 0, LEFT: 1, RIGHT: 2 }; // Motion enum

var player = null;                          // The player object
var gameInterval = null;                    // The interval
var zoom = 1.0;                             // The zoom level of the screen




function detectfreespace() {
    var freeSpaceForMonsterSpown = [];

    let platforms = document.getElementById("platforms");
    let count = 0;
    for (let x = 0; x < SCREEN_SIZE.w; x += MONSTER_SIZE.w / 2) {
        for (let y = 0; y < SCREEN_SIZE.h; y += MONSTER_SIZE.h / 2) {
            // let PlanarObject 
            let block = new PlanarObject(x, y, MONSTER_SIZE.w, MONSTER_SIZE.h);
            let flag = true;

            for (let i = 0; i < platforms.childNodes.length; i++) {
                var node = platforms.childNodes.item(i);
                if (node.nodeName != "rect") continue;

                let x = parseFloat(node.getAttribute("x"));
                let y = parseFloat(node.getAttribute("y"));
                let w = parseFloat(node.getAttribute("width"));
                let h = parseFloat(node.getAttribute("height"));
                let pos = new Point(x, y);
                let size = new Size(w, h);

                if (intersect(block.position, block.boundingBox, pos, size)) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                if (helperfun.L2(new Point(x, y), player.position) > 100) {
                    freeSpaceForMonsterSpown.push(new Point(x, y));

                    // let svgNS = svg.namespaceURI;

                    // let mRect = document.createElementNS(svgNS, 'rect');
                    // mRect.setAttribute('x', x);
                    // mRect.setAttribute('y', y);
                    // mRect.setAttribute('width', MONSTER_SIZE.w);
                    // mRect.setAttribute('height', MONSTER_SIZE.h);
                    // mRect.setAttribute('fill', 'black');

                    // platforms.appendChild(mRect);
                }
                // freeSpaceForMonsterSpown.push(new Point(x, y));
                // count++;

                // var svgNS = svg.namespaceURI;

                // var mRect = document.createElementNS(svgNS,'rect');
                // mRect.setAttribute('x',x);
                // mRect.setAttribute('y',y);
                // mRect.setAttribute('width',MONSTER_SIZE.w);
                // mRect.setAttribute('height',MONSTER_SIZE.h);
                // mRect.setAttribute('fill','black');

                // platforms.appendChild(mRect);

            }
        }
    }
    let generator = function*(){
        var i = freeSpaceForMonsterSpown.length;
        while (i--) {
            yield freeSpaceForMonsterSpown.splice(Math.floor(Math.random() * (i+1)), 1)[0];
        }
    };
    return generator();
}

function generateMonster(pos) {
console.log(`generateMonster x: ${pos.x} y:${pos.y}`);
}
function generateGoodStuff(pos) {
console.log(`generateGoodStuff x: ${pos.x} y:${pos.y}`);

}


// Should be executed after the page is loaded
function load() {
    // Attach keyboard events
    document.addEventListener("keydown", keydown, false);
    document.addEventListener("keyup", keyup, false);

    // Create the player
    player = new Player();

    let it = detectfreespace();
    for (let i=0;i<6;i++){
        generateMonster(it.next().value );
    }
    for (let i=0;i<8;i++){
        generateGoodStuff(it.next().value );
    }
    // Start the game interval
    gameInterval = setInterval("gamePlay()", GAME_INTERVAL);
}


//
// This is the keydown handling function for the SVG document
//
function keydown(evt) {
    var keyCode = (evt.keyCode) ? evt.keyCode : evt.getKeyCode();

    switch (keyCode) {
        case "A".charCodeAt(0): {
            player.motion = motionType.LEFT;
            break;
        }

        case "D".charCodeAt(0): {
            player.motion = motionType.RIGHT;
            break;
        }

        case "H".charCodeAt(0): {
            // TODO: shoot
            break;
        }
        case "C".charCodeAt(0): {
            // TODO: cheat code
            break;
        }


        case "W".charCodeAt(0):
            if (player.isOnPlatform()) {
                player.verticalSpeed = JUMP_SPEED;
            }
            break;
    }
}


//
// This is the keyup handling function for the SVG document
//
function keyup(evt) {
    // Get the key code
    var keyCode = (evt.keyCode) ? evt.keyCode : evt.getKeyCode();

    switch (keyCode) {

        case "A".charCodeAt(0): {
            if (player.motion == motionType.LEFT) player.motion = motionType.NONE;
            break;
        }

        case "D".charCodeAt(0): {
            if (player.motion == motionType.RIGHT) player.motion = motionType.NONE;
            break;
        }

        case "H".charCodeAt(0): {
            // TODO: shoot
            break;
        }
        case "C".charCodeAt(0): {
            // TODO: cheat code
            break;
        }
    }
}


//
// This function updates the position and motion of the player in the system
//
function gamePlay() {
    // Check whether the player is on a platform
    var isOnPlatform = player.isOnPlatform();

    // Update player position
    var displacement = new Point();

    // Move left or right
    if (player.motion == motionType.LEFT)
        displacement.x = -MOVE_DISPLACEMENT;
    if (player.motion == motionType.RIGHT)
        displacement.x = MOVE_DISPLACEMENT;

    // Fall
    if (!isOnPlatform && player.verticalSpeed <= 0) {
        displacement.y = -player.verticalSpeed;
        player.verticalSpeed -= VERTICAL_DISPLACEMENT;
    }

    // Jump
    if (player.verticalSpeed > 0) {
        displacement.y = -player.verticalSpeed;
        player.verticalSpeed -= VERTICAL_DISPLACEMENT;
        if (player.verticalSpeed <= 0)
            player.verticalSpeed = 0;
    }

    // Get the new position of the player
    var position = new Point();
    position.x = player.position.x + displacement.x;
    position.y = player.position.y + displacement.y;

    // Check collision with platforms and screen
    player.collidePlatform(position);
    player.collideScreen(position);

    // Set the location back to the player object (before update the screen)
    player.position = position;

    updateScreen();
}


//
// This function updates the position of the player's SVG object and
// set the appropriate translation of the game screen relative to the
// the position of the player
//
function updateScreen() {
    // Transform the player
    player.node.setAttribute("transform", "translate(" + player.position.x + "," + player.position.y + ")");

    // Calculate the scaling and translation factors	

    // Add your code here

}
