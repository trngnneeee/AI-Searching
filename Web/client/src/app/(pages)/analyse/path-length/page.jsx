"use client";

import Link from "next/link";
import { useStatsStore } from '@/store/statStore';

export default function CostPage() {
  const { statsList } = useStatsStore();
  
  return (
    <>
      <div className="bg-[url('/game.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat">
        <div className="flex p-[20px]">
          <Link
            href="/game"
            className="text-[#87FEFE] bg-[#001835] hover:bg-[#58929e] px-[50px] py-[10px] text-[30px] font-extrabold border-[3px] border-[#056092] outline-none cursor-pointer w-[200px]"
            style={{ textShadow: '0 0 10px #87FEFE' }}
          >
            BACK
          </Link>
        </div>
        <div className="flex">
          <div className="bg-[#ffffff34] w-full h-[500px] mx-[100px] border-[3px] border-[#056092] mb-[30px]">

          </div>
        </div>
      </div>
    </>
  );
}