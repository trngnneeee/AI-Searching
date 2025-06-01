import turtle 
import math 
import time

window = turtle.Screen()
window.bgcolor("black")
window.title ("My team's maze game!")
window.setup(700, 700)

#Register shapes
turtle.register_shape("goku_right.gif")
turtle.register_shape("goku_left.gif")
turtle.register_shape("treasure.gif")
turtle.register_shape("wall.gif")

#Create Pen
class Pen(turtle.Turtle):
    def __init__(self):
        turtle.Turtle.__init__(self)
        self.shape("square")
        self.color("white")
        self.penup()
        self.speed(0)

class Player(turtle.Turtle):
    def __init__(self):
        turtle.Turtle.__init__(self)
        self.shape("square")
        self.color("blue")
        self.penup()
        self.speed(0)

#Create levels list
levels = [""]

#Define first level
level_1 = [
"XXXXXXXXXXXXXXXXXXXXXXX",
"P   X                 X",
"XXX X XXXXXXXXXXXXXXX X",
"X   X X             X X",
"X X X XXXXXXXXXXXXX X X",
"X X   X           X X X",
"X X XXX XXXXXXXX  X X X",
"X X X   X       X X X X",
"X X XXXXXXXXXXXX  X X X",
"X X   X       X X X X X",
"X XXXXX XXXXXX  X X X X",
"X       X     X   X X X",
"XXXXXXXX XX XXXXXXX X X",
"X         X         X X",
"X XXXXXXXXX XXXXXXX X X",
"X X               X   X",
"X X XXXXXXXXXXXXXXXX XX",
"X X X            X   XX",
"X X XXXXXXXXXXXXXXXX XX",
"X   X               X X",
"XXXXXXXXXXXXXXX XXXXX X",
"X                 X X X",
"X XXXXXXXXXXXXXXX X X X",
"X                 X   X",
"XXXXXXXXXXXXXXXXXXXXXXX"
]

#Add maze to mazes list 
levels.append(level_1)

#Create Level Setup Function
def setup_maze(level):
    for y in range(len(level)):
        for x in range(len(level[y])):

            character = level[y][x]

            screen_x = -288 + (x * 24)
            screen_y = 288 - (y * 24)

            if character == "X":
                pen.goto(screen_x, screen_y)
                pen.stamp()

            if character == "P":
               player.goto(screen_x, screen_y)

#Create class instance
pen = Pen()
player = Player()

#Set up the level
setup_maze(levels[1])

#Main game loop
while True:
    pass


