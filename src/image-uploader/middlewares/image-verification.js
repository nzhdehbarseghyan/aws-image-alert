const MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_SIZE = 100 * 1024 * 1024; //100 MBs converted to bytes

const verifyImage = (req, res, next) => {
    try {
        if (!req.file) {
           throw new Error('File is required!');
        }

        if (!MIME_TYPES.includes(req.file.mimetype)) {
            throw new Error('Invalid mime type!');
        }

        if (req.file.size > MAX_SIZE) {
            throw new Error('File size too large!');
        }

        next();
    } catch (e) {
        res.status(400).send({ message: 'Failed', data: e.message });
    }
}

export default verifyImage