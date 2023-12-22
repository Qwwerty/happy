'use client'

import Image from 'next/image'

interface FileItemProps {
  file: File
}

export function FileItem({ file }: FileItemProps) {
  const fileImage = URL.createObjectURL(file)

  return (
    <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.25rem]  bg-gray-50 transition-colors hover:bg-gray-100">
      <Image
        src={fileImage}
        width={96}
        height={96}
        className="h-full w-full object-cover"
        alt=""
      />
    </div>
  )
}
