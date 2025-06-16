# This is Breadth-first search algorithm implementation for maze solving.
from Pen import Pen
from maze import drawPath
import queue

# Generate BFS path using a queue
def BFS(maze, start, goal, visited=None):
    if visited is None:
        height = len(maze)
        width = len(maze[0])
        visited = [[False]*width for _ in range(height)]
    q = queue.Queue()
    q.put(start)

    visited[start[1]][start[0]] = True
    parent = {start: None} # To store child-parent relationships
    path = [(start)] # Initialize path with the start position

    directions = [(-1, 0), (1, 0), (0, 1), (0, -1)]  # left, right, down, up
    while not q.empty():
        x, y = q.get()
        if (x, y) == goal:
            break
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < len(maze[0]) and 0 <= ny < len(maze) and not visited[ny][nx] and maze[ny][nx] != 1: # Check bounds and if not a wall
                visited[ny][nx] = True
                path.append((nx, ny))
                q.put((nx, ny))
                parent[(nx, ny)] = (x, y)

    
    current = goal
    path_correct = []
    while current is not None:
        path_correct.append(current)
        current = parent.get(current)
    print(path_correct[0], " ", goal)           
    if not path_correct or path_correct[0] != goal:
        print("No path found")
        return [], path  # No path found
    return path_correct[::-1], path  # Return the path in correct order

def generateBFSPath(maze, start, goal):
    height = len(maze)
    width = len(maze[0])
    visited = [[False]*width for _ in range(height)]
    correct_path, path = BFS(maze, start, goal, visited)
    if not correct_path:
        return [], path  # No path found 
    return correct_path, path

def drawMazeBFS(maze): 
    start, goal = None, None
    for y in range(len(maze)):
        for x in range(len(maze[0])):
            if maze[y][x] == 2:
                start = (x, y)
            elif maze[y][x] == 3:
                goal = (x, y)

    corectPath, path = generateBFSPath(maze, start, goal)
    drawPath(corectPath, path, start, goal, maze)