import sharp from "sharp";
import NodeCache from "node-cache";

const nodeCache = new NodeCache();

const proccessingImage = async (filename?:string,Width?:number,Height?:number):Promise<void>=>{

    const image = await sharp(`images/${filename}.jpg`)
    .resize(Width, Height)
    .jpeg();

    const keyToCache = `${filename}-${Width}-${Height}`; // this is an id for each image with it name and format to check
    nodeCache.set(keyToCache, image);
    await image.toFile(`images/thumbnails/${keyToCache}.jpeg`);
    
   // return image.withMetadata();
}

export default proccessingImage;
export { nodeCache };