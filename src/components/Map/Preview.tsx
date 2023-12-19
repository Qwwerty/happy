'use client'

import { useTheme } from 'next-themes'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import CustomMarkerIcon from '@/app/location/markerMap'
import { env } from '../../../env'

interface PreviewProps {
  latitude: number
  longitude: number
}

export function Preview({ latitude, longitude }: PreviewProps) {
  const { theme } = useTheme()

  const themeTileLayerUrl =
    theme === 'light'
      ? `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${env.NEXT_PUBLIC_MAP_BOX_TOKEN}`
      : `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${env.NEXT_PUBLIC_MAP_BOX_TOKEN}`

  return (
    <div className="h-56 w-full">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
        dragging={false}
        doubleClickZoom={false}
        zoomControl={false}
      >
        <TileLayer url={themeTileLayerUrl} />
        <Marker
          interactive={false}
          icon={CustomMarkerIcon}
          position={[latitude, longitude]}
        />
        ))
      </MapContainer>
    </div>
  )
}
