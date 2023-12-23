'use client'

import { useFileInput } from './Root'
import { useFormContext } from 'react-hook-form'

interface ControlProps {
  required?: boolean
}

export function Control({ required = false }: ControlProps) {
  const { register } = useFormContext()
  const { id } = useFileInput()

  return (
    <input
      id={id}
      accept="image/*"
      type="file"
      multiple
      className="sr-only"
      {...register('photos')}
      required={required}
    />
  )
}
