import { ComponentProps } from 'react'

type TitleProps = ComponentProps<'span'>

export function Title(props: TitleProps) {
  return <span {...props} />
}
