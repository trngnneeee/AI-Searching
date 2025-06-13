import turtle 
import tkinter as tk
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

root = window._root

#Gen Maze
screen_width = window._root.winfo_screenwidth()
screen_height = window._root.winfo_screenheight()

maze_width = (screen_width // 32) | 1
maze_height = (screen_height // 32) | 1
level = maze.generateMaze(maze_height, maze_width)

#Set up the level
maze.setup_maze(level)
# DFS.drawMazeDFS(level)

def regenerateMaze():
    global level
    level = maze.generateMaze(maze_height, maze_width)
    turtle.clear()
    turtle.bgcolor("black")
    window.title("My team's maze game!")

    maze.setup_maze(level)
    DFS.drawMazeDFS(level)

#button
#gen map button
gen_maze_button = tk.Button(root, text = "Generate maze", font=("Arial", 24, "bold"),
                        bg="red", fg="white", command=lambda : regenerateMaze())

gen_maze_button.place(relx=1.0, rely=0.0, anchor="ne", x=-40, y=40)

#DFS Button
dfs_button = tk.Button(root, text = "DFS", font=("Arial", 24, "bold"),
                        bg="red", fg="white", command=lambda : DFS.drawMazeDFS(level))
dfs_button.place(relx=0.0, rely=0.0, anchor="nw", x=60, y=40)

#A star Button
dfs_buttonAStar = tk.Button(root, text = "A Star", font=("Arial", 24, "bold"),
                        bg="red", fg="white", command=lambda : DFS.drawMazeDFS(level))
dfs_buttonAStar.place(relx=0.0, rely=0.0, anchor="nw", x=200, y=40)

#Turn off screen update
window.tracer()
#Main game loop
while True:
    window.update()


