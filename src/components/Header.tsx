import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/service', label: 'Грузовой автосервис' },
  { path: '/transportation', label: 'Перевозка грузов' },
  { path: '/contacts', label: 'Контакты' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header>
      <div className="header-container">
        <div className="header-mobi">
          <div className="header-logo">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              <img src="/logo.png" alt="Вип-транс" />
            </Link>
          </div>
          <button
            className={`burger ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <div className="bar" />
          </button>
        </div>
        <nav className={`header-navigation ${menuOpen ? 'active' : ''}`}>
          <ul className="navigation-list">
            {navItems.map((item) => (
              <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
                <Link to={item.path} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
