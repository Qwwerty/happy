'use client'

import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import CustomMarkerIcon from '../app/location/markerMap'
import { useTheme } from 'next-themes'

export default function Map() {
  const { theme } = useTheme()

  const themeTileLayerUrl =
    theme === 'light'
      ? `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}`
      : `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAP_BOX_TOKEN}`

  return (
    <MapContainer
      center={[-21.118306, -42.941503]}
      zoom={15}
      dragging
      touchZoom
      zoomControl
      scrollWheelZoom
      doubleClickZoom
    >
      <TileLayer url={themeTileLayerUrl} />

      <Marker icon={CustomMarkerIcon} position={[-21.118306, -42.941503]}>
        <Popup
          closeButton={false}
          minWidth={240}
          maxWidth={240}
          className="map-popup"
        >
          <div className="flex h-6  w-full items-center justify-between rounded-3xl bg-white/80">
            <span className="text-lg font-bold text-blue-800">
              Orf. Esperança
            </span>

            <Link
              href="/"
              className=" flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400 shadow-lg transition-colors hover:bg-blue-300"
            >
              <ArrowRight className="h-5 w-5 stroke-2 text-white" />
            </Link>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
