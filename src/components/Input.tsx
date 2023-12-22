import { ComponentProps, forwardRef, ForwardRefRenderFunction } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

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
    label: string
  }

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { variant, className, name, label = '', ...rest },
  ref,
) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-base font-semibold text-gray-600">
        {label}
      </label>

      <input
        name={name}
        className={input({ variant, className })}
        ref={ref}
        {...rest}
      />
    </div>
  )
}

export const Input = forwardRef(InputBase)
