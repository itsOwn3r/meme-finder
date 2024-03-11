import { Lang, createWorker } from 'tesseract.js';
export const getOCR = async (image: File) => {
    
    if (process.env.IS_OCR_ACTIVE === "yes") {
        const worker = await createWorker([{code: 'eng', data: "eng"}, {code: 'fas', data: "fas"}]);
        const ret = await worker.recognize(image);
        console.log(ret.data.text);
        await worker.terminate();
        return ret.data.text;
    } else {
        return null;
    }
}