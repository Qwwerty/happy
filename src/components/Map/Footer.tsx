import { ComponentProps } from 'react'

export type FooterProps = ComponentProps<'div'>

export function Footer(props: FooterProps) {
  return <div {...props} />
}
