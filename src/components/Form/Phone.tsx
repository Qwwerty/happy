import { ComponentProps } from 'react'
import InputMask, { Props as InputMaskProps } from 'react-input-mask'
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

type PhoneProps = ComponentProps<'input'> &
  VariantProps<typeof input> & {
    name: string
  }

export function Phone({ name, variant, className, onChange }: PhoneProps) {
  return (
    <InputMask
      id={name}
      mask="(99) 9 9999-9999"
      maskChar={null}
      className={input({ variant, className })}
      onChange={onChange}
    />
  )
}
