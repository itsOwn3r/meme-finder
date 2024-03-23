import { getOCR } from "@/libs/getOCR";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db"

export async function POST(req: NextRequest){
    try {
        const formData = await req.formData();
        const title = formData.get("title");
        const text = formData.get("text");
        const urls = formData.get("url");
        const files = formData.getAll("file");

        // Empty arr to store the image urls
        const images: string[] = [];
        
        // Uploading the image(s)
        const url = `https://api.cloudinary.com/v1_1/${process.env.cloud_name}/upload`;
        
        
        for (let meme of files) {
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
                    title: title as string || "No Title",
                    ocr: ocrHandler,
                    source:  "PWA",
                }
            })
            
            
            return NextResponse.redirect(process.env.NEXT_PUBLIC_URL!, { status: 302 });
            
        } catch (error) {
        return NextResponse.json({ message: (error as Error).message, success: false});
        
    }
}