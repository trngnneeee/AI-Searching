import turtle 
import math 
import time
import maze
from Pen import Pen 
from Player import Player
import DFS

window = turtle.Screen()
window.bgcolor("black")
window.title ("My team's maze game!")
window.setup(700, 700)

#Register shapes
# turtle.register_shape("img/goku_right.gif")
# turtle.register_shape("img/goku_left.gif")
# turtle.register_shape("img/treasure.gif")
# turtle.register_shape("img/wall.gif")
        
#Gen Maze
level = maze.generateMaze(20, 20)

#Set up the level
maze.setup_maze(level)
DFS.drawMazeDFS(level)

#Keyboard Binding
# turtle.listen()
# turtle.onkey(player.go_up, "Up")
# turtle.onkey(player.go_down, "Down")
# turtle.onkey(player.go_left, "Left")
# turtle.onkey(player.go_right, "Right")

#Turn off screen update
window.tracer()
#Main game loop
while True:
    window.update()


