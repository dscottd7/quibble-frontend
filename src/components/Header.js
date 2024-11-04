import React from 'react'

export const Header = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">Quibble</div>
        <button className="hamburger-menu" aria-label="Menu">
          ☰
        </button>
      </nav>
    </div>
  )
}
