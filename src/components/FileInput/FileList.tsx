'use client'

import { ReactNode } from 'react'
import { FileItem } from './FileItem'
import { useFileInput } from './Root'

interface FileListProps {
  children?: ReactNode
}

export function FileList({ children }: FileListProps) {
  const { files } = useFileInput()

  return (
    <div className="flex flex-wrap gap-4">
      {files.map((file, index) => (
        <FileItem key={index} file={file} index={index} />
      ))}

      {children}
    </div>
  )
}
