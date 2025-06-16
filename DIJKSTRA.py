from Pen import Pen
from maze import drawPath
import heapq

def generateDijkstraPath(maze, start, goal):
    height = len(maze)
    width = len(maze[0])
    visited = [[False]*width for _ in range(height)]
    prev = [[None]*width for _ in range(height)]
    distance = [[float('inf')]*width for _ in range(height)]

    path = []

    # Dùng min-heap làm priority queue
    heap = []
    heapq.heappush(heap, (0, start))
    distance[start[1]][start[0]] = 0

    while heap:
        dist, (x, y) = heapq.heappop(heap)

        if visited[y][x]:
            continue
        visited[y][x] = True
        path.append((x, y))

        if (x, y) == goal:
            break

        for dx, dy in [(-1,0), (1,0), (0,1), (0,-1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                if maze[ny][nx] != 1 and not visited[ny][nx]:
                    new_dist = dist + 1  # tất cả bước đi đều chi phí 1
                    if new_dist < distance[ny][nx]:
                        distance[ny][nx] = new_dist
                        prev[ny][nx] = (x, y)
                        heapq.heappush(heap, (new_dist, (nx, ny)))

    # Truy vết đường đúng (correct_path) từ goal về start
    correct_path = []
    cur = goal
    while cur:
        correct_path.append(cur)
        cur = prev[cur[1]][cur[0]]
    correct_path.reverse()

    return correct_path, path

def drawMazeDijkstra(maze):
    start, goal = None, None
    for y in range(len(maze)):
        for x in range(len(maze[0])):
            if maze[y][x] == 2:
                start = (x, y)
            elif maze[y][x] == 3:
                goal = (x, y)

    correctPath, path = generateDijkstraPath(maze, start, goal)

    drawPath(correctPath, path, start, goal, maze)
