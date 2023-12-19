import { api } from '@/data/api'
import * as Map from '@/components/Map'
import { PreviewImage } from '@/components/PreviewImage'
import type { Orphanage } from '@/types/orphanage'
import Link from 'next/link'

interface OrphanagesDetailProps {
  params: {
    orphanageId: string
  }
}

async function getOrphanage(orphanageId: string): Promise<Orphanage | null> {
  const response = await api(`/orphanages/${orphanageId}`)
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

  const urlNavigateToGoogleMap = `https://www.google.com/maps/@${orphanage.latitude},${orphanage.longitude},15z?entry=ttu`

  return (
    <div className="flex flex-col items-center bg-gray-100 pt-10">
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
        </div>

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
      </div>
    </div>
  )
}
