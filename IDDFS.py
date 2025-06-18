import time
from Pen import Pen
from maze import drawPath

# Hàm DFS giới hạn độ sâu và lưu lại các bước đã đi qua
def depth_limited_dfs(maze, start, goal, depth, visited=None):
    if visited is None:
        height = len(maze)
        width = len(maze[0])
        visited = [[False]*width for _ in range(height)]
    
    stack = [start]  # Sử dụng stack để thực hiện DFS
    visited[start[1]][start[0]] = True
    parent = {start: None}  # Để lưu quan hệ cha-con
    path = [start]  # Khởi tạo đường đi từ start
    all_steps = [start]  # Lưu lại tất cả các bước đã đi qua

    directions = [(-1, 0), (1, 0), (0, 1), (0, -1)]  # trái, phải, xuống, lên
    while stack:
        x, y = stack.pop()
        if (x, y) == goal:
            break
        if len(path) > depth:  # Kiểm tra độ sâu
            continue
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if 0 <= nx < len(maze[0]) and 0 <= ny < len(maze) and not visited[ny][nx] and maze[ny][nx] != 1:
                visited[ny][nx] = True
                stack.append((nx, ny))
                parent[(nx, ny)] = (x, y)
                all_steps.append((nx, ny))  # Thêm bước đã đi qua vào danh sách

    # Xây dựng đường đi
    current = goal
    path_correct = []
    while current is not None:
        path_correct.append(current)
        current = parent.get(current)
    if not path_correct or path_correct[0] != goal:
        return [], all_steps  # Nếu không tìm thấy đường đi
    return path_correct[::-1], all_steps  # Trả lại đường đi đúng và các bước đã đi qua

# Hàm Iterative Deepening DFS
def iterative_deepening_dfs(maze, start, goal, max_depth):
    for depth in range(1, max_depth + 1):  # Thực hiện từ độ sâu 1 đến max_depth
        visited = [[False] * len(maze[0]) for _ in range(len(maze))]
        correct_path, all_steps = depth_limited_dfs(maze, start, goal, depth, visited)
        if correct_path:  # Nếu tìm thấy đường đi thì trả về
            return correct_path, all_steps
    return [], []  # Nếu không tìm thấy đường đi trong giới hạn độ sâu

# Hàm tạo đường đi cho IDDFS
def generateIDDFSPath(maze, start, goal, max_depth):
    correct_path, all_steps = iterative_deepening_dfs(maze, start, goal, max_depth)
    if not correct_path:
        return [], all_steps  # Nếu không tìm thấy đường đi
    return correct_path, all_steps

# Hàm vẽ maze với IDDFS
def drawMazeIDDFS(maze): 
    start, goal = None, None
    for y in range(len(maze)):
        for x in range(len(maze[0])):
            if maze[y][x] == 2:
                start = (x, y)
            elif maze[y][x] == 3:
                goal = (x, y)

    max_depth = 20  # Giới hạn độ sâu tối đa, có thể điều chỉnh
    
    t0 = time.time()
    correctPath, path = generateIDDFSPath(maze, start, goal)
    t1 = time.time()
    
    drawPath(correctPath, path, start, goal, maze) 
