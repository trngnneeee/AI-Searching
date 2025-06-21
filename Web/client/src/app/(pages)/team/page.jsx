"use client"

import { FaLocationDot } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Team() {
  const router = useRouter();

  const data = [
    {
      image: "/dk.jpg",
      name: "Dang Dang Khoa",
      studentID: "23127207",
      location: "TP HCM",
      email: "ddkhoa23@clc.fitus.edu.vn",
      facebook: "https://www.facebook.com/dangw.khoa.2701/",
      github: "https://github.com/khoavadienq",
      instagram: "https://www.instagram.com/ppg4j_dk"
    },
    {
      image: "/qd.jpg",
      name: "Nguyen Tran Quoc Duy",
      studentID: "23127181",
      location: "TP HCM",
      email: "ntqduy23@clc.fitus.edu.vn",
      facebook: "https://www.facebook.com/duy.quoc.476407",
      github: "https://github.com/ntqduy",
      instagram: ""
    },
    {
      image: "/tn.jpg",
      name: "Dang Truong Nguyen",
      studentID: "23127438",
      location: "TP HCM",
      email: "dtnguyen23@clc.fitus.edu.vn",
      facebook: "https://www.facebook.com/trngn.neee",
      github: "https://github.com/trngnneeee",
      instagram: "https://www.instagram.com/trngn.neee"
    },
    {
      image: "/tt.jpg",
      name: "Nguyen Trong Tai",
      studentID: "23127008",
      location: "TP HCM",
      email: "nttai23@clc.fitus.edu.vn",
      facebook: "https://www.facebook.com/nguyentrongtaiCongHoi#",
      github: "https://github.com/tail0ng",
      instagram: "https://www.instagram.com/tai_ch.en/#"
    },
  ]

  return (
    <>
      <div className="bg-[url('/game.jpg')] w-full h-screen bg-cover bg-center bg-no-repeat">
        <div className="flex flex-col items-center justify-center pt-[10px] relative">
          <button href="/" className="mb-[20px] px-[30px] text-[#87FEFE] bg-[#001835] hover:bg-[#58929e] py-[10px] text-[15px] font-extrabold border-[3px] border-[#056092] outline-none cursor-pointer flex items-center gap-[5px] absolute top-[10px] left-[10px]" onClick={() => router.push("/")}>
            <IoMdArrowBack />
            <div>HOME</div>
          </button>
          <div className="text-[#00FFFF] text-[72px] font-extrabold mb-[20px]">My Team</div>
          <div className="flex justify-around w-full">
            {data.map((item, index) => (
              <div className='flex flex-col items-center relative mt-[75px] sm:mt-[125px]' key={index}>
                <div className='rounded-[50%] overflow-hidden w-[150px] sm:w-[200px] xl:w-[250px] h-[150px] sm:h-[200px] xl:h-[250px] border-[#ddd] border-[5px] absolute top-[-75px] sm:top-[-100px] xl:top-[-125px]'>
                  <img src={item.image} className='w-full h-full object-cover' />
                </div>
                <div className='bg-white px-[50px] w-[360px] pt-[90px] sm:pt-[125px] xl:pt-[145px] pb-[50px] rounded-[20px] flex flex-col items-center'>
                  <div className='text-[18px] sm:text-[22px] font-bold text-[#505050]'>{item.name}</div>
                  <div className='text-[16px] sm:text-[18px] font-bold text-[#505050]'>{item.studentID}</div>
                  <div className='flex items-center gap-[5px] text-[12px] sm:text-[16px] text-[#505050] mt-[10px] sm:mt-[10px]'>
                    <FaLocationDot />
                    <div>{item.location}</div>
                  </div>
                  <div className='flex gap-[20px] mt-[15px] sm:mt-[20px]'>
                    <Link href={item.facebook} target="blank" className='hover:text-[#4880FF]'><FaFacebook className='text-[20px] sm:text-[24px]' /></Link>
                    {item.instagram && (
                      <Link href={item.instagram} target="blank" className='hover:text-[#4880FF]'><BiLogoInstagramAlt className='text-[20px] sm:text-[24px]' /></Link>
                    )}
                    <Link href={item.github} target="blank" className='hover:text-[#4880FF]'><FaGithub className='text-[20px] sm:text-[24px]' /></Link>
                  </div>
                  <div className='text-[12px] sm:text-[16px] text-[#505050] mt-[20px] flex items-center gap-[5px]'>
                    <MdOutlineEmail className='text-[20px]' />
                    <div className='text-[10px] sm:text-[14px] font-bold'>
                      {item.email}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}