'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { Orphanage } from '@/types/orphanage'
import * as Map from '@/components/Map'
import { PreviewImage } from '@/components/PreviewImage'
import { Clock, Loader2, MessageCircle } from 'lucide-react'
import { ButtonDarkMode } from '@/components/button-dark-mode'
import { api } from '@/services/api'
import { Toast } from '@/utils/Toast'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

const MapPreview = dynamic(
  () => import('@/components/Map/Preview').then((module) => module.Preview),
  { ssr: false },
)

interface OrphanagesDetailProps {
  params: {
    orphanageId: string
  }
}

export default function OrphanageDetail({ params }: OrphanagesDetailProps) {
  const [orphanage, setOrphanage] = useState<Orphanage | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  async function getOrphanage(orphanageId: string) {
    setIsLoading(true)

    try {
      const { data } = await api.get(`/orphanages/${orphanageId}`)
      const { orphanage } = data

      setOrphanage(orphanage)
    } catch (error) {
      Toast.error('Orfanato não encontrado')

      router.push('/location')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getOrphanage(params.orphanageId)
  }, [params.orphanageId])

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4 bg-gradient-to-t from-blue-500 to-cyan-400 dark:from-zinc-900 dark:to-zinc-950">
        <Loader2 className="h-20 w-20 animate-spin text-white" />
        <span className="text-lg text-white">Buscando orfanato...</span>
      </div>
    )
  }

  const urlNavigateToGoogleMap = `https://www.google.com/maps/search/?api=1&query=${orphanage?.latitude},${orphanage?.longitude}`
  const urSendMessageToWhatsapp = `https://wa.me/55${orphanage?.phone}/?text=urlencodedtext`

  const areOpenOnTheWeekendText = orphanage?.are_open_on_the_weekend
    ? 'Atendemos fim de semana'
    : 'Não atendemos fim de semana'

  return (
    <div className="flex flex-col items-center bg-gray-100 pb-20 pt-10">
      <span className="text-center text-lg font-semibold text-gray-600">
        Orfanato
      </span>

      <div className="mt-10 w-[708px] overflow-hidden rounded-[20px] border border-gray-300 bg-white pb-20">
        {orphanage && <PreviewImage orphanageImage={orphanage!} />}

        <div className="mt-16 px-20">
          <h2 className="break-all text-5xl font-bold text-title">
            {orphanage?.name}
          </h2>
          <span className="mt-8 block break-all text-lg font-semibold text-text-base">
            {orphanage?.description}
          </span>

          <Map.Root className="mx-auto mt-16 w-full max-w-[34rem] overflow-hidden rounded-[1.25rem]">
            <MapPreview
              latitude={orphanage?.latitude ?? 0}
              longitude={orphanage?.longitude ?? 0}
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

            <span className="break-all text-xl font-semibold text-text-base">
              {orphanage?.visiting_instructions}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-5">
            <div className="flex h-44 flex-col gap-4 rounded-[1.25rem] border border-gray-400 bg-gray-200 px-6 py-8">
              <Clock className="h-10 w-10 text-blue-700" />

              <div className="flex flex-col">
                <span className="text-xl font-semibold text-text-base">
                  Horário de visitas
                </span>

                <span className="truncate text-xl font-semibold text-text-base">
                  {orphanage?.visiting_hours}
                </span>
              </div>
            </div>

            <div
              data-are-open-on-weekends={orphanage?.are_open_on_the_weekend}
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
            className="mt-16 flex h-16 w-full items-center justify-center gap-4 rounded-[1.25rem] bg-green-300 transition-colors hover:bg-green-500"
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
