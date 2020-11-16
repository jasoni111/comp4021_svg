starting screen

When the SVG starts you need to give the player some information
- [ ] +1 Include the title of the game and your name. Give a general introduction to the game and tell the player what he/she needs to do
- [ ] +1 Say what keys the user needs to press to play the game (left/right/jump/shoot)
- [ ] +2 Display the start button and game only starts after clicking the start button
## Handling of Player 10%
- [x] +2 marks – ‘Flip’ player when move left/ right
- [ ] +2 marks – The player can jump/ move left/ move right/ shoot on any platform
- [x] +2 marks – Appropriate appearance for the player (the player looks like a player)
- [x] +2 marks – The player name is appropriately shown at the top of the player (as shown above) , with ‘Anonymous’ used as the name if the user enters an empty string
- [ ] +2 marks – The player dies if it touches any monster or is shot by a bullet

## Handling of Monsters 12%

There must be at least 6 monsters

The monsters can all look the same, if you want

- [x] +2 marks – Appropriate appearance (they look like monsters)
- [x] +2 marks – Some appropriate animation of monsters (using any SVG animation command(s) except animateColor )
- [x] +2 marks – The monsters appear at random places at the start of the game but must not be very close to the player
- [x] +2 marks – The monsters move smoothly from one random location to another random location during the game
- [ ] +2 marks – ‘Flip’ monster when move left/ right
- [ ] +2 marks – There has exactly one special monster which can shoot bullet. There has at most one bullet in game window from the monster at a time.

## There must be at least 8 good things in the game 

- [x] +1 marks – Appropriate appearance (they look like something good)
- [x] +1 marks – The good things are generated at random places at the start of the game
- [x] +1 marks – The good things cannot appear within a platform, i.e. they should not overlap with any platforms
- [x] +1 marks – The player collects the good things by touching them. The collected good things are deleted from the DOM
- [ ] +2 marks – The player needs to collect all good things before he/she can go to the next level
## Vertical Platforms 
- [x] +4 marks – There are one ‘vertical’ platform (platforms that move up and down in the y axis)
## disappearing platforms 
- [x] +3 marks – There are three disappearing platforms. If the player stays on the disappearing platform after a certain period of time (i.e. 0.5 second), the disappearing platform will disappear and the player will fall down
- [x] +2 marks – Good visual effect showing the disappearing platform is going to disappear (i.e. changing the opacity or the color) After the platform has disappeared, it does not come back again.
- 
## Transmission Portal 4%
- [ ] +2 marks – There should have two portals appeared on the screen (shape and location is freely defined).  
- [ ] +2 marks – When player enters into one portal, it will appear at the position of another portal. 
## Shooting 6%
- [x] +2 marks – A player gets 8 bullets at the start of the game for each level and the number of remaining bullets is appropriately shown and updated in the GUI  
- [x] +2 marks –When facing left, the player shoots to the left (bullet is removed from DOM appropriately when it is off the screen on the left)
- [x] +2 marks – When facing right, the player shoots to the right (bullet is removed from DOM appropriately when it is off the screen on the right)
## Sound 
Use of sound
- [ ] +1 mark – Appropriate sound when the player shoots
- [ ] +1 mark – Appropriate sound when the player reaches the exit point
- [ ] +1 mark – Appropriate sound when the player dies
(touches monster or runs out of time)
- [ ] +1 mark – Appropriate sound when a monster dies
(is shot by the player)
- [ ] +1 mark – Appropriate continuous music during the game
## Time Remaining 4%
- The player needs to reach the exit point within a certain period of time i.e. 60 seconds
- The player will die if the player cannot reach the exit point within that time
- [x] +4 marks - Time count down is updated and displayed appropriately every second (perhaps using a setInterval() )
## Level Handling 6%
- When the game first begins, it is level 1.

- When the player reaches the exit point, the score from the
remaining time is added and the game moves to the next
level, which is harder (see other slides)
- Don’t forget you have to collect all good things before you
can finish the current level
- [ ] +1 mark – Appropriate appearance of the exit (looks like an exit)
- [ ] +2 marks – The current level is shown in the GUI, and is updated appropriately. It is incremented by one each time the player finishes a level and moves to the next level.
- [ ] +3 marks – The game is correctly re-started when the next level is started (i.e. score continues and is not reset to zero, etc.)

## Game Quality 8%
How playable the game is
- [x] +2 marks – The game gets harder in next level. This is achieved by adding four monsters per subsequent level. I.e. If level 1 starts with 6 monsters, then level 2 will start with 10 monsters, and level 3 will start with 14 monsters, and so on (the player always tarts with 8 bullets, whatever the level is)
- [ ] +0/4/6 marks – generally poor/ok/good game
- To get any marks in this section, your game must use a
different theme/images compared to the theme/images
given in the labs
- You will get no marks for this part if you use the same
theme/images provided in the labs

## Score Update and Display 4%
- [ ] +1 Score is updated at the end of each level. Add L * 100
points for passing level L.
- [ ] +1 And also add X points for each second of remaining time,
where you choose an appropriate value of X.
- [ ]  +1 Score is updated when a monster is shot – add Y points
when this happens, you choose an appropriate value of Y
- [ ]  +1 Score is updated when a good thing is touched – add Z
points when this happens, you choose the value of Z
## Cheat Mode 6%
- [ ]  +2 mark – In cheat mode, everything is the same as usual, but player will not die when colliding with a monster or shot by a bullet. And also the player will have infinite bullets in cheat mode (everything else works the same as usual)
- [ ]  +2 mark – user can press ‘c’ to enter cheat mode, which works appropriately. If user presses ‘c’ in the cheat mode, it will still keep the player in the cheat mode
- [ ]  +2 mark – user can press ‘v’ to leave cheat mode, which works appropriately. If user presses ‘v’ outside the cheat mode, then nothing happens
- [ ]  The player can turn on and off cheat mode whenever he/she wants to (i.e. this feature is useful for debugging your game while you build it)
## End of Game
If the player cannot reach the exit point during the required period of time, or touches a monster, or touches the bullets shot by the special monster, the player will die 
- [ ]  +2 marks – Score & name are inserted into a top 5 high score table at correct place, if score is high enough
- [ ]  +2 marks – High scores saved/ updated appropriately in the cookie(s)
- [ ]  +2 marks – Show players score and high score, see next slide.
- [ ]  +2 mark – Show a ‘Start again?’ button, if the player clicks on it the game begins again, and the user is asked for his/her name as usual, with the previously entered name used as the default text in the window (i.e. using prompt())
## Handling High Score Display
- [ ]   +1 mark – Appropriate title is shown above the high score table i.e. ‘High Score Table’
- [ ]   +4 mark – Top 5 scores are shown in descending order, with highest at the top, lowest at the bottom, this will include the player’s score if it was high enough. If the current player is within the top 5 scores, mark him/her with a different color
- [ ]   +3 marks – cookies are used appropriately to store everything











