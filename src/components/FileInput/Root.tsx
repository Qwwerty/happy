'use client'

import {
  ComponentProps,
  createContext,
  useContext,
  useId,
  useState,
} from 'react'

export type RootProps = ComponentProps<'input'>

export type FileInputContextType = {
  id: string
  files: File[]
  onFilesSelected: (files: File[]) => void
  onRemoveItem: (index: number) => void
}

const FileInputContext = createContext({} as FileInputContextType)

export function Root(props: RootProps) {
  const id = useId()
  const [files, setFiles] = useState<File[]>([])

  function handleSelectFiles(files: File[]) {
    setFiles((state) => [...state, ...files])
  }

  function handleRemoveItem(index: number) {
    const newFiles = Array.from(files)
    newFiles.splice(index, 1)

    setFiles(newFiles)
  }

  return (
    <FileInputContext.Provider
      value={{
        id,
        files,
        onFilesSelected: handleSelectFiles,
        onRemoveItem: handleRemoveItem,
      }}
    >
      <div {...props} />
    </FileInputContext.Provider>
  )
}

export const useFileInput = () => useContext(FileInputContext)
