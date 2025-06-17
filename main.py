import turtle 
import tkinter as tk
import maze
from Pen import Pen 
import DFS
import aStar
import DIJKSTRA
import BFS
import IDAstar
import BeamSearch
import BiDirectionalSearch
import IDDFS

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
    level.clear()
    maze.clearPath()  # Xóa đường đi cũ
    
    level = maze.generateMaze(maze_height, maze_width)
    # Không dùng turtle.clear() mà chỉ vẽ lại maze
    maze.setup_maze(level)
    DFS.drawMazeDFS(level)
# Danh sách các nút thuật toán và thông tin liên quan
button_specs = [
    # (text, command function, x, y)
    ("Generate maze", lambda: regenerateMaze(), 1.0, 0.0, "ne", -40, 40),
    ("Clear", lambda: maze.clearPath(), 1.0, 0.0, "ne", -40, 110),
    ("DFS", lambda: DFS.drawMazeDFS(level), 0.0, 0.0, "nw", 60, 40),
    ("A Star", lambda: aStar.drawMazeAStar(level), 0.0, 0.0, "nw", 200, 40),
    ("DIJKSTRA", lambda: DIJKSTRA.drawMazeDijkstra(level), 0.0, 0.0, "nw", 370, 40),
    ("BFS", lambda: BFS.drawMazeBFS(level), 0.0, 0.0, "nw", 600, 40),
    ("IDAStar", lambda: IDAstar.drawMazeIDAStar(level), 0.0, 0.0, "nw", 740, 40),
    ("BeamSearch", lambda: BeamSearch.drawMazeBeamSearch(level), 0.0, 0.0, "nw", 940, 40),
    ("BiDirectionalSearch", lambda: BiDirectionalSearch.drawMazeBiDirectionalSearch(level), 0.0, 0.0, "nw", 60, 750),
    ("IDDFS", lambda: IDDFS.drawMazeIDDFS(level), 0.0, 0.0, "nw", 500, 750),
]

# Tạo và đặt nút dựa trên cấu hình trên
all_buttons = []
for text, cmd, relx, rely, anchor, x, y in button_specs:
    btn = tk.Button(root, text=text, font=("Arial", 24, "bold"),
                    bg="red" if text != "Clear" else "gray",
                    fg="white", command=cmd)
    btn.place(relx=relx, rely=rely, anchor=anchor, x=x, y=y)
    all_buttons.append(btn)

# Đăng ký danh sách nút để maze có thể disable chúng
maze.register_buttons(all_buttons)

#Turn off screen update
window.tracer()
#Main game loop
while True:
    window.update()


