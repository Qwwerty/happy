'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useTheme } from 'next-themes'
import { IOrphanage } from '@/app/location/page'
import CustomMarkerIcon from '@/app/location/markerMap'
import { env } from '../../../env'

interface MapProps {
  orphanages: IOrphanage[]
}

export function Control({ orphanages }: MapProps) {
  const { theme } = useTheme()

  const themeTileLayerUrl =
    theme === 'light'
      ? `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${env.NEXT_PUBLIC_MAP_BOX_TOKEN}`
      : `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${env.NEXT_PUBLIC_MAP_BOX_TOKEN}`

  return (
    <MapContainer
      center={[-21.118306, -42.941503]}
      zoom={15}
      dragging
      touchZoom
      zoomControl
      scrollWheelZoom
      doubleClickZoom
      style={{ width: '100%', height: '100%' }}
    >
      <TileLayer url={themeTileLayerUrl} />

      {orphanages.map((orphanage) => (
        <Marker
          key={orphanage.id}
          icon={CustomMarkerIcon}
          position={[orphanage.latitude, orphanage.longitude]}
        >
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            <div className="flex h-6  w-full items-center justify-between rounded-3xl bg-white/80">
              <span className="truncate text-lg font-bold text-blue-800">
                {orphanage.name}
              </span>

              <Link
                href={`/orphanage/${orphanage.id}`}
                className=" flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400 shadow-lg transition-colors hover:bg-blue-300"
              >
                <ArrowRight className="h-5 w-5 stroke-2 text-white" />
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
