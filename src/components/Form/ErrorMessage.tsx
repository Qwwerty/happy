import { ComponentProps } from 'react'
import { useFormContext } from 'react-hook-form'
import { twMerge } from 'tailwind-merge'

interface ErrorMessageProps extends ComponentProps<'span'> {
  field: string
}

function get(obj: Record<any, any>, path: string) {
  const travel = (regexp: RegExp) =>
    String.prototype.split
      .call(path, regexp)
      .filter(Boolean)
      .reduce(
        (res, key) => (res !== null && res !== undefined ? res[key] : res),
        obj,
      )

  const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/)

  return result
}

export function ErrorMessage({ field, className, ...rest }: ErrorMessageProps) {
  const {
    formState: { errors },
  } = useFormContext()

  const fieldError = get(errors, field)

  if (!fieldError) {
    return
  }

  return (
    <span className={twMerge('mt-1 text-xs text-red-500', className)} {...rest}>
      {fieldError.message?.toString()}
    </span>
  )
}
