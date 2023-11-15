import { ComponentProps } from 'react'

type FileInputProps = ComponentProps<'input'> & {
  label: string
  name: string
}

export function FileInput({ label, name, ...props }: FileInputProps) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        multiple
        type="file"
        className="sr-only"
        {...props}
      />
    </div>
  )
}
