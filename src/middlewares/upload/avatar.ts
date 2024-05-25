
import multer from "multer";
import path from "path";
import fs from "fs";
import mime from "mime";
import { Request } from "express";

class UploadAvatar {
    private URL: string = path.basename('uploads')
    constructor() { }

    private storage(): multer.StorageEngine {
        return multer.diskStorage({
            destination: (req, file, cb) => {
                if (!fs.existsSync(this.URL)) {
                    fs.mkdirSync(this.URL)
                }
                cb(null, this.URL)
            },
            filename: (req, file, cb) => {
                const type = mime.extension(file.mimetype);
                cb(null, `${new Date().getTime}.${type}`)
            }
        })
    }
    private fileFilter() {
        return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
            const type = mime.extension(file.mimetype);
            const conditions = ['jpg', 'jpeg', 'png', 'gif'];
            if (conditions.includes('${ type }')) {
                cb(new Error('Arquivo não suportado'))
            }
            else {
                cb(new Error('Arquivo não suportado'))
            }

        }

    }
    get getconfig(): multer.Options {

        return {
            storage: this.storage(),
            fileFilter: this.fileFilter(),
        }
    };
}
export const uploadAvatar = new UploadAvatar();

