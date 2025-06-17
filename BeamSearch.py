from Pen import Pen
from maze import drawPath
import heapq

def heuristic(a, b):
    # Khoảng cách Manhattan
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

def generateBeamPath(maze, start, goal, beam_width=3):
    height = len(maze)
    width = len(maze[0])
    
    def is_valid(x, y):
        return 0 <= x < width and 0 <= y < height and maze[y][x] != 1

    visited = set()
    path = []  # chứa toàn bộ hành trình
    correct_path = []

    # Mỗi phần tử: (điểm ưu tiên, vị trí hiện tại, đường đi tới đó)
    frontier = [(heuristic(start, goal), start, [start])]
    
    while frontier:
        # Cắt bớt frontier nếu dài hơn beam_width
        frontier = sorted(frontier)[:beam_width]
        next_frontier = []

        for _, (x, y), curr_path in frontier:
            path.extend(curr_path)  # thêm đường đi đã thử
            if (x, y) == goal:
                correct_path = curr_path
                return correct_path, path
            visited.add((x, y))
            
            for dx, dy in [(-1,0), (1,0), (0,1), (0,-1)]:
                nx, ny = x + dx, y + dy
                if is_valid(nx, ny) and (nx, ny) not in visited:
                    new_path = curr_path + [(nx, ny)]
                    priority = heuristic((nx, ny), goal)
                    next_frontier.append((priority, (nx, ny), new_path))
        
        frontier = next_frontier

    return correct_path, path

def drawMazeBeam(maze):
    start, goal = None, None
    for y in range(len(maze)):
        for x in range(len(maze[0])):
            if maze[y][x] == 2:
                start = (x, y)
            elif maze[y][x] == 3:
                goal = (x, y)

    correctPath, path = generateBeamPath(maze, start, goal, beam_width=3)
    
    drawPath(correctPath, path, start, goal, maze)
