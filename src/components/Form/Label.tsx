import { LabelHTMLAttributes } from 'react'

export function Label(props: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className="text-base font-semibold text-gray-600" {...props} />
}
