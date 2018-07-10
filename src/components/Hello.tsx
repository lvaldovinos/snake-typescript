import * as React from 'react'

interface Props {
  name: string
}

export default function Hello({ name }: Props) {
  const hello: string = `Hello ${name}`
  return (
    <h2>{hello}</h2>
  )
}
