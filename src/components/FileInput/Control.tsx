'use client'

import { ChangeEvent, useRef } from 'react'
import { useFileInput } from './Root'

export function Control() {
  const { id, onFilesSelected } = useFileInput()
  const fileInputRef = useRef(null)

  function handleFilesSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    const files = Array.from(event.target.files)

    onFilesSelected(files)
  }

  return (
    <input
      id={id}
      name={id}
      ref={fileInputRef}
      type="file"
      onChange={handleFilesSelected}
      multiple
      className="sr-only"
    />
  )
}
