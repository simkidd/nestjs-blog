import * as Cloudinary from 'cloudinary';
import { config } from './config';


export const cloudinary = Cloudinary.v2;

const options: Cloudinary.ConfigOptions = {
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
}

cloudinary.config(options)

export const cloudinaryUpload = async (image: string) => {
    try {
        const res = await cloudinary.uploader.upload(image, {

        })

        return res.secure_url
    } catch (error) {
        throw error
    }
}