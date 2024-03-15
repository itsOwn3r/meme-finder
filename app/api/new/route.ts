import { ObjToSendType } from "@/app/new/page";
import { getOCR } from "@/libs/getOCR";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db"

export async function POST(req: NextRequest){
    try {
        const formData = await req.formData();
        const body: ObjToSendType = JSON.parse(formData.get("body") as string);
        const memes = formData.getAll("meme") as File[];

         // Empty arr to store the image urls
        const images: string[] = [];

        // Uploading the image(s)
        const url = `https://api.cloudinary.com/v1_1/${process.env.cloud_name}/upload`;


        for (let meme of memes) {
            const secondFormData = new FormData();
            secondFormData.append("file", meme);
            secondFormData.append("upload_preset", process.env.upload_preset!);
            
            try {
            const req = await fetch(url, {
                method: "POST",
                body: secondFormData,
            });
            const response = await req.json();
            if (response.secure_url) {
                images.push(response.secure_url);
            }

            } catch (error) {
            return NextResponse.json(
                { status: "Not Ok", success: false, error },
                { status: 400 }
            );
            }
        }

        const ocrHandler = await getOCR(images[0] ? images[0] : null)

        const createMeme = await db.memes.create({
            data: {
                meme: images[0],
                title: body.title as string,
                category: body.category as string,
                description: body.description as string,
                ocr: ocrHandler,
                source:  body.source as string,
                tags:   body.tags,
            }
        })


        return NextResponse.json({ success: true, images, id: createMeme.id });

    } catch (error) {
        return NextResponse.json({ message: (error as Error).message, success: false});
        
    }
}