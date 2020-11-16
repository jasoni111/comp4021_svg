import math

def f(x):
    rad = math.radians(x)
    print(r*math.sin(rad), end =" ")
    print(r*math.cos(rad), end =" ")

x = [0,120,240]
r = 100*math.sqrt(2)/2
for a in x:
    f(a)