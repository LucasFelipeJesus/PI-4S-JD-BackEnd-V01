
import crypt from "crypto";
import 

const multer = require('multer');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: (req: any, file: any, callback: (arg0: null, arg1: any) => void) => {
            callback(null, path.resolve(__dirname, '..', '..', 'uploads'));
        },
        filename: (req: any, file: { originalname: any; }, callback: (arg0: null, arg1: string | undefined) => void) => {
            crypt.randomBytes(16, (error: any, hash: Buffer) => {
                if (error) callback(null, error);
                const filename = `${hash.toString('hex')}-${file.originalname}`;
                callback(null, filename);
            });
        },

    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req: any, file: { mimetype: string; }, callback: (arg0: null, arg1: boolean) => void) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
        ];

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(null, false);
        }

    },
}));