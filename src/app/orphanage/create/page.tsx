import { Input } from '@/components/input'
import { TextArea } from '@/components/textarea'
import * as FileInput from '@/components/FileInput'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default function Create() {
  return (
    <div className="flex justify-center bg-gray-100 pb-20 pt-10">
      <div className="w-full max-w-[708px]">
        <h6 className="text-center text-lg font-semibold text-gray-600">
          Adicione um orfanato
        </h6>

        <div className="mt-10 rounded-[1.25rem] border border-gray-300 bg-white px-20 pb-20 pt-10 shadow-lg">
          <span className="text-3xl font-bold text-title">Dados</span>

          <div className="mb-10 mt-6 border-[0.0625rem] border-gray-300" />

          <div className="relative h-72 overflow-hidden rounded-[1.25rem] border border-gray-100">
            <Map />

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

          <h6>Visitação</h6>

          <div className="mb-10 mt-6 border-[0.0625rem] border-gray-300" />

          <div className="flex flex-col space-y-6">
            <TextArea
              label="Instruções"
              name="instructions"
              className="h-32 resize-none"
            />

            <Input label="Horário das visitas" name="visitingHours" />
          </div>
        </div>
      </div>
    </div>
  )
}
