import { ObjToSendType } from "@/app/new/page";
import { getOCR } from "@/libs/getOCR";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db"

export async function POST(req: NextRequest){
    try {
        const formData = await req.formData();
        const body: ObjToSendType = JSON.parse(formData.get("body") as string);
        const memes = formData.getAll("meme");
        const password = formData.get("password");

        if (password !== process.env.PASSWORD) {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 400 });
        }

         // Empty arr to store the image urls
        const images: string[] = [];


        images.push(memes[0] as string);


        const createMeme = await db.memes.create({
            data: {
                meme: images[0],
                title: body.title as string,
                description: body.description as string,
                source:  "Threads",
                category: "Threads",
                tags: body.tags || []
            }
        })

        for (const img of images) {

            const createMemeItems = await db.memeItem.create({
                data: {
                    memeId: createMeme.id,
                    url: img
                }
            })

    }


        return NextResponse.json({ success: true, images, id: createMeme.id });

    } catch (error) {
        return NextResponse.json({ message: (error as Error).message, success: false});
        
    }
}