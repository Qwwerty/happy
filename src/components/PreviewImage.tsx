'use client'

import type { Photo } from '@/types/orphanage'
import Image from 'next/image'
import { useState } from 'react'
import { tv } from 'tailwind-variants'

const image = tv({
  base: 'h-24 w-24 cursor-pointer overflow-hidden rounded-3xl border-2',
  variants: {
    variant: {
      true: 'border-2 border-blue-600',
    },
  },
})

interface OrphanageImage {
  photos: Photo[]
}

interface PreviewImageProps {
  orphanageImage: OrphanageImage
}

export function PreviewImage({ orphanageImage }: PreviewImageProps) {
  const [currentOpenPreviewImage, setCurrentOpenPreviewImage] = useState(0)

  function handleChangePreviewImage(index: number) {
    setCurrentOpenPreviewImage(index)
  }

  return (
    <div>
      <Image
        src={orphanageImage.photos[currentOpenPreviewImage].url}
        width={708}
        height={336}
        alt="Foto do orfanato"
        className="h-80 w-full object-cover"
      />

      <div className="grid grid-cols-6 gap-4 px-8 pt-6">
        {orphanageImage.photos.map((photo: Photo, index) => (
          <div
            onClick={() => handleChangePreviewImage(index)}
            key={photo.id}
            className={image({
              variant: index === currentOpenPreviewImage,
              className:
                'transition-colors hover:border-2 hover:border-blue-600',
            })}
          >
            <Image
              src={photo.url}
              width={1024}
              height={720}
              alt={photo.name}
              quality={100}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
