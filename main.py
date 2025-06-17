import turtle 
import tkinter as tk
import maze
from Pen import Pen 
from Player import Player
import DFS
import aStar
import DIJKSTRA
import BFS
import IDAStar
import BeamSearch

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

#Clear button
clear_buttonClear = tk.Button(root, text="Clear", font=("Arial", 20),
                         bg="gray", fg="white", command=maze.clearPath)
clear_buttonClear.place(relx=1.0, rely=0.0, anchor="ne", x=-40, y=110)

#DFS Button
dfs_buttonDFS = tk.Button(root, text = "DFS", font=("Arial", 24, "bold"),
                        bg="red", fg="white", command=lambda : DFS.drawMazeDFS(level))
dfs_buttonDFS.place(relx=0.0, rely=0.0, anchor="nw", x=60, y=40)

#A star Button
dfs_buttonAStar = tk.Button(root, text = "A Star", font=("Arial", 24, "bold"),
                        bg="red", fg="white", command=lambda : aStar.drawMazeAStar(level))
dfs_buttonAStar.place(relx=0.0, rely=0.0, anchor="nw", x=200, y=40)

#DIJKSTRA Button
dfs_buttonDIJKSTRA = tk.Button(root, text = "DIJKSTRA", font=("Arial", 24, "bold"),
                        bg="red", fg="white", command=lambda : DIJKSTRA.drawMazeDijkstra(level))
dfs_buttonDIJKSTRA.place(relx=0.0, rely=0.0, anchor="nw", x = 370, y = 40)


#BFS Button
dfs_buttonBFS = tk.Button(root, text = "BFS", font=("Arial", 24, "bold"),
                        bg="red", fg="white", command=lambda : BFS.drawMazeBFS(level))
dfs_buttonBFS.place(relx=0.0, rely=0.0, anchor="nw", x = 600, y = 40)

#IDAstar Button
dfs_buttonIDAStar = tk.Button(root, text = "IDAStar", font=("Arial", 24, "bold"),
                        bg="red", fg="white", command=lambda : IDAStar.drawMazeIDAStar(level))
dfs_buttonIDAStar.place(relx=0.0, rely=0.0, anchor="nw", x = 740, y = 40)

#BeamSearch Button
dfs_buttonBeamSearch = tk.Button(root, text = "BeamSearch", font=("Arial", 24, "bold"),
                        bg="red", fg="white", command=lambda : BeamSearch.drawMazeBeamSearch(level))
dfs_buttonBeamSearch.place(relx=0.0, rely=0.0, anchor="nw", x = 940, y = 40)


#Turn off screen update
window.tracer()
#Main game loop
while True:
    window.update()


