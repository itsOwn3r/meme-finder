"use client";
import React, { useRef, useState } from 'react'
import Link from 'next/link'
import { GoArrowLeft } from 'react-icons/go'
import Image from "next/image";

const NewMemePage = () => {
    const [meme, setMeme] = useState<File | undefined>(undefined);
    const memeDetails = useRef<(HTMLInputElement | null)[]>([]);
    const [tags, setTags] = useState<string[]>([])
    const [tagValue, setTagValue] = useState("")
console.log(tags);
console.log(tagValue);
    const handleTags = () =>{
        if (tagValue !== "") {

          if (tags.length > 4) { // 5 is the maximum number of tags
            return;
          }

          setTags([...tags, tagValue])
        }

        setTagValue("")
      }



    const memeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        if (e.target.files) {
            console.log(e.target.files[0]);
            setMeme(e.target.files[0])
        }
    }

    const detailsRefHandler = (type: string, ref: HTMLInputElement) =>{
        switch (type) {
            case "title":
                memeDetails.current[0] = ref
                break;
            case "description":
                memeDetails.current[1] = ref
                break;
            case "source":
                memeDetails.current[2] = ref
                break;
            case "category":
                memeDetails.current[3] = ref
                break;
            default:
                break;
        }

    }
    console.log(memeDetails.current[0]);
    console.log(memeDetails.current[1]);
    console.log(memeDetails.current[2]);
    console.log(memeDetails.current[3]);
    console.log(meme)


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
                    <div className='w-full relative h-[8rem] flex justify-center cursor-pointer'>
                        <Image className='absolute rounded-full cursor-pointer' src="/images/add-icon.png" width={120} height={120} alt='Add meme' quality={100} />
                        <input onChange={e => memeHandler(e)} className='z-50 opacity-0 cursor-pointer' type="file" name="meme" id="meme" />
                    </div>
                </>}
            </div>
        </div>
      </div>
      <div className="w-full mt-12 md:mt-0 md:w-1/2">
        <div className="flex flex-col gap-y-3 items-start">
          <h1 className="w-full text-h5 xl:text-h4 font-bold">
            {/* <input type="text" name="title" ref={(ref) => memeDetails.current[0] = ref}  /> */}
            <input className='w-full text-dim-gray bg-transparent rounded-2xl p-[0 2px 0 10px] pl-3' placeholder='Title of Meme' type="text" name="title" onChange={(ref) => detailsRefHandler("title", ref.target.value  as unknown as HTMLInputElement)} />
          </h1>
          <p className="w-full text-text text-base xl:text-h6 2xl:text-h5 max-w-[50ch] text-balance pb-3">
            <textarea className='w-full text-dim-gray bg-transparent rounded-2xl p-[0 2px 0 10px] pl-3' placeholder='Enter Description Here' name="description" onChange={(ref) => detailsRefHandler("description", ref.target.value as unknown as HTMLInputElement)} />
          </p>
            <input className='w-1/2 p-1 text-dim-gray bg-transparent rounded-2xl p-[0 2px 0 10px] pl-3' placeholder='Enter source...' type="text" name="source" onChange={(ref) => detailsRefHandler("source", ref.target.value as unknown as HTMLInputElement)} />
        </div>

        <div className="flex flex-col gap-x-2 mt-12 divide-y-2 divide-outline divide-opacity-20 text-xs xl:text-base 2xl:text-h6">
          <div className=" gap-x-1 grid grid-cols-12 border-t-2 border-outline border-opacity-20 py-2">
            <h2 className=" font-semibold col-span-4">Category</h2>
            <span className=" col-span-8 text-bg px-1">
            <select onChange={(ref) => detailsRefHandler("category", ref.target.value as unknown as HTMLInputElement)}>
                <option>Dev</option>
                <option>Dark</option>
            </select>
            </span>
          </div>
          <div className=" gap-x-1 grid grid-cols-12 ">
            <h2 className=" font-semibold col-span-2 pt-2">Tags</h2>
            <span className="flex flex-col mt-2 col-span-10  text-text">
            <input value={tagValue} onChange={e => setTagValue(e.target.value)} onBlur={() => handleTags()}
          onKeyDown={e => e.key === "Enter" && handleTags() } type="text" name="tag" placeholder="type + enter" className="bg-[#d5d5d5] text-[#000] mr-1 rounded-[10px] outline-none w-full max-w-[50%] p-[5px]"/>

            {tags.map((tag, i) => {

            return (
                <span key={i} onClick={() => {
                    const newTags = tags.filter(item => item !== tag)
                    setTags(newTags)

                    }}
                    className="cursor-pointer py-2 border-b-2 text-[#fff] border-outline border-opacity-20 px-1 hover:scale-105 hover:text-[#4d4d4d]">
                {tag}
                </span>
            )})} 


            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default NewMemePage