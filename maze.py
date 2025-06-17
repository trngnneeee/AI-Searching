import random
from Pen import Pen 
import random
import turtle
import tkinter

TILE_SIZE = 24

path_Draw = None
correctPathDraw = None
all_buttons = []

#To canh giua
def calculate_offsets(maze):
    width_px = len(maze[0]) * TILE_SIZE
    height_px = len(maze) * TILE_SIZE
    return -width_px // 2, height_px // 2


def generateMaze(height, width): 
    maze = [[1 for _ in range(width)] for _ in range(height)]  # Tạo maze với các tường
    directions = [(-2, 0), (2, 0), (0, 2), (0, -2)]  # Các hướng di chuyển

    def findPath(x, y): 
        maze[y][x] = 0  # Đánh dấu ô hiện tại là đường đi
        random.shuffle(directions)
        for dx, dy in directions: 
            nx, ny = x + dx, y + dy
            if 1 <= nx < width - 1 and 1 <= ny < height - 1 and maze[ny][nx] == 1:
                maze[y + dy // 2][x + dx // 2] = 0  # Xóa tường giữa các ô
                findPath(nx, ny)  # Đệ quy tìm đường đi

    # Thêm tường xung quanh
    for y in range(height):
        maze[y][0] = maze[y][width - 1] = 1
    for x in range(width):
        maze[0][x] = maze[height - 1][x] = 1

    findPath(1, 1)  # Bắt đầu từ vị trí (1,1)

    valid_positions = [(y, x) for y in range(1, height - 1)
                              for x in range(1, width - 1)
                              if maze[y][x] == 0 and (y, x) != (1, 1)]

    goal_y, goal_x = random.choice(valid_positions)  # Chọn mục tiêu ngẫu nhiên
    maze[goal_y][goal_x] = 3  # Đặt mục tiêu

    maze[1][1] = 2  # Đặt điểm bắt đầu

    return maze


def setup_maze(maze):
    pen = Pen("square")

    # Xóa đối tượng Pen nếu có
    pen.clear()

    offset_x, offset_y = calculate_offsets(maze)

    for y in range(len(maze)):
        for x in range(len(maze[y])):
            value = maze[y][x]

            screen_x = offset_x + (x * TILE_SIZE)
            screen_y = offset_y - (y * TILE_SIZE)

            if value == 1:  # Vẽ tường
                pen.goto(screen_x, screen_y)
                pen.stamp()
            elif value == 0:  # Vị trí trống, không vẽ gì
                continue
            elif value == 2:  # Vị trí bắt đầu
                pen.goto(screen_x, screen_y)
                pen.shape("square")
                pen.color("blue")
                pen.stamp()
                pen.color("white")
            elif value == 3:  # Vị trí mục tiêu
                pen.goto(screen_x, screen_y)
                pen.shape("square")
                pen.color("red")
                pen.stamp()
                pen.color("white")


def drawPath(correctPath, path, start, goal, maze):
    global path_Draw, correctPathDraw

    offset_x, offset_y = calculate_offsets(maze)

    path_Draw = Pen("square")
    for (x, y) in path:
        if (x, y) == start or (x, y) == goal:
            continue
        screen_x = offset_x + (x * TILE_SIZE)
        screen_y = offset_y - (y * TILE_SIZE)
        path_Draw.color("green")
        path_Draw.goto(screen_x, screen_y)
        path_Draw.stamp()

    correctPathDraw = Pen("circle")
    for (x, y) in correctPath:
        if (x, y) == start or (x, y) == goal:
            continue
        screen_x = offset_x + (x * TILE_SIZE)
        screen_y = offset_y - (y * TILE_SIZE)
        correctPathDraw.color("yellow")
        correctPathDraw.goto(screen_x, screen_y)
        correctPathDraw.stamp()

def register_buttons(button_list):
    global all_buttons
    all_buttons = button_list

def clearPath():
    global path_Draw, correctPathDraw, all_buttons

    #disabled buttons
    for btn in all_buttons:
        btn.config(state="disabled")

    if path_Draw:
        path_Draw.clear()
        path_Draw.hideturtle()
        path_Draw = None
    if correctPathDraw:
        correctPathDraw.clear()
        correctPathDraw.hideturtle()
        correctPathDraw = None

    turtle.Screen().ontimer(enable_buttons, 1000)  # 1000 ms

def enable_buttons():
    for btn in all_buttons:
        btn.config(state="normal")
    