'use client'

import { Controller, FormProvider, useForm } from 'react-hook-form'
import { createOrphanageFormSchema, CreateOrphanageFormData } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Switch from '@radix-ui/react-switch'
import * as FileInput from '@/components/FileInput'
import * as Map from '@/components/Map'
import { Form } from '@/components/Form'
import { Toast } from '@/utils/Toast'
import { api } from '@/services/api'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ButtonDarkMode } from '@/components/button-dark-mode'
import dynamic from 'next/dynamic'

const MapChoose = dynamic(
  () => import('@/components/Map/Choose').then((module) => module.Choose),
  { ssr: false },
)

export default function Create() {
  const router = useRouter()

  const createOrphanageForm = useForm<CreateOrphanageFormData>({
    defaultValues: {
      name: '',
      description: '',
      phone: '',
      latitude: 91, // force error with values wrongs
      longitude: 181, // force error with values wrongs
      visitingHours: '',
      visitingInstructions: '',
      areOpenOnTheWeekend: false,
      photos: [] as any,
    },
    resolver: zodResolver(createOrphanageFormSchema),
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = createOrphanageForm

  async function handleCreateOrphanage(data: CreateOrphanageFormData) {
    const {
      name,
      description,
      phone,
      latitude,
      longitude,
      photos,
      visitingHours,
      visitingInstructions,
      areOpenOnTheWeekend,
    } = data
    const formData = new FormData()

    const filesListToArrayOfPhotos = Array.from(photos as ArrayLike<File>)

    formData.append('name', name)
    formData.append('description', description)
    formData.append('phone', phone)
    formData.append('latitude', String(latitude))
    formData.append('longitude', String(longitude))
    formData.append('areOpenOnTheWeekend', String(areOpenOnTheWeekend))
    formData.append('visitingInstructions', visitingInstructions)
    formData.append('visitingHours', visitingHours)

    filesListToArrayOfPhotos.forEach((photo) => {
      formData.append('images', photo)
    })

    try {
      await api.post('/orphanages', formData)

      Toast.success('Cadastro realizado com sucesso!')
      router.push('/location')
    } catch (error) {
      Toast.error('Cadastro não realizado!')
    }
  }

  return (
    <div className="flex justify-center bg-gray-100 pb-20 pt-10">
      <FormProvider {...createOrphanageForm}>
        <form
          onSubmit={handleSubmit(handleCreateOrphanage)}
          className="w-full max-w-[708px]"
        >
          <h6 className="text-center text-lg font-semibold text-gray-600">
            Adicione um orfanato
          </h6>

          <div className="mt-10 rounded-[1.25rem] border border-gray-300 bg-white px-20 pb-20 pt-10 shadow-lg">
            <span className="text-3xl font-bold text-title">Dados</span>

            <div className="mb-10 mt-6 border-[0.0625rem] border-gray-300" />

            <Map.Root className="overflow-hidden rounded-[1.25rem]">
              <MapChoose />
              <Map.Footer className="flex h-12 w-full items-center justify-center  bg-blue-400">
                <span className=" text-lg font-bold text-white">
                  Clique no mapa para adicionar a localização
                </span>
              </Map.Footer>
              <Form.ErrorMessage field="latitude" className="absolute" />
            </Map.Root>

            <div className="mb-20 mt-10 space-y-6">
              <Form.Field>
                <Form.Label htmlFor="name">Nome</Form.Label>
                <Form.Input type="text" name="name" required />
                <Form.ErrorMessage field="name" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="description">Descrição</Form.Label>
                <Form.TextArea
                  name="description"
                  maxLength={300}
                  className="h-52 resize-none"
                  required
                />
                <Form.ErrorMessage field="description" />
              </Form.Field>

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <Form.Field>
                    <Form.Label>Número de Whatsapp</Form.Label>
                    <Form.Phone
                      name="phone"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      required
                    />

                    <Form.ErrorMessage field="phone" />
                  </Form.Field>
                )}
              />

              <FileInput.Root>
                <FileInput.Title className="mb-4 block text-base font-semibold text-gray-600">
                  Fotos
                </FileInput.Title>
                <FileInput.FileList>
                  <FileInput.Trigger />
                </FileInput.FileList>
                <FileInput.Control required />

                <Form.ErrorMessage field="photos" />
              </FileInput.Root>
            </div>

            <h6 className="text-3xl font-bold text-title">Visitação</h6>

            <div className="mb-10 mt-6 border-[0.0625rem] border-gray-300" />

            <div className="flex flex-col space-y-6">
              <Form.Field>
                <Form.Label htmlFor="visiting_instructions">
                  Instruções
                </Form.Label>

                <Form.TextArea
                  name="visitingInstructions"
                  className="h-52 resize-none"
                  required
                />
                <Form.ErrorMessage field="visitingInstructions" />
              </Form.Field>

              <Form.Field>
                <Form.Label htmlFor="visitingHours">
                  Horário das visitas
                </Form.Label>

                <Form.Input name="visitingHours" required />
                <Form.ErrorMessage field="visitingHours" />
              </Form.Field>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-base font-semibold text-gray-600">
                Atende fim de semana?
              </span>

              <Controller
                name="areOpenOnTheWeekend"
                control={control}
                render={({ field }) => (
                  <Switch.Root
                    onCheckedChange={(checked) => field.onChange(checked)}
                    className="relative h-6 w-16 rounded-full border border-gray-300 bg-gray-50 shadow-sm outline-none data-[state=checked]:bg-green-600"
                  >
                    <Switch.Thumb
                      className="block h-4 w-8 translate-x-0.5 rounded-full bg-gray-600 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[28px] data-[state=checked]:bg-white"
                      {...register('areOpenOnTheWeekend')}
                    />
                  </Switch.Root>
                )}
              />
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="mt-10 flex h-16 w-full items-center justify-center rounded-[1.25rem] bg-green-500 text-lg font-bold text-white transition-colors hover:bg-green-700 disabled:bg-gray-400"
            >
              {!isSubmitting ? (
                'Confirmar'
              ) : (
                <Loader2 className="h-7 w-7 animate-spin" />
              )}
            </button>
          </div>
        </form>
      </FormProvider>

      <ButtonDarkMode className="absolute right-5 top-5 z-[1000] bg-zinc-900 hover:bg-zinc-900 lg:right-10 lg:top-10" />
    </div>
  )
}
