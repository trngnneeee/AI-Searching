"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { runDFS, runBFS, runAStar, runIDDFS, runUCS, runBi_Directional_Search, runBeamSearch, runIDAStar, measurePath, runGreedyBestFirst } from "@/app/helpers/algorithm.helper";
import { useStatsStore } from "@/store/statStore";
import { AiFillHome } from "react-icons/ai";
import { FiTarget } from "react-icons/fi";

export default function GamePage() {
  const { addStats, stats, clearStats, matrix, setMatrix, start, setStart, goal, setGoal } = useStatsStore();
  const latestStats = stats && stats.length > 0 ? stats[stats.length - 1] : null;

  const router = useRouter();
  const [alg, setAlg] = useState("");
  const [selectMode, setSelectMode] = useState("");
  const [isDrawing, setIsDrawing] = useState(false);

  // Gen 1 maze random đảm bảo có đường đi từ start đến goal
  const generateWalkableMatrix = (size = 25) => {
    const matrix = Array.from({ length: size }, () => Array(size).fill(1));

    let newStart = start && Array.isArray(start) ? start : [0, Math.floor(Math.random() * size)];
    let newGoal = goal && Array.isArray(goal) ? goal : [size - 1, Math.floor(Math.random() * size)];

    let [r, c] = newStart;
    matrix[r][c] = 2;

    while (r !== newGoal[0] || c !== newGoal[1]) {
      if (r < newGoal[0]) r++;
      else if (r > newGoal[0]) r--;

      if ((r !== newStart[0] || c !== newStart[1]) && (r !== newGoal[0] || c !== newGoal[1])) {
        matrix[r][c] = 0;
      }

      if (c < newGoal[1]) c++;
      else if (c > newGoal[1]) c--;

      if ((r !== newStart[0] || c !== newStart[1]) && (r !== newGoal[0] || c !== newGoal[1])) {
        matrix[r][c] = 0;
      }
    }

    matrix[newGoal[0]][newGoal[1]] = 3;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (matrix[i][j] === 1 && Math.random() < 0.4) {
          matrix[i][j] = 0;
        }
      }
    }

    return { matrix, newStart, newGoal };
  }

  const handleGenerate = () => {
    if (stats && stats.length) clearStats();
    const { matrix: newMatrix, newStart, newGoal } = generateWalkableMatrix();
    setMatrix(newMatrix);
    setStart(newStart);
    setGoal(newGoal);
  }

  const handleClear = () => {
    if (stats && stats.length) clearStats();
    setMatrix(Array.from({ length: 25 }, () =>
      Array.from({ length: 25 }, () => 0)
    ));
    setStart(null);
    setGoal(null);
  }

  // Set giá trị cho các tọa độ là đường đi thành 5 
  const drawPath = async (path, newMatrix) => {
    for (const [r, c] of path) {
      if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
        newMatrix[r][c] = 5;
        setMatrix([...newMatrix]);
        await new Promise(res => setTimeout(res, 20));
      }
    }
  }

  // Reset giá trị ma trận về 0
  function resetMatrixStates(matrix) {
    return matrix.map(row =>
      row.map(cell =>
        (cell !== 0 && cell !== 1 && cell !== 2 && cell !== 3) ? 0 : cell
      )
    );
  }

  // Tìm tọa độ 1 giá trị trong ma trận
  function findPoint(value, matrix) {
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === value) {
          return [i, j];
        }
      }
    }
    return null;
  }

  const handlePlay = async () => {
    const isAllZero = matrix.every(row => row.every(cell => cell === 0));
    if (isAllZero) {
      alert("Vui lòng generate ma trận!");
      return;
    }

    if (alg == "") {
      alert("Vui lòng chọn thuật toán!");
      return;
    }

    switch (alg) {
      case "dfs":
        {
          const cleanedMatrix = resetMatrixStates(matrix);
          const newMatrix = cleanedMatrix.map(row => [...row]);

          const currentStart = findPoint(2, matrix);
          const currentGoal = findPoint(3, matrix);

          if (!currentStart || !currentGoal) {
            alert("Thiếu start hoặc goal!");
            return;
          }

          const { path, stats } = await measurePath(runDFS, matrix, start, goal, (r, c) => {
            if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
              newMatrix[r][c] = 4;
              setMatrix([...newMatrix]);
            }
          }, 10);

          if (!path) {
            alert("Không tìm thấy đường đi đến đích!");
          }
          else {
            drawPath(path, newMatrix)
            addStats('DFS', stats)
          }
          break;
        }
      case "bfs":
        {
          const cleanedMatrix = resetMatrixStates(matrix);
          const newMatrix = cleanedMatrix.map(row => [...row]);

          const { path, stats } = await measurePath(runBFS, matrix, start, goal, (r, c) => {
            if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
              newMatrix[r][c] = 4;
              setMatrix([...newMatrix]);
            }
          }, 10);

          if (!path) {
            alert("Không tìm thấy đường đi đến đích!");
          }
          else {
            drawPath(path, newMatrix)
            addStats('BFS', stats)
          }
          break;
        }
      case "A*":
        {
          const cleanedMatrix = resetMatrixStates(matrix);
          const newMatrix = cleanedMatrix.map(row => [...row]);

          const { path, stats } = await measurePath(runAStar, matrix, start, goal, (r, c) => {
            if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
              newMatrix[r][c] = 4;
              setMatrix([...newMatrix]);
            }
          }, 10);

          if (!path) {
            alert("Không tìm thấy đường đi đến đích!");
          }
          else {
            drawPath(path, newMatrix)
            addStats('A*', stats)
          }
          break;
        }
      case "ucs":
        {
          const cleanedMatrix = resetMatrixStates(matrix);
          const newMatrix = cleanedMatrix.map(row => [...row]);

          const { path, stats } = await measurePath(runUCS, matrix, start, goal, (r, c) => {
            if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
              newMatrix[r][c] = 4;
              setMatrix([...newMatrix]);
            }
          }, 10);

          if (!path) {
            alert("Không tìm thấy đường đi đến đích!");
          }
          else {
            drawPath(path, newMatrix)
            addStats('UCS', stats)
          }
          break;
        }
      case "iddfs":
        {
          const cleanedMatrix = resetMatrixStates(matrix);
          const newMatrix = cleanedMatrix.map(row => [...row]);

          const currentStart = findPoint(2, matrix);
          const currentGoal = findPoint(3, matrix);

          if (!currentStart || !currentGoal) {
            alert("Thiếu start hoặc goal!");
            return;
          }

          const estimatedDepth = Math.abs(currentStart[0] - currentGoal[0]) + Math.abs(currentStart[1] - currentGoal[1]);

          const { path, stats } = await measurePath(
            runIDDFS,
            matrix,
            currentStart,
            currentGoal,
            (r, c) => {
              if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
                newMatrix[r][c] = 4;
                setMatrix([...newMatrix]);
              }
            },
            10,
            estimatedDepth + 10
          );

          if (!path) {
            alert("Không tìm thấy đường đi đến đích!");
          } else {
            drawPath(path, newMatrix);
            addStats("IDDFS", stats);
          }
          break;
        }

      case "bids":
        {
          const cleanedMatrix = resetMatrixStates(matrix);
          const newMatrix = cleanedMatrix.map(row => [...row]);

          const { path, stats } = await measurePath(runBi_Directional_Search, matrix, start, goal, (r, c) => {
            if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
              newMatrix[r][c] = 4;
              setMatrix([...newMatrix]);
            }
          }, 10);

          if (!path) {
            alert("Không tìm thấy đường đi đến đích!");
          }
          else {
            drawPath(path, newMatrix)
            addStats('Bi_Directional_Search', stats)
          }
          break;
        }
      case "bs":
        {
          const cleanedMatrix = resetMatrixStates(matrix);
          const newMatrix = cleanedMatrix.map(row => [...row]);

          const { path, stats } = await measurePath(runBeamSearch, matrix, start, goal, (r, c) => {
            if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
              newMatrix[r][c] = 4;
              setMatrix([...newMatrix]);
            }
          }, 10);

          if (!path) {
            alert("Không tìm thấy đường đi đến đích!");
          }
          else {
            drawPath(path, newMatrix)
            addStats('BeamSearch', stats)
          }
          break;
        }
      case "idastar":
        {
          const cleanedMatrix = resetMatrixStates(matrix);
          const newMatrix = cleanedMatrix.map(row => [...row]);

          const { path, stats } = await measurePath(runIDAStar, matrix, start, goal, (r, c) => {
            if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
              newMatrix[r][c] = 4;
              setMatrix([...newMatrix]);
            }
          }, 10);

          if (!path) {
            alert("Không tìm thấy đường đi đến đích!");
          }
          else {
            drawPath(path, newMatrix)
            addStats('IDA*', stats)
          }
          break;
        }
      case "greedy":
        {
          const cleanedMatrix = resetMatrixStates(matrix);
          const newMatrix = cleanedMatrix.map(row => [...row]);

          const { path, stats } = await measurePath(runGreedyBestFirst, matrix, start, goal, (r, c) => {
            if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
              newMatrix[r][c] = 4;
              setMatrix([...newMatrix]);
            }
          }, 10);

          if (!path) {
            alert("Không tìm thấy đường đi đến đích!");
          }
          else {
            drawPath(path, newMatrix)
            addStats('Greedy', stats)
          }
          break;
        }
    }
  }

  // Toggle hành động click
  const handleCellClick = (row, col) => {
    const newMatrix = matrix.map(row => [...row]);
    if (stats && stats.length) clearStats();
    if (selectMode == "wall") {
      if (matrix[row][col] != 2 && matrix[row][col] != 3) {
        newMatrix[row][col] = 1;
        setMatrix(newMatrix);
      }
    }
    if (selectMode == "delete") {
      newMatrix[row][col] = 0;
      setMatrix(newMatrix);
    }
    if (selectMode == "start") {
      if (start) newMatrix[start[0]][start[1]] = 0;
      newMatrix[row][col] = 2;
      setStart([row, col]);
      setMatrix(newMatrix);
      setSelectMode("");
    }
    if (selectMode == "end") {
      if (goal) newMatrix[goal[0]][goal[1]] = 0;
      newMatrix[row][col] = 3;
      setGoal([row, col]);
      setMatrix(newMatrix);
      setSelectMode("");
    }
  }

  // Toggle hành động vẽ
  const handleCellDraw = (row, col) => {
    if (stats && stats.length) clearStats();
    if (selectMode == "wall") {
      if (matrix[row][col] != 2 && matrix[row][col] != 3) {
        const newMatrix = matrix.map(row => [...row]);
        newMatrix[row][col] = 1;
        setMatrix(newMatrix)
      }
    }
    if (selectMode == "delete") {
      const newMatrix = matrix.map(row => [...row]);
      newMatrix[row][col] = 0;
      setMatrix(newMatrix)
    }
  }

  return (
    <>
      <div className="bg-[url('/game.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat">
        <div className="flex justify-between pt-[20px] px-[50px]">
          <div>
            <button href="/" className="mb-[50px] px-[50px] text-[#87FEFE] bg-[#001835] hover:bg-[#58929e] py-[10px] text-[30px] font-extrabold border-[3px] border-[#056092] outline-none cursor-pointer w-[250px] flex items-center gap-[5px]" onClick={() => router.push("/")}>
              <IoMdArrowBack />
              <div>HOME</div>
            </button>
            <div className="px-[40px] py-[30px] bg-[#001835] border-[3px] border-[#056092] rounded-[30px] flex flex-col gap-[30px] w-[400px]">
              <select
                className="px-[20px] py-[15px] text-[20px] font-bold text-[#87FEFE] bg-[#001835] border-[3px] border-[#056092] outline-none cursor-pointer"
                style={{ textShadow: '0 0 10px #87FEFE' }}
                onChange={(event) => setAlg(event.target.value)}
              >
                <option value={""}>-- ALGORITHMS --</option>
                <option value={"dfs"}>DFS</option>
                <option value={"bfs"}>BFS</option>
                <option value={"A*"}>A*</option>
                <option value={"ucs"}>UCS</option>
                <option value={"iddfs"}>IDDFS</option>
                <option value={"bids"}>BI_DIRECTIONAL SEARCH</option>
                <option value={"bs"}>BEAM SEARCH</option>
                <option value={"idastar"}>IDA*</option>
                <option value={"greedy"}>Greedy Best-First Search</option>
              </select>
              <select
                className="px-[20px] py-[15px] text-[20px] font-bold text-[#87FEFE] bg-[#001835] border-[3px] border-[#056092] outline-none cursor-pointer"
                style={{ textShadow: '0 0 10px #87FEFE' }}
                onChange={(event) => setSelectMode(event.target.value)}
                value={selectMode}
              >
                <option value={""}>-- SET MODE --</option>
                <option value={"wall"}>WALL</option>
                <option value={"delete"}>DELETE WALL</option>
                <option value={"start"}>START</option>
                <option value={"end"}>GOAL</option>
              </select>
            </div>
            <div className="mt-[50px]">
              <div
                className="flex items-center gap-[10px] text-[#87FEFE] text-[24px] font-bold"
                style={{ textShadow: '0 0 10px #87FEFE' }}
              >
                <div>Path Length: </div>
                <span>{latestStats?.pathLength ?? 0}</span>
              </div>
              <div
                className="flex items-center gap-[10px] text-[#87FEFE] text-[24px] font-bold"
                style={{ textShadow: '0 0 10px #87FEFE' }}
              >
                <div>Nodes Explored: </div>
                <span>{latestStats?.nodesExplored ?? 0}</span>
              </div>
              <div
                className="flex items-center gap-[10px] text-[#87FEFE] text-[24px] font-bold"
                style={{ textShadow: '0 0 10px #87FEFE' }}
              >
                <div>Cost: </div>
                <span>{latestStats?.cost ?? 0}</span>
              </div>
              <div
                className="flex items-center gap-[10px] text-[#87FEFE] text-[24px] font-bold"
                style={{ textShadow: '0 0 10px #87FEFE' }}
              >
                <div>Processing Time: </div>
                <span>{latestStats?.timeMs ?? 0}ms</span>
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-[650px] h-[650px] overflow-hidden">
              {/* Main Game */}
              <div
                className="grid w-full h-full"
                style={{
                  gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)`,
                  gridTemplateRows: `repeat(${matrix.length}, 1fr)`
                }}
                onMouseUp={() => setIsDrawing(false)}
                onMouseLeave={() => setIsDrawing(false)}
              >
                {matrix.flatMap((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      onMouseDown={() => {
                        setIsDrawing(true);
                        handleCellDraw(rowIndex, colIndex);
                      }}
                      onMouseEnter={() => {
                        if (isDrawing) handleCellDraw(rowIndex, colIndex);
                      }}
                      className={`border-[#123554] border-[0.5px] cursor-pointer ${cell === 0 ? "bg-white" :
                        cell === 1 ? "bg-black" :
                          cell === 2 ? "bg-[white] text-[#01122C]" :
                            cell === 3 ? "bg-[white] text-[#01122C]" :
                              cell === 4 ? "bg-[yellow]" :
                                cell === 5 ? "bg-[green]" : ""
                        } flex items-center justify-center`}
                      style={{
                        boxSizing: 'border-box',
                        width: '26px',
                        height: '26px',
                      }}
                    >
                      {cell === 2 && (
                        <AiFillHome className="w-full h-full" />
                      )}
                      {cell == 3 && (
                        <FiTarget className="w-full h-full" />
                      )}
                    </button>
                  ))
                )}
              </div>

              {/* End Main Game */}
            </div>
          </div>
          <div className="flex flex-col gap-[20px] justify-center">
            <button
              className="text-[#87FEFE] bg-[#001835] hover:bg-[#58929e] px-[50px] py-[10px] text-[30px] font-extrabold border-[3px] border-[#056092] outline-none cursor-pointer w-[200px]"
              style={{ textShadow: '0 0 10px #87FEFE' }}
              onClick={handleClear}
            >
              CLEAR
            </button>
            <button
              className="text-[#87FEFE] bg-[#001835] hover:bg-[#58929e] px-[50px] py-[10px] text-[30px] font-extrabold border-[3px] border-[#056092] outline-none cursor-pointer w-[200px]"
              style={{ textShadow: '0 0 10px #87FEFE' }}
              onClick={handlePlay}
            >
              GO
            </button>
            <button
              className="text-[#87FEFE] bg-[#001835] hover:bg-[#58929e] py-[10px] text-[30px] font-extrabold border-[3px] border-[#056092] outline-none cursor-pointer w-[200px]"
              style={{ textShadow: '0 0 10px #87FEFE' }}
              onClick={handleGenerate}
            >
              GENERATE
            </button>
            <select
              className="px-[10px] py-[15px] text-[20px] font-bold text-[#87FEFE] bg-[#001835] border-[3px] border-[#056092] outline-none cursor-pointer w-[200px]"
              style={{ textShadow: '0 0 10px #87FEFE' }}
              onChange={(event) => router.push(event.target.value)}
            >
              <option value={""}>-- ANALYSE --</option>
              <option value={"/analyse/path-length"}>PATH LENGTH</option>
              <option value={"/analyse/nodes-explored"}>NODES EXPLORED</option>
              <option value={"/analyse/cost"}>COST</option>
              <option value={"analyse/processing-time"}>PROCESSING TIME</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}