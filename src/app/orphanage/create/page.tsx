'use client'

import { useForm } from 'react-hook-form'
import * as Switch from '@radix-ui/react-switch'
import * as FileInput from '@/components/FileInput'
import * as Map from '@/components/Map'
import { Input } from '@/components/input'
import { TextArea } from '@/components/textarea'

interface IOrphanage {
  positionX: number
  positionY: number
  name: string
  about: string
  phone: string
  images: Array<unknown>
  instructions: string
  visitingHours: string
  isOpenWeekend: boolean
}

export default function Create() {
  const { register, handleSubmit } = useForm<IOrphanage>()

  function handleCreateOrphanage() {
    console.log('test')
  }

  return (
    <div className="flex justify-center bg-gray-100 pb-20 pt-10">
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

          <div className="relative h-72 overflow-hidden rounded-[1.25rem] border border-gray-100">
            <Map.Root>
              <Map.Preview latitude={-21.1248353} longitude={-42.9506151} />
            </Map.Root>

            <div className="absolute bottom-0 left-0 right-0 z-[1000] flex h-12 items-center justify-center bg-gray-50">
              <span className="text-sm font-bold text-blue-600">
                Clique no mapa para adicionar a localização
              </span>
            </div>
          </div>

          <div className="mb-20 mt-10 space-y-6">
            <Input name="name" label="Nome" defaultValue="Orf. E sperança" />

            <TextArea
              name="about"
              label="Sobre"
              maxLength={300}
              defaultValue="Presta assistência a crianças de 06 a 15 anos que se encontre em situação de risco e/ou vulnerabilidade social."
              className="h-52 resize-none"
            />

            <Input
              name="phone"
              label="Número de Whatsapp"
              defaultValue="(47) 9 9293 1142"
            />

            <FileInput.Root>
              <FileInput.Title className="mb-4 block text-base font-semibold text-gray-600">
                Fotos
              </FileInput.Title>
              <FileInput.FileList>
                <FileInput.Trigger />
              </FileInput.FileList>
              <FileInput.Control />
            </FileInput.Root>
          </div>

          <h6 className="text-3xl font-bold text-title">Visitação</h6>

          <div className="mb-10 mt-6 border-[0.0625rem] border-gray-300" />

          <div className="flex flex-col space-y-6">
            <TextArea
              label="Instruções"
              name="instructions"
              className="h-32 resize-none"
              defaultValue="Venha como se sentir a vontade e traga muito amor e paciência para dar."
            />

            <Input
              label="Horário das visitas"
              name="visitingHours"
              defaultValue="Das 8h até 18h"
            />
          </div>

          <div className="mt-8 flex items-center justify-between">
            <span className="text-base font-semibold text-gray-600">
              Atende fim de semana?
            </span>

            <Switch.Root className="relative h-6 w-16 rounded-full border border-gray-300 bg-gray-50 shadow-sm outline-none data-[state=checked]:bg-green-600">
              <Switch.Thumb className="block h-4 w-8 translate-x-0.5 rounded-full bg-gray-600 transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[28px] data-[state=checked]:bg-white" />
            </Switch.Root>
          </div>

          <button
            type="submit"
            className="mt-10 h-16 w-full rounded-[1.25rem] bg-green-500 text-lg font-bold text-white transition-colors hover:bg-green-700"
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  )
}
