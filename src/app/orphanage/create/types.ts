import { z } from 'zod'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png']

export const createOrphanageFormSchema = z.object({
  name: z.string().min(3, 'Mínimo 3 caracteres.'),
  description: z.string().min(20, 'Mínimo 20 caracteres.'),
  phone: z
    .string()
    .min(16, 'Telefone inválido.')
    .refine((text) => {
      const phoneWithoutMask = text.replaceAll(/[()\s-_]/g, '').trim()

      return phoneWithoutMask.length === 11
    }, 'Telefone inválido.'),
  latitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 90
  }, 'Localização obrigatória.'),
  longitude: z.coerce.number().refine((value) => {
    return Math.abs(value) <= 180
  }),
  visitingInstructions: z.string().min(10, 'Mínimo 10 caracteres.'),
  areOpenOnTheWeekend: z.boolean(),
  visitingHours: z.string().min(1, 'Campo obrigatório.'),
  photos: z
    .instanceof(FileList, { message: 'Mínmo uma imagem.' })
    .refine((files) => files.length >= 1, 'Mínimo uma imagem.')
    .refine((files) => {
      let hasAllowedImage = true

      for (let i = 0; i < files.length; i++) {
        if (
          files.item(i)!.size > MAX_FILE_SIZE ||
          !ACCEPTED_IMAGE_TYPES.includes(files.item(i)!.type)
        ) {
          hasAllowedImage = false
          break
        }
      }

      return hasAllowedImage
    }, 'Tamanho máximo de 5MB'),
})

export type CreateOrphanageFormData = z.infer<typeof createOrphanageFormSchema>
