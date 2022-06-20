import { promises as fsPromise } from 'fs';
import processingImage from '../utilities/processingImage';


describe("testing process image",async()=>{
    const filename = 'image', Width = 630, Height = 700;
    const keyToCache = `${filename}-${Width}-${Height}`; 
    it("the image is resized",async()=>{
        const test = await processingImage(filename,Width,Height);
        console.log("mansout");
        await fsPromise.unlink(`images\\thumbnails\\${keyToCache}.jpeg`) //  this wi remove the image after testing 
    })

})