import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    try {
        const formData = await req.formData();

        const sendToWrapper = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/new/threads/wrapper`, {
            method: "POST",
            body: formData
        })

        const data = await sendToWrapper.json();
        
        if (data?.success) {
            return NextResponse.json({ success: true });
        } else {
            return NextResponse.json({ success: false });
        }
        
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message, success: false});
        
    }
}