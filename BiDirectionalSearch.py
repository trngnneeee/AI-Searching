from Pen import Pen
from maze import drawPath
from collections import deque

def generateBiDirPath(maze, start, goal):
    height = len(maze)
    width = len(maze[0])

    def is_valid(x, y):
        return 0 <= x < width and 0 <= y < height and maze[y][x] != 1

    # BFS từ cả hai đầu
    queue_start = deque([start])
    queue_goal = deque([goal])
    visited_start = {start: None}  # node: parent
    visited_goal = {goal: None}

    path = []  # toàn bộ hành trình đã đi

    meet_point = None

    while queue_start and queue_goal:
        # BFS từ start
        if queue_start:
            curr = queue_start.popleft()
            path.append(curr)

            for dx, dy in [(-1,0), (1,0), (0,1), (0,-1)]:
                nx, ny = curr[0] + dx, curr[1] + dy
                neighbor = (nx, ny)
                if is_valid(nx, ny) and neighbor not in visited_start:
                    visited_start[neighbor] = curr
                    queue_start.append(neighbor)
                    if neighbor in visited_goal:
                        meet_point = neighbor
                        break
            if meet_point:
                break

        # BFS từ goal
        if queue_goal:
            curr = queue_goal.popleft()
            path.append(curr)

            for dx, dy in [(-1,0), (1,0), (0,1), (0,-1)]:
                nx, ny = curr[0] + dx, curr[1] + dy
                neighbor = (nx, ny)
                if is_valid(nx, ny) and neighbor not in visited_goal:
                    visited_goal[neighbor] = curr
                    queue_goal.append(neighbor)
                    if neighbor in visited_start:
                        meet_point = neighbor
                        break
            if meet_point:
                break

    # Nếu gặp nhau thì truy ngược path
    correct_path = []
    if meet_point:
        # từ meet_point về start
        p = meet_point
        while p:
            correct_path.append(p)
            p = visited_start[p]
        correct_path = correct_path[::-1]

        # từ meet_point về goal
        p = visited_goal[meet_point]
        while p:
            correct_path.append(p)
            p = visited_goal[p]

    return correct_path, path

def drawMazeBiDir(maze):
    start, goal = None, None
    for y in range(len(maze)):
        for x in range(len(maze[0])):
            if maze[y][x] == 2:
                start = (x, y)
            elif maze[y][x] == 3:
                goal = (x, y)

    correctPath, path = generateBiDirPath(maze, start, goal)
    
    drawPath(correctPath, path, start, goal, maze)
