import * as dotenv from 'dotenv'

dotenv.config()
const path = `${__dirname}/../../../.env`

dotenv.config({ path })

export const { ENV } = process.env
export const { APP_URL } = process.env
export const { JWT_SECRET } = process.env
export const { DATABASE_URL } = process.env
