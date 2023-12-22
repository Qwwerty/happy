'use client'

import { useFileInput } from './Root'
import { useFormContext } from 'react-hook-form'

export function Control() {
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
    />
  )
}
