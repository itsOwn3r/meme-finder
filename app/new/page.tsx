"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import { GoArrowLeft } from 'react-icons/go'
import Image from "next/image";

const NewMemePage = () => {
    const [meme, setMeme] = useState<File | undefined>(undefined);

    const memeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        if (e.target.files) {
            console.log(e.target.files[0]);
            setMeme(e.target.files[0])
        }
    }
    console.log(meme);

  return (
    <section className="mt-8">
    <Link scroll={false} href="/" className="flex items-center gap-x-1 pl-2">
      <GoArrowLeft color="#F7F7F7" size={24} />
      <span className=" font-semibold text-text text-base">Back</span>
    </Link>
    <div className="flex flex-col md:flex-row mt-5 gap-x-10 lg:gap-x-16 justify-center items-center">
      <div className="bg-super-dark-gray flex relative items-center justify-center md:pb-[15%] md:pt-[15%] pt-[50%] pb-[50%] rounded-2xl w-full md:w-1/2 border-4 border-outline border-opacity-15">
        <div className="absolute w-2/3 rounded-3xl overflow-hidden">
            <div className='w-full relative h-[8rem] p-40 flex justify-center items-center cursor-pointer'>
                {meme && (
                        <>
                            <Image src={URL.createObjectURL(meme)} fill alt='Meme' />
                            <input onChange={e => memeHandler(e)} className='absolute w-full h-full z-50 opacity-0 cursor-pointer' type="file" name="meme" id="meme" />
                        </>
                )}
                {!meme && <>
                    <div className='w-full relative h-[8rem] flex justify-center cursor-pointer'><Image className='absolute rounded-full cursor-pointer' src="/images/add-icon.png" width={120} height={120} alt='Add meme' quality={100} />
                    <input onChange={e => memeHandler(e)} className='z-50 opacity-0 cursor-pointer' type="file" name="meme" id="meme" />
                    </div>
                </>}
            </div>
        </div>
      </div>
      <div className="w-full mt-12 md:mt-0 md:w-1/2">
        <div className="flex flex-col gap-y-3 items-start">
          <h1 className="text-h4 xl:text-h3 font-bold">
            Enter Title Here
          </h1>
          <p className=" text-text text-base xl:text-h6 2xl:text-h5 max-w-[50ch] text-balance pb-3 ">
          Enter Description Here
          </p>
          Add Source of Meme Here
        </div>

        <div className="flex flex-col gap-x-2 mt-12 divide-y-2 divide-outline divide-opacity-20 text-xs xl:text-base 2xl:text-h6">
          <div className=" gap-x-1 grid grid-cols-12 border-t-2 border-outline border-opacity-20 py-2">
            <h2 className=" font-semibold col-span-4">Category</h2>
            <span className=" col-span-8 text-text px-1">
            Enter Category Here
            </span>
          </div>
          <div className=" gap-x-1 grid grid-cols-12 ">
            <h2 className=" font-semibold col-span-4 pt-2">Tags</h2>
            <span className="flex flex-col col-span-8  text-text">
                Add Tags here
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default NewMemePage