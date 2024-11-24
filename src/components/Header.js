import React from 'react'
import { Image } from '@mantine/core'

export const Header = () => {
  return (
    <div>
      <Image src="/quibble.jpg" alt="logo" />
      <nav className="navbar">
        <div className="logo">Quibble</div>
      </nav>
    </div>
  )
}
