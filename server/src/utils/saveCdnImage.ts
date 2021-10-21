import * as fs from "fs";
import * as Jimp from "jimp";
import * as path from "path";
import * as uuid from "uuid";
import appRootDir from "app-root-dir";


export async function clearDir(){
    fs.readdir("../static", (err, files) => {
        if (err) throw err;
      
        for (const file of files) {
          fs.unlink(path.join("../static", file), err => {
            if (err) throw err;
          });
        }
      });
}

async function download (uri: string) {
    if(uri==='') return '';

    const image = await Jimp.read(uri);
    const ext = image._originalMime.split("/")[1];
    const imageName = `${uuid.v4()}_${Date.now()}.${ext}`;

    await image.resize(300, Jimp.AUTO);
    await image.writeAsync(`${appRootDir.get()}/static/${imageName}`)

    return `/static/shop/${imageName}`;
};

export default download;