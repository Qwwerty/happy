/* eslint-disable @next/next/no-img-element */
'use client'

import { X } from 'lucide-react'
import { useFileInput } from './Root'

interface FileItemProps {
  file: File
  index: number
}

export function FileItem({ file, index }: FileItemProps) {
  const { onRemoveItem } = useFileInput()

  function handleRemoveItem() {
    onRemoveItem(index)
  }

  const fileImage = URL.createObjectURL(file)

  return (
    <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-[1.25rem]  bg-gray-50 transition-colors hover:bg-gray-100">
      <img src={fileImage} className="h-full w-full object-cover" alt="" />

      <button
        onClick={handleRemoveItem}
        className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-bl-[1.25rem] rounded-tr-[1.25rem] border border-gray-300 bg-white hover:bg-gray-200"
      >
        <X className="h-6 w-6 stroke-2 text-red-500" />
      </button>
    </div>
  )
}
