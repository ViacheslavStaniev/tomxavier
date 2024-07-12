"use client";

import Image from 'next/image';

export default function SideBar() {
    return (
        <div className="flex flex-col w-[285px] h-[100vh] bg-white px-[8px]">
            <div className="flex px-[16px] mt-[12px] text-black">
                <div className='flex'>
                    <Image
                        src={"/logo1.png"}
                        alt="" // Add an alt text for accessibility
                        width={100}
                        height={100}
                        className="w-[45.75px] h-auto mr-[8px]"
                    />
                    <p className="font-sans text-lg font-[600]">Texto en auto</p>
                </div>
                <div className='flex text-right'>
                    asdf
                </div>
            </div>
        </div>
    )
}
