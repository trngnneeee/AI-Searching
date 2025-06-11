import random
from Pen import Pen 
from Player import Player

def generateMaze(height, width): 
    maze = [[1 for _ in range(width)] for _ in range(height)] 
    directions = [(-2, 0), (2, 0), (0, 2), (0, -2)]

    def findPath(x, y): 
        maze[y][x] = 0
        random.shuffle(directions)
        for dx, dy in directions: 
            nx = x + dx
            ny = y + dy
            if 1 <= nx < width - 1 and 1 <= ny < height - 1 and maze[ny][nx] == 1: 
                maze[y + dy // 2][x + dx // 2] = 0
                findPath(nx, ny)

    findPath(1, 1)

    valid_positions = [(y, x) for y in range(1, height - 1)
                              for x in range(1, width - 1)
                              if maze[y][x] == 0 and (y, x) != (1, 1)]

    goal_y, goal_x = random.choice(valid_positions)
    maze[goal_y][goal_x] = 3  #Goal

    maze[1][1] = 2

    return maze

def setup_maze(maze):
    pen = Pen("square")
    player = Player()

    for y in range(len(maze) - 1):
        for x in range(len(maze[y]) - 1):
            value = maze[y][x]
            screen_x = -288 + (x * 24)
            screen_y = 288 - (y * 24)

            #wall
            if value == 1:
                pen.goto(screen_x, screen_y)
                pen.stamp()
            elif value == 0:
                continue
            #start
            elif value == 2:
                player.goto(screen_x, screen_y)
            #goal
            elif value == 3: 
                
                pen.goto(screen_x, screen_y)
                pen.shape("square")
                pen.color("red")
                pen.stamp()
                pen.color("white")