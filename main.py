import turtle 
import math 
import time

import maze
from Pen import Pen 

window = turtle.Screen()
window.bgcolor("black")
window.title ("My team's maze game!")
window.setup(700, 700)

#Register shapes
turtle.register_shape("img/goku_right.gif")
turtle.register_shape("img/goku_left.gif")
turtle.register_shape("img/treasure.gif")
turtle.register_shape("img/wall.gif")

class Player(turtle.Turtle):
    def __init__(self):
        turtle.Turtle.__init__(self)
        self.shape("square")
        self.color("blue")
        self.penup()
        self.speed(0)

        #move of player
    def go_up(self):
        self.goto(self.xcor(), self.ycor() + 24)

    def go_down(self):
        self.goto(self.xcor(), self.ycor() - 24)

    def go_left(self):
        self.goto(self.xcor() - 24, self.ycor())
    
    def go_right(self):
        self.goto(self.xcor() + 24, self.ycor())
        
        
#Create levels list
levels = [""]

#Define first level
level_1 = maze.generateMaze(20, 20)

#Add maze to mazes list 
levels.append(level_1)

#Create Level Setup Function
def setup_maze(maze):
    for y in range(len(maze) - 1):
        for x in range(len(maze[y]) - 1):
            value = maze[y][x]
            screen_x = -288 + (x * 24)
            screen_y = 288 - (y * 24)

            if value == 1:
                pen.goto(screen_x, screen_y)
                pen.stamp()
            elif value == 0:
                continue
            elif value == 2:
                player.goto(screen_x, screen_y)
            elif value == 3: 
                pen.goto(screen_x, screen_y)
                pen.shape("square")
                pen.color("red")
                pen.stamp()
                pen.color("white")

#Create class instance
pen = Pen()
player = Player()

#Set up the level
setup_maze(levels[1])

#Keyboard Binding
turtle.listen()
turtle.onkey(player.go_up, "Up")
turtle.onkey(player.go_down, "Down")
turtle.onkey(player.go_left, "Left")
turtle.onkey(player.go_right, "Right")

#Turn off screen update
window.tracer()
#Main game loop
while True:
    window.update()


