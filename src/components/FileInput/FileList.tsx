'use client'

import { ReactNode } from 'react'
import { FileItem } from './FileItem'
import { useFormContext } from 'react-hook-form'

interface FileListProps {
  children?: ReactNode
}

export function FileList({ children }: FileListProps) {
  const { watch } = useFormContext()

  const photos = watch('photos')
  const files = Array.from(photos as ArrayLike<File>)

  return (
    <div className="flex flex-wrap gap-4">
      {files.map((file: File, index: number) => (
        <FileItem key={index} file={file} />
      ))}

      {children}
    </div>
  )
}
