from Pen import Pen

def generateDFSPath(maze, start, goal):
    height = len(maze)
    width = len(maze[0])
    visited = [[False]*width for _ in range(height)]
    correct_path = []
    path = []

    def dfs(x, y): 
        if not (0 <= x < width and 0 <= y < height):
            return False
        #check wall and visited
        if (maze[y][x] == 1 or visited[y][x]):
            return False
        
        visited[y][x] = True
        path.append((x, y))

        if(x, y) == goal: 
            correct_path.append((x, y))
            return True 
        
        for dx, dy in [(-1, 0), (1, 0), (0, 1), (0, -1)]: 
            if(dfs(x + dx, y + dy)): 
                correct_path.append((x, y))
                return True
        return False
        
    dfs(*start) 
    return correct_path, path[::-1]

def drawDFS(corectPath, path, start, goal): 
    path_Draw = Pen("square")
    for(x, y) in path: 
        if(x, y) == start or (x, y) == goal: 
            continue
        screen_x = -288 + (x * 24)
        screen_y = 288 - (y * 24)

        path_Draw.color("green")
        path_Draw.goto(screen_x, screen_y)
        path_Draw.stamp()
    
    corectPathDraw = Pen("circle")
    for(x, y) in corectPath:
        if(x, y) == start or (x, y) == goal: 
            continue
        screen_x = -288 + (x * 24)
        screen_y = 288 - (y * 24)

        corectPathDraw.color("yellow")
        corectPathDraw.goto(screen_x, screen_y)
        corectPathDraw.stamp()

def drawMazeDFS(maze): 
    start, goal = None, None
    for y in range(len(maze)):
        for x in range(len(maze[0])):
            if maze[y][x] == 2:
                start = (x, y)
            elif maze[y][x] == 3:
                goal = (x, y)

    corectPath, path = generateDFSPath(maze, start, goal)
    
    drawDFS(corectPath, path, start, goal)