import heapq
import time
from Pen import Pen
from maze import drawPath

def heuristic(a, b):
  return abs((a[0] - b[0])) + abs(a[1] - b[1])

def generateAStarPath(maze, start, goal):
    height = len(maze)
    width = len(maze[0])

    open_set = []
    in_open_set = set()
    heapq.heappush(open_set, (0, start))  # (f_score, (x, y))
    in_open_set.add(start)

    came_from = {}
    g_score = [[float('inf')] * width for _ in range(height)]
    g_score[start[1]][start[0]] = 0

    f_score = [[float('inf')] * width for _ in range(height)]
    f_score[start[1]][start[0]] = heuristic(start, goal)

    visited_path = []

    while open_set:
        current_f, current = heapq.heappop(open_set)
        in_open_set.remove(current)

        x, y = current
        visited_path.append(current)

        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1], visited_path

        for dx, dy in [(-1, 0), (1, 0), (0, 1), (0, -1)]:
            nx, ny = x + dx, y + dy

            if not (0 <= nx < width and 0 <= ny < height):
                continue
            if maze[ny][nx] == 1:
                continue

            tentative_g_score = g_score[y][x] + 1

            if tentative_g_score < g_score[ny][nx]:
                came_from[(nx, ny)] = (x, y)
                g_score[ny][nx] = tentative_g_score
                f_score[ny][nx] = tentative_g_score + heuristic((nx, ny), goal)
                if (nx, ny) not in in_open_set:
                    heapq.heappush(open_set, (f_score[ny][nx], (nx, ny)))
                    in_open_set.add((nx, ny))

    return [], visited_path

  
def drawMazeAStar(maze):
    start, goal = None, None
    for y in range(len(maze)):
        for x in range(len(maze[0])):
            if maze[y][x] == 2:
                start = (x, y)
            elif maze[y][x] == 3:
                goal = (x, y)

    t0 = time.time()
    correctPath, path = generateAStarPath(maze, start, goal)
    t1 = time.time()

    drawPath(correctPath, path, start, goal, maze)