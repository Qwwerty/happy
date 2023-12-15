import { z } from 'zod'

const envSchema = z.string()

const _env = envSchema.safeParse(process.env.NEXT_PUBLIC_MAP_BOX_TOKEN)

if (_env.success === false) {
  console.log('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = {
  NEXT_PUBLIC_MAP_BOX_TOKEN: _env.data,
}
