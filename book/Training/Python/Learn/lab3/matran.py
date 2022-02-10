def route_exists(from_row, from_column, to_row, to_column, map_matrix):
    route_x = [1, -1, 0, 0]
    route_y = [0, 0, 1, -1]
    n = len(map_matrix)
    m = len(map_matrix[0])
    queue = []
    queue.append((from_row, from_column))

    visited = []

    for ix in range(n):
        row = []
        for jx in range(m):
            row.append(True)
        visited.append(row)
    visited[from_row][from_column] = False

    while (len(queue) > 0):
        x, y = queue.pop(0)
        for i in range(4):
            new_x = x + route_x[i]
            new_y = y + route_y[i]
            if new_x < n and new_x >= 0 and new_y < m and new_y >= 0 and map_matrix[new_x][new_y] and visited[new_x][
                new_y]:
                visited[new_x][new_y] = False
                queue.append((new_x, new_y))
                if new_x == to_row and new_y == to_column:
                    return True
    return False


if __name__ == '__main__':
    map_matrix = [
        [True, False, False],
        [True, True, False],
        [False, True, True]
    ]

    print(route_exists(0, 0, 2, 2, map_matrix))
    print('alo')
