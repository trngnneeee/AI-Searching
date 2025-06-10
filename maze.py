import random 

def generateMaze(height, width): 
    maze = [[1 for _ in range(width)] for _ in range(height)] #Init wall is 1 

    directions = [(-2, 0), (2, 0), (0, 2), (0, -2)]

    #find by dfs 
    def findPath(x, y): 
        maze[y][x] = 0
        random.shuffle(directions)
        for dx, dy in directions: 
            nx = dx + x
            ny = dy + y
            if 1 <= nx < width - 1 and 1 <= ny < height - 1 and maze[ny][nx] == 1: 
                maze[y + dy // 2][x + dx // 2] = 0
                findPath(nx, ny)
    
    findPath(1, 1)
    maze[2][1] = 2
    return maze