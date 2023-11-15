'use client'

import { Plus } from 'lucide-react'
import { useFileInput } from './Root'

export function Trigger() {
  const { id } = useFileInput()

  return (
    <label
      htmlFor={id}
      className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-[1.25rem] border border-dashed border-blue-700 bg-gray-50 transition-colors hover:bg-gray-100"
    >
      <Plus className="stroke-2 text-blue-700" />
    </label>
  )
}
