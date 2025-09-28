import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

export const PORT = process.env.PORT;
export const SECRET_KEY = process.env.SECRET_KEY!;
export const SALT_VALUE = process.env.SALT_VALUE;
export const EMAIL_USER= process.env.EMAIL_USER;
export const EMAIL_PASS= process.env.EMAIL_PASS;
export const EMAIL_HOST= process.env.EMAIL_HOST;
export const EMAIL_PORT= process.env.EMAIL_PORT;