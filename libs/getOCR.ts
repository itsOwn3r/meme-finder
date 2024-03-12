import { createWorker } from 'tesseract.js';
export const getOCR = async (image: File) => {
    
    try {
        // if (process.env.IS_OCR_ACTIVE === "yes") { // process .env can't be accessed in client components and tesseract.js doesn't work in nextjs server component :(
            const worker = await createWorker([{code: 'eng', data: "eng"}, {code: 'fas', data: "fas"}]);
            const ret = await worker.recognize(image);
            console.log(ret.data.text);
            await worker.terminate();
            return ret.data.text;
        // } else {
        //     return null;
        // }
    } catch (error) {
        console.log(error);
        return null;
    }
}