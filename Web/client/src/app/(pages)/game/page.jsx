"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";

import { runDFS, runBFS } from "@/app/helpers/algorithm.helper";

export default function GamePage() {
  const router = useRouter();
  const [matrix, setMatrix] = useState(Array.from({ length: 25 }, () =>
    Array.from({ length: 25 }, () => 0)
  ));
  const [alg, setAlg] = useState("");
  const [start, setStart] = useState(null);
  const [goal, setGoal] = useState(null);

  function generateWalkableMatrix(size = 25) {
    const matrix = Array.from({ length: size }, () => Array(size).fill(1));

    const start = [0, Math.floor(Math.random() * size)];
    const goal = [size - 1, Math.floor(Math.random() * size)];
    setStart(start);
    setGoal(goal);

    let [r, c] = start;
    matrix[r][c] = 2;

    while (r !== goal[0] || c !== goal[1]) {
      if (r < goal[0]) r++;
      else if (r > goal[0]) r--;

      matrix[r][c] = 0;

      if (c < goal[1]) c++;
      else if (c > goal[1]) c--;

      matrix[r][c] = 0;
    }

    matrix[goal[0]][goal[1]] = 3;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        if (matrix[i][j] === 1 && Math.random() < 0.4) {
          matrix[i][j] = 0;
        }
      }
    }

    return matrix;
  }


  const handleGenerate = () => {
    const newMatrix = generateWalkableMatrix();
    setMatrix(newMatrix);
  }

  const handleClear = () => {
    setMatrix(Array.from({ length: 25 }, () =>
      Array.from({ length: 25 }, () => 0)
    ));
  }

  const drawPath = async (path, newMatrix) => {
    for (const [r, c] of path) {
      if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
        newMatrix[r][c] = 5;
        setMatrix([...newMatrix]);
        await new Promise(res => setTimeout(res, 20));
      }
    }
  }

  function resetMatrixStates(matrix) {
    return matrix.map(row =>
      row.map(cell =>
        (cell !== 0 && cell !== 1 && cell !== 2 && cell !== 3) ? 0 : cell
      )
    );
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

          const path = await runDFS(matrix, start, goal, (r, c) => {
            if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
              newMatrix[r][c] = 4; // visited
              setMatrix([...newMatrix]);
            }
          }, 10);
          if (!path) {
            alert("Không tìm thấy đường đi đến đích!");
          }
          else {
            drawPath(path, newMatrix)
          }
          break;
        }
      case "bfs":
        {
          const cleanedMatrix = resetMatrixStates(matrix);
          const newMatrix = cleanedMatrix.map(row => [...row]);

          const path = await runBFS(matrix, start, goal, (r, c) => {
            if (matrix[r][c] !== 2 && matrix[r][c] !== 3) {
              newMatrix[r][c] = 4; // visited
              setMatrix([...newMatrix]);
            }
          }, 10);
          if (!path) {
            alert("Không tìm thấy đường đi đến đích!");
          }
          else {
            drawPath(path, newMatrix);
          }
          break;
        }
    }
  }

  return (
    <>
      <div className="bg-[url('/game.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat">
        <div className="flex justify-between pt-[50px] px-[100px]">
          <div>
            <button href="/" className="mb-[50px] px-[50px] text-[#87FEFE] bg-[#001835] hover:bg-[#58929e] py-[10px] text-[30px] font-extrabold border-[3px] border-[#056092] outline-none cursor-pointer w-[250px] flex items-center gap-[5px]" onClick={() => router.push("/")}>
              <IoMdArrowBack />
              <div>HOME</div>
            </button>
            <div className="px-[40px] py-[50px] bg-[#001835] border-[3px] border-[#056092] rounded-[30px] flex flex-col gap-[30px] w-[400px]">
              <select
                className="px-[20px] py-[15px] text-[20px] font-bold text-[#87FEFE] bg-[#001835] border-[3px] border-[#056092] outline-none cursor-pointer"
                style={{ textShadow: '0 0 10px #87FEFE' }}
                onChange={(event) => setAlg(event.target.value)}
              >
                <option value={""}>-- ALGORITHMS --</option>
                <option value={"dfs"}>DFS</option>
                <option value={"bfs"}>BFS</option>
                <option value={""}>A*</option>
                <option value={""}>UCS</option>
                <option value={""}>IDDFS</option>
                <option value={""}>BI_DIRECTIONAL SEARCH</option>
                <option value={""}>BEAM SEARCH</option>
                <option value={""}>IDA*</option>
              </select>
              <select
                className="px-[20px] py-[15px] text-[20px] font-bold text-[#87FEFE] bg-[#001835] border-[3px] border-[#056092] outline-none cursor-pointer"
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
            <div className="mt-[50px]">
              <div
                className="flex items-center gap-[10px] text-[#87FEFE] text-[24px] font-bold"
                style={{ textShadow: '0 0 10px #87FEFE' }}
              >
                <div>Path Length: </div>
                <span>0</span>
              </div>
              <div
                className="flex items-center gap-[10px] text-[#87FEFE] text-[24px] font-bold"
                style={{ textShadow: '0 0 10px #87FEFE' }}
              >
                <div>Nodes Explored: </div>
                <span>0</span>
              </div>
              <div
                className="flex items-center gap-[10px] text-[#87FEFE] text-[24px] font-bold"
                style={{ textShadow: '0 0 10px #87FEFE' }}
              >
                <div>Cost: </div>
                <span>0</span>
              </div>
              <div
                className="flex items-center gap-[10px] text-[#87FEFE] text-[24px] font-bold"
                style={{ textShadow: '0 0 10px #87FEFE' }}
              >
                <div>Processing Time: </div>
                <span>0</span>
              </div>
            </div>
          </div>
          <div>
            <div className="bg-[#ffffff34] w-[700px] h-[500px] border-[3px] border-[#056092] mb-[30px] overflow-hidden">
              {/* Main Game */}
              <div
                className="grid w-full h-full"
                style={{
                  gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)`,
                  gridTemplateRows: `repeat(${matrix.length}, 1fr)`
                }}
              >
                {matrix.flatMap((row, rowIndex) =>
                  row.map((cell, colIndex) => (
                    <div
                      key={`${rowIndex}-${colIndex}`}
                      className={`border-[1px] border-[#ddd] ${cell === 0 ? "bg-white" :
                        cell === 1 ? "bg-black" :
                          cell === 2 ? "bg-red-500" :
                            cell === 3 ? "bg-green-500" :
                              cell === 4 ? "bg-blue-300" :
                                cell === 5 ? "bg-yellow-400" : ""
                        }`}
                    />
                  ))
                )}
              </div>

              {/* End Main Game */}
            </div>

            <div className="flex justify-between">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}