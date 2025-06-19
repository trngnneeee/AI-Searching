import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="bg-[url('/main.png')] w-full h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center">
        <div className="border-[10px] border-[#00FFFF] shadow-2xl border-double w-full mx-[300px] rounded-[30px]">
          <div className="text-[100px] font-bold text-[#00FFFF] mb-[150px] text-center">LOGIN</div>
          <div className="flex flex-col gap-[30px] my-[50px]">
            <Link href="/game" className="text-center text-[64px] font-bold text-[#00FFFF] border-[5px] border-[#00FFFF] bg-[#00ffff15] hover:bg-[#00ffff4f] mx-[50px] cursor-pointer rounded-[30px]">START</Link>
            <Link href="#" className="text-center text-[64px] font-bold text-[#00FFFF] border-[5px] border-[#00FFFF] bg-[#00ffff15] hover:bg-[#00ffff4f] mx-[50px] cursor-pointer rounded-[30px]">EXIT</Link>
          </div>
        </div>
      </div>
    </>
  );
}
