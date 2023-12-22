import Image from 'next/image'

import * as Map from '@/components/Map'
import { ButtonDarkMode } from '@/components/button-dark-mode'
import { Link } from '@/components/link'
import { Plus } from 'lucide-react'
import { api } from '@/services/api'

interface IPhoto {
  name: string
  url: string
}

export interface IOrphanage {
  id: string
  name: string
  description: string
  phone: string
  latitude: number
  longitude: number
  visiting_instructions: string
  visiting_hours: string
  are_open_on_the_weekend: boolean
  photos: IPhoto[]
}

async function fetchOrphanages(): Promise<IOrphanage[]> {
  try {
    const { data } = await api.get('/orphanages')
    const { orphanages } = data

    return orphanages
  } catch (error) {
    return []
  }
}

export default async function Location() {
  const orphanages = await fetchOrphanages()

  return (
    <div className="relative grid min-h-screen grid-cols-location">
      <div className="hidden h-full flex-col justify-between bg-gradient-to-t from-blue-500 to-cyan-400 py-20 pl-28 pr-20 pt-20 dark:from-zinc-900 dark:to-zinc-950 lg:flex">
        <div className="flex flex-col gap-20">
          <Image src="/local.svg" width={64} height={72} quality={100} alt="" />

          <p className="flex flex-col gap-6 text-4xl font-extrabold text-white">
            Escolha um orfanato no mapa
            <span className="text-lg font-semibold text-white">
              Muitas crianças estão esperando a sua visita :)
            </span>
          </p>
        </div>

        <p className="flex flex-col text-lg font-extrabold text-white">
          Ubá
          <span className="text-lg font-semibold text-white">Minas Gerais</span>
        </p>
      </div>

      <Map.Root>
        <Map.Control orphanages={orphanages} />
      </Map.Root>

      <Link
        href="/orphanage/create"
        className="absolute bottom-5 right-5 z-[1000] flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-400 transition-colors hover:bg-blue-300 lg:bottom-10 lg:right-10"
      >
        <Plus className="h-8 w-8 stroke-2 font-extrabold text-white" />
      </Link>

      <ButtonDarkMode className="absolute right-5 top-5 z-[1000] bg-zinc-900 hover:bg-zinc-900 lg:right-10 lg:top-10" />
    </div>
  )
}
