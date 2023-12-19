import Link from 'next/link'
import type { Orphanage } from '@/types/orphanage'
import { api } from '@/data/api'
import * as Map from '@/components/Map'
import { PreviewImage } from '@/components/PreviewImage'
import { Clock, MessageCircle } from 'lucide-react'
import { ButtonDarkMode } from '@/components/button-dark-mode'

interface OrphanagesDetailProps {
  params: {
    orphanageId: string
  }
}

async function getOrphanage(orphanageId: string): Promise<Orphanage | null> {
  const response = await api(`/orphanages/${orphanageId}`, {
    cache: 'no-cache',
  })
  const { orphanage } = await response.json()

  return orphanage
}

export default async function OrphanageDetail({
  params,
}: OrphanagesDetailProps) {
  const orphanage = await getOrphanage(params.orphanageId)

  if (!orphanage) {
    return null
  }

  const urlNavigateToGoogleMap = `https://www.google.com/maps/search/?api=1&query=${orphanage.latitude},${orphanage.longitude}`
  const urSendMessageToWhatsapp = `https://wa.me/55${orphanage.phone}/?text=urlencodedtext`

  const areOpenOnTheWeekendText = orphanage.are_open_on_the_weekend
    ? 'Atendemos fim de semana'
    : 'Não atendemos fim de semana'

  return (
    <div className="flex flex-col items-center bg-gray-100 pb-20 pt-10">
      <span className="text-center text-lg font-semibold text-gray-600">
        Orfanato
      </span>

      <div className="mt-10 w-[708px] overflow-hidden rounded-[20px] border border-gray-300 bg-white pb-20">
        <PreviewImage orphanageImage={orphanage} />

        <div className="mt-16 px-20">
          <h2 className="truncate text-5xl font-bold text-title">
            {orphanage.name}
          </h2>
          <span className="mt-8 block text-lg font-semibold text-text-base">
            {orphanage.description}
          </span>

          <Map.Root className="mx-auto mt-16 w-full max-w-[34rem] overflow-hidden rounded-[1.25rem]">
            <Map.Preview
              latitude={orphanage.latitude}
              longitude={orphanage.longitude}
            />

            <Map.Footer className="w-full">
              <Link
                href={urlNavigateToGoogleMap}
                target="_blank"
                className="flex h-12 w-full items-center justify-center bg-blue-400 transition-colors hover:bg-blue-600"
              >
                <span className="text-lg font-bold text-white">
                  Ver rotas no Google Maps
                </span>
              </Link>
            </Map.Footer>
          </Map.Root>

          <div className="my-16 border-[0.0625rem] border-gray-300" />

          <div className="flex flex-col gap-6">
            <h2 className="text-4xl font-bold text-title">
              Instruções para visita
            </h2>

            <span className="text-xl font-semibold text-text-base">
              {orphanage.visiting_instructions}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-5">
            <div className="flex h-44 flex-col gap-4 rounded-[1.25rem] border border-gray-100 bg-gray-200 px-6 py-8">
              <Clock className="h-10 w-10 text-blue-700" />

              <div className="flex flex-col">
                <span className="text-xl font-semibold text-text-base">
                  Horário de visitas
                </span>

                <span className="text-xl font-semibold text-text-base">
                  {orphanage.visiting_hours}
                </span>
              </div>
            </div>

            <div
              data-are-open-on-weekends={orphanage.are_open_on_the_weekend}
              className="group flex h-44 flex-col gap-4 rounded-[1.25rem] border border-green-100 bg-green-50 py-8 pl-6 pr-20 data-[are-open-on-weekends=false]:border-pink-900 data-[are-open-on-weekends=false]:bg-pink-50"
            >
              <Clock className="h-10 w-10 text-green-600 group-data-[are-open-on-weekends=false]:text-pink-900" />

              <div className="flex flex-col">
                <span className="text-xl font-semibold text-green-600 group-data-[are-open-on-weekends=false]:text-pink-900">
                  {areOpenOnTheWeekendText}
                </span>
              </div>
            </div>
          </div>

          <Link
            href={urSendMessageToWhatsapp}
            target="_blank"
            className="mt-16 flex h-16 w-full items-center justify-center gap-4 rounded-[1.25rem] bg-green-300"
          >
            <MessageCircle className="h-7 w-7 text-white" />
            <span className="text-xl font-bold text-white">
              Entrar em contato
            </span>
          </Link>
        </div>
      </div>

      <ButtonDarkMode className="absolute right-5 top-5 z-[1000] bg-zinc-900 hover:bg-zinc-900 lg:right-10 lg:top-10" />
    </div>
  )
}
