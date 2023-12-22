import { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'
import { VariantProps, tv } from 'tailwind-variants'

const input = tv({
  base: 'h-16 rounded-[1.25rem] bg-gray-50 px-[1.63rem] py-[1.13rem] text-lg font-semibold text-text-base outline-none',
  variants: {
    variant: {
      default: 'border border-gray-100',
      success: 'border border-emerald-500',
      error: 'border border-red-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type InputProps = ComponentProps<'input'> &
  VariantProps<typeof input> & {
    name: string
  }

export function Input({ name, variant, className, ...props }: InputProps) {
  const { register } = useFormContext()

  return (
    <input
      id={name}
      className={input({ variant, className })}
      {...register(name)}
      {...props}
    />
  )
}
