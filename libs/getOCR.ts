import { execSync } from 'child_process'

export const getOCR = async (image: string | null) => {
    if (process.env.IS_OCR_ACTIVE === "yes" || image !== null) {
        
    try {

        const execCommand = execSync(`tesseract ${image} stdout -l eng+fas --oem 1 --psm 3`);
        const stringified = execCommand.toString();
        let sanatized = stringified.replaceAll("\n", " ");
        sanatized = sanatized.replaceAll("\r", " ");
        sanatized = sanatized.replaceAll("'", " ");
        sanatized = sanatized.replaceAll('"', " ");
        sanatized = sanatized.replaceAll("\\", " ");
        sanatized = sanatized.replaceAll("|", " ");
        sanatized = sanatized.replaceAll("’", " ");
        sanatized = sanatized.replaceAll("”", " ");
        sanatized = sanatized.replaceAll("“", " ");
        sanatized = sanatized.trim();
        if (sanatized === "") {
            return null;
        }
        return sanatized;
    } catch (error) {
        console.log(error);
        return null;
    }
} else{
    return null;
}
}