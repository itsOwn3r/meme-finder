const { createWorker } = require('tesseract.js');
const getOCR = async () => {
    
    try {
        // if (process.env.IS_OCR_ACTIVE === "yes") { // process .env can't be accessed in client components and tesseract.js doesn't work in nextjs server component :(
            const worker = await createWorker([{code: 'eng', data: "eng"}, {code: 'fas', data: "fas"}]);
            const ret = await worker.recognize("https://res.cloudinary.com/droxqswxo/image/upload/v1710317603/ibu9ck6qt6usawnucbli.jpg");
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
getOCR()