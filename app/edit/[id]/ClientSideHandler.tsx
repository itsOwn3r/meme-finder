"use client";
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { GoArrowLeft } from 'react-icons/go'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { Memes } from '@prisma/client';
import Button from '@/components/Button/Button';

export type ObjToSendType = {
  title: HTMLInputElement | string[] | string;
  description?: HTMLInputElement | string[] | null | string;
  source?: HTMLInputElement | string[] | null | string;
  category: HTMLInputElement | string[] | null | string;
  tags?: string[];

  OCR?: string | null
}

const EditMemePage = ({memes}: {memes: Memes}) => {
    const [meme, setMeme] = useState<File | Blob | undefined>(undefined);
    const [error, setError] = useState<string | null>(null);
    const memeDetails = useRef<(HTMLInputElement | string[] | null)[]>([]);
    const [tags, setTags] = useState<string[]>([])
    const [tagValue, setTagValue] = useState("")

    const router = useRouter();

    const memeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
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
            case "tags":
                memeDetails.current[4] = tags
                break;
            default:
                break;
        }

    }

    const handleTags = () =>{
        if (tagValue !== "") {

          if (tags.length > 4) { // 5 is the maximum number of tags
            return;
          }

          setTags([...tags, tagValue]);
        }

        setTagValue("");
      }

    const submitHandler = async () => {

        if (!memeDetails.current[0] || !meme) {
            setError("You have to enter the Title and the Meme!");
            return;
        }
        setError(null);

        const OCR = null;

        const ObjToSend: ObjToSendType = {
          title: memeDetails.current[0],
          category: memeDetails.current[3],
          description: memeDetails.current[1],
          source: memeDetails.current[2],
          tags: tags,
          OCR: OCR 
        };

        const formData = new FormData();
        formData.append("meme", meme);
        formData.append("body", JSON.stringify(ObjToSend));

        try {
          const response = await fetch(`/api/edit/${memes?.id}`, {
            method: "POST",
            body: formData
          })

          const data = await response.json();

          if (data.success) {
            router.push(`/meme/${data?.id}`);
          }
        } catch (error) {
          console.log(error);
          setError((error as Error).message);
        }

    }

    // console.log(memes);

    useEffect(() => {
        detailsRefHandler("title", memes.title  as unknown as HTMLInputElement)
        detailsRefHandler("description", memes.description  as unknown as HTMLInputElement)
        detailsRefHandler("source", memes.source  as unknown as HTMLInputElement)
        detailsRefHandler("category", memes.category  as unknown as HTMLInputElement)
        detailsRefHandler("tags", memes.tags  as unknown as HTMLInputElement)
        setTags(memes.tags);
        
        (async() => {
            let response = await fetch(memes.meme);
            let data = await response.blob();
            setMeme(data)
        })()
    },[memes])

  return (
    <section className="mt-8 flex flex-col">
    <Link scroll={false} href="/" className="flex items-center gap-x-1 pl-2 max-w-[7em]">
      <GoArrowLeft color="#F7F7F7" size={24} />
      <span className=" font-semibold text-text text-base">Back</span>
    </Link>
    <div className="flex flex-col md:flex-row mt-5 gap-x-10 lg:gap-x-16 items-start justify-start">
    <div className=" bg-super-dark-gray flex flex-col relative items-center justify-center md:pb-[5em] md:pt-[5em] pt-[2.5em] pb-[2.5em] rounded-2xl w-full md:w-1/2 border-4 border-outline border-opacity-15">
      <div className="absolute w-2/3 rounded-3xl overflow-hidden  shadow-shine bg-transparent bg-opacity-0">
        <>
            <Image
              priority={true}
              alt="Meme"
              src={meme ? URL.createObjectURL(meme as File) : "/images/add-icon.png"}
              className="h-full w-full"
              width={800}
              height={800}
            />
                <input onChange={e => memeHandler(e)} className='absolute w-full h-full z-50 opacity-0 cursor-pointer top-0' type="file" name="meme" id="meme" />

            </>
          </div>
      </div>
      <div className="w-full mt-12 md:mt-0 md:w-1/2">
        <div className="flex flex-col gap-y-3 items-start">

        {error && (
                    <div className='w-full flex justify-center text-h4 cursor-pointer border-b border-b-[red]'>
                        {error}
                    </div>
        )}
          <h1 className="w-full text-h5 xl:text-h4 font-bold">
            <input className='w-full text-[#858585] border border-t-0  bg-transparent rounded-2xl p-[0 2px 0 10px] pl-3' defaultValue={memes.title} type="text" name="title" onChange={(ref) => detailsRefHandler("title", ref.target.value  as unknown as HTMLInputElement)} />
          </h1>
          <p className="w-full text-text text-base xl:text-h6 2xl:text-h5 max-w-[50ch] text-balance pb-3">
            <textarea className='w-full border border-t-0 text-[#858585] bg-transparent rounded-2xl p-[0 2px 0 10px] pl-3' defaultValue={memes.description || "Enter description"} name="description" onChange={(ref) => detailsRefHandler("description", ref.target.value as unknown as HTMLInputElement)} />
          </p>
            <input className='w-1/2 p-1 border border-t-0 text-[#858585] bg-transparent rounded-2xl p-[0 2px 0 10px] pl-3' defaultValue={memes.source ? memes.source : 'Enter source...'} type="text" name="source" onChange={(ref) => detailsRefHandler("source", ref.target.value as unknown as HTMLInputElement)} />
        </div>

        <div className="flex flex-col gap-x-2 mt-12 divide-y-2 divide-outline divide-opacity-20 text-xs xl:text-base 2xl:text-h6">
          <div className=" gap-x-1 grid grid-cols-12 border-t-2 border-outline border-opacity-20 py-2">
            <h2 className=" font-semibold col-span-2">Category</h2>
            <span className="col-span-10 text-bg px-1">
            <select defaultValue={memes.category || "general"} onChange={(ref) => detailsRefHandler("category", ref.target.value as unknown as HTMLInputElement)} className='bg-[#3c3c3c] text-h5 rounded-md max-w-[10em] text-[#cbcbcb] px-1'>
                <option value="general">General</option>
                <option value="dev">Dev</option>
                <option value="ai">AI</option>
                <option value="linux">Linux</option>
                <option value="dark">Dark</option>
                <option value="sleep">Sleep</option>
                <option value="not a meme">Not a Meme</option>
                <option>Kualalampour</option>
            </select>
            </span>
          </div>
          <div className=" gap-x-1 grid grid-cols-12 mb-3">
            <h2 className=" font-semibold col-span-2 pt-2">Tags</h2>
            <span className="flex flex-col mt-2 col-span-10  text-text">
            <input value={tagValue} onChange={e => setTagValue(e.target.value)} onBlur={() => handleTags() }
          onKeyDown={e => e.key === "Enter" && handleTags() } type="text" name="tag" placeholder="type + enter" className="bg-[#3c3c3c] text-[#fff] mr-1 rounded-[10px] outline-none w-full max-w-[50%] p-[5px]"/>

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
          
        <div className='w-full text-center'>
            <button type='button' onClick={submitHandler} className='mt-2 bg-[#004603] hover:bg-[#36853a] py-2 px-20 rounded-lg font-bold text-h5'>Submit</button>
        </div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default EditMemePage