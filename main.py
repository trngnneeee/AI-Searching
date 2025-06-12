import turtle 
import tkinter
import math 
import time
import maze
from Pen import Pen 
from Player import Player
import DFS

window = turtle.Screen()
window.bgcolor("black")
window.title ("My team's maze game!")
window._root.attributes("-fullscreen", True)

def exit_fullscreen():
    window._root.attributes("-fullscreen", False)

window.listen()
window.onkey(exit_fullscreen, "Escape")
        
#Gen Maze
screen_width = window._root.winfo_screenwidth()
screen_height = window._root.winfo_screenheight()

maze_width = (screen_width // 32) | 1
maze_height = (screen_height // 32) | 1
level = maze.generateMaze(maze_height, maze_width)

#Set up the level
maze.setup_maze(level)
DFS.drawMazeDFS(level)

#Turn off screen update
window.tracer()
#Main game loop
while True:
    window.update()


