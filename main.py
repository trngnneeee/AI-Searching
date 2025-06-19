import turtle 
import tkinter as tk
import flask as fk 
import maze 
from Pen import Pen 
from algorithms import DFS
from algorithms import aStar
from algorithms import DIJKSTRA
from algorithms import BFS
from algorithms import IDAstar
from algorithms import BeamSearch
from algorithms import BiDirectionalSearch
from algorithms import IDDFS

window = turtle.Screen()
window.bgcolor("black")
window.title ("My team's maze game!")

app = fk.Flask(__name__)

window._root.attributes("-fullscreen", True)
def exit_fullscreen():
    window._root.attributes("-fullscreen", False)

window.listen()
window.onkey(exit_fullscreen, "Escape")

root = window._root

def measure_time(func, *args, **kwargs):
    import time
    start = time.time()
    func(*args, **kwargs)
    end = time.time()
    return start, end

@app.route("/game")
def sendTime():
    start = 5 
    end = 2
    return fk.jsonify({start, end})

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
    level.clear()
    maze.clearPath()  # Xóa đường đi cũ
    
    level = maze.generateMaze(maze_height, maze_width)
    maze.setup_maze(level)
    DFS.drawMazeDFS(level)
# Danh sách các nút thuật toán và thông tin liên quan
button_specs = [
    # (text, command function, x, y)
    ("Generate maze", lambda: regenerateMaze(), 1.0, 0.0, "ne", -40, 40),
    ("Clear", lambda: maze.clearPath(), 1.0, 0.0, "ne", -40, 110),
    ("DFS", lambda: measure_time(DFS.drawMazeDFS, level), 0.0, 0.0, "nw", 60, 40),
    ("A Star", lambda: measure_time(aStar.drawMazeAStar, level), 0.0, 0.0, "nw", 200, 40),
    ("DIJKSTRA", lambda: measure_time(DIJKSTRA.drawMazeDijkstra, level), 0.0, 0.0, "nw", 370, 40),
    ("BFS", lambda: measure_time(BFS.drawMazeBFS, level), 0.0, 0.0, "nw", 600, 40),
    ("IDAStar", lambda: measure_time(IDAstar.drawMazeIDAStar, level), 0.0, 0.0, "nw", 740, 40),
    ("BeamSearch", lambda: measure_time(BeamSearch.drawMazeBeamSearch, level), 0.0, 0.0, "nw", 940, 40),
    ("BiDirectionalSearch", lambda: measure_time(BiDirectionalSearch.drawMazeBiDirectionalSearch, level), 0.0, 0.0, "nw", 60, 750),
    ("IDDFS", lambda: measure_time(IDDFS.drawMazeIDDFS, level), 0.0, 0.0, "nw", 500, 750),
]

all_buttons = []
for text, cmd, relx, rely, anchor, x, y in button_specs:
    btn = tk.Button(root, text=text, font=("Arial", 24, "bold"),
                    bg="red" if text != "Clear" else "gray",
                    fg="white", command=cmd)
    btn.place(relx=relx, rely=rely, anchor=anchor, x=x, y=y)
    all_buttons.append(btn)

maze.register_buttons(all_buttons)

#Turn off screen update
window.tracer()
#Main game loop
while True:
    window.update()
    # if __name__ == "__main__": 
    #     app.run()