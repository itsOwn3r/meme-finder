import { getOCR } from "@/libs/getOCR";
import { NextRequest, NextResponse } from "next/server";
import db from "@/db"


export async function GET(req: NextRequest){
    try {
        const parsedUrl = new URL(req.url);
        console.log(parsedUrl);
        // searchParams.get() will properly handle decoding the values.
        console.log('Title shared: ' + parsedUrl.searchParams.get('title'));
        console.log('Text shared: ' + parsedUrl.searchParams.get('text'));
        console.log('URL shared: ' + parsedUrl.searchParams.get('url'));
        const url = parsedUrl.searchParams.getAll('url');
        console.log(url);
        // const formData = await req.formData();
        // const title = formData.get("title");
        // const text = formData.get("text");
        // const urls = formData.get("url");
        // const files = formData.getAll("file");
        console.log(`${process.env.NEXT_PUBLIC_URL}/api/converter/?url=${url}`);
        const getImage = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/converter/?url=${url}`, {
            method: "GET"
        });
        const response = await getImage.json();
        const downloadedImage = [response.image]
        const images: string[] = [];
        console.log(response);
        // Uploading the image(s)
        const uploadURL = `https://api.cloudinary.com/v1_1/${process.env.cloud_name}/upload`;
        
        
        for (let meme of downloadedImage) {
            const secondFormData = new FormData();
            secondFormData.append("file", meme);
            secondFormData.append("upload_preset", process.env.upload_preset!);
            
            try {
                const req = await fetch(uploadURL, {
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
            console.log(images);
            console.log(ocrHandler);
            const createMeme = await db.memes.create({
                data: {
                    meme: images[0],
                    title: "Meme From Threads",
                    ocr: ocrHandler,
                    source:  "PWA",
                }
            })
            
            
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL!}/edit/${createMeme.id}`, { status: 302 });
            

        // return NextResponse.json({ message: "Get What?", success: false});
    }  catch (error) {
        console.log(error);
        return NextResponse.json({ message: (error as Error).message, success: false});
    }
}

// export async function POST(req: NextRequest){
//     try {
//         const formData = await req.formData();
//         const title = formData.get("title");
//         const text = formData.get("text");
//         const urls = formData.get("url");
//         const files = formData.getAll("file");

//         console.log("title: ", title);
//         console.log("text: ", text);
//         console.log("urls: ", urls);
//         console.log("files: ", files[0]);
//         return NextResponse.json({ message: "What?", success: false});
//         // Empty arr to store the image urls
//         const images: string[] = [];
        
//         // Uploading the image(s)
//         const url = `https://api.cloudinary.com/v1_1/${process.env.cloud_name}/upload`;
        
        
//         for (let meme of files) {
//             const secondFormData = new FormData();
//             secondFormData.append("file", meme);
//             secondFormData.append("upload_preset", process.env.upload_preset!);
            
//             try {
//                 const req = await fetch(url, {
//                     method: "POST",
//                     body: secondFormData,
//                 });
//                 const response = await req.json();
//                 if (response.secure_url) {
//                     images.push(response.secure_url);
//                 }
                
//             } catch (error) {
//                 return NextResponse.json(
//                     { status: "Not Ok", success: false, error },
//                     { status: 400 }
//                     );
//                 }
//             }
            
//             const ocrHandler = await getOCR(images[0] ? images[0] : null)
            
//             const createMeme = await db.memes.create({
//                 data: {
//                     meme: images[0],
//                     title: title as string || "No Title",
//                     ocr: ocrHandler,
//                     source:  "PWA",
//                 }
//             })
            
            
//             return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL!}/edit/${createMeme.id}`, { status: 302 });
            
//         } catch (error) {
//         return NextResponse.json({ message: (error as Error).message, success: false});
        
//     }
// }