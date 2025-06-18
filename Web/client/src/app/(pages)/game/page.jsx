"use client"

import { useRouter } from "next/navigation";

export default function GamePage() {
  const router = useRouter();
  
  return (
    <>
      <div className="bg-[url('/main.png')] w-full h-screen bg-cover bg-center bg-no-repeat">
        <div className="flex justify-between pt-[50px] px-[100px]">
          <div>
            <div className="px-[40px] py-[50px] bg-[#001835] border-[3px] border-[#056092] rounded-[30px] flex flex-col gap-[30px] w-[400px]">
              <select
                className="px-[20px] py-[15px] text-[20px] font-bold text-[#87FEFE] bg-[#001835] border-[3px] border-[#056092] outline-none cursor-pointer"
                style={{ textShadow: '0 0 10px #87FEFE' }}
              >
                <option value={""}>-- ALGORITHMS --</option>
                <option value={""}>DFS</option>
                <option value={""}>BFS</option>
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
              <button
                className="px-[20px] py-[15px] text-[20px] font-bold text-[#87FEFE] bg-[#001835] hover:bg-[#58929e] border-[3px] border-[#056092] outline-none cursor-pointer"
                style={{ textShadow: '0 0 10px #87FEFE' }}
              >
                GENERATE MAZE
              </button>
            </div>
            <div className="mt-[80px]">
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
            <div className="bg-[#ffffff34] w-[673px] h-[500px] border-[3px] border-[#056092] mb-[30px]">
              {/* Main Game Here */}
            </div>
            <div className="flex justify-between">
              <button
                className="text-[#87FEFE] bg-[#001835] hover:bg-[#58929e] px-[50px] py-[10px] text-[30px] font-extrabold border-[3px] border-[#056092] outline-none cursor-pointer w-[200px]"
                style={{ textShadow: '0 0 10px #87FEFE' }}
              >
                CLEAR
              </button>
              <button
                className="text-[#87FEFE] bg-[#001835] hover:bg-[#58929e] px-[50px] py-[10px] text-[30px] font-extrabold border-[3px] border-[#056092] outline-none cursor-pointer w-[200px]"
                style={{ textShadow: '0 0 10px #87FEFE' }}
              >
                GO
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}