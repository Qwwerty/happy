import { z } from 'zod'

const envSchema = z.string()

const _envMapBox = envSchema.safeParse(process.env.NEXT_PUBLIC_MAP_BOX_TOKEN)
const _envUrl = envSchema.safeParse(process.env.NEXT_PUBLIC_API_BASE_URL)

if (_envMapBox.success === false || _envUrl.success === false) {
  console.log('❌ Invalid environment variables')

  throw new Error('Invalid environment variables.')
}

export const env = {
  NEXT_PUBLIC_MAP_BOX_TOKEN: _envMapBox.data,
  NEXT_PUBLIC_API_BASE_URL: _envUrl.data,
}
