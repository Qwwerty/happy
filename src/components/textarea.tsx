import { ComponentProps } from 'react'
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

type TextAreaProps = ComponentProps<'textarea'> &
  VariantProps<typeof input> & {
    name: string
    label: string
    maxLength?: number
  }

export function TextArea({
  variant,
  className,
  name,
  label = '',
  maxLength,
  ...props
}: TextAreaProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="flex gap-8">
        <span className="text-base font-semibold text-gray-600">{label}</span>

        {maxLength && (
          <span className="text-sm text-text-base">
            Máximo de {maxLength} catacteres
          </span>
        )}
      </label>

      <textarea
        {...props}
        name={name}
        maxLength={maxLength}
        className={input({ variant, className })}
      />
    </div>
  )
}
