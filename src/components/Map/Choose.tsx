'use client'

import { useState } from 'react'
import { useTheme } from 'next-themes'
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet'
import type { LeafletMouseEvent } from 'leaflet'
import CustomMarkerIcon from '@/app/location/markerMap'
import { env } from '../../../env'
import { useFormContext } from 'react-hook-form'

const INITIAL_LATITUDE = -21.1248353
const INITIAL_LONGITUDE = -42.9506151

export function Choose() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })
  const { setValue } = useFormContext()

  const { theme } = useTheme()

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng,
    })

    setValue('latitude', lat)
    setValue('longitude', lng)
  }

  function EventMap() {
    useMapEvents({
      click(event) {
        handleMapClick(event)
      },
    })

    return null
  }

  const themeTileLayerUrl =
    theme === 'light'
      ? `https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${env.NEXT_PUBLIC_MAP_BOX_TOKEN}`
      : `https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${env.NEXT_PUBLIC_MAP_BOX_TOKEN}`

  return (
    <div className="h-56 w-full">
      <MapContainer
        center={[INITIAL_LATITUDE, INITIAL_LONGITUDE]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer url={themeTileLayerUrl} />
        <Marker
          interactive={false}
          icon={CustomMarkerIcon}
          position={[position.latitude, position.longitude]}
        />
        <EventMap />
        ))
      </MapContainer>
    </div>
  )
}
