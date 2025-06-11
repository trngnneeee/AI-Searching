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

def drawDFS(corectPath, path): 
    path_Turtle = Pen()

    