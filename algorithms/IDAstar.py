import time
from Pen import Pen
from maze import drawPath
import math

def heuristic(a, b):
    # Hàm đánh giá: khoảng cách Manhattan
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def generateIDAStarPath(maze, start, goal):
    height = len(maze)
    width = len(maze[0])
    path = []
    correct_path = []

    def is_valid(x, y):
        return 0 <= x < width and 0 <= y < height and maze[y][x] != 1

    def search(x, y, g, threshold, visited):
        f = g + heuristic((x, y), goal)
        if f > threshold:
            return f, False
        path.append((x, y))
        visited.add((x, y))

        if (x, y) == goal:
            correct_path.extend(path[:])
            return f, True

        min_threshold = float('inf')
        for dx, dy in [(-1, 0), (1, 0), (0, 1), (0, -1)]:
            nx, ny = x + dx, y + dy
            if is_valid(nx, ny) and (nx, ny) not in visited:
                t, found = search(nx, ny, g + 1, threshold, visited)
                if found:
                    return t, True
                min_threshold = min(min_threshold, t)

        path.pop()
        visited.remove((x, y))
        return min_threshold, False

    threshold = heuristic(start, goal)
    while True:
        visited = set()
        path.clear()
        t, found = search(start[0], start[1], 0, threshold, visited)
        if found:
            break
        if t == float('inf'):
            break
        threshold = t

    return correct_path, path

def drawMazeIDAStar(maze): 
    start, goal = None, None
    for y in range(len(maze)):
        for x in range(len(maze[0])):
            if maze[y][x] == 2:
                start = (x, y)
            elif maze[y][x] == 3:
                goal = (x, y)

    t0 = time.time()
    correctPath, path = generateIDAStarPath(maze, start, goal)
    t1 = time.time()
    
    drawPath(correctPath, path, start, goal, maze)
