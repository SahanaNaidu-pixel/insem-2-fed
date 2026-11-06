import { useEffect, useState } from 'react'

const breakingNews = [
  'Transport plan approved after a late-night council vote',
  'Weekend rainfall warning issued for the coastal districts',
  'City Lions lead the league opener at the halfway mark',
]

function getInitialTheme() {
  try {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
  } catch {
    // Storage can be blocked; fall back to the system preference.
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function Header() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // The theme still applies for this visit without storage.
    }
  }, [theme])

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header className="header">
      <div className="topbar container">
        <span>{today}</span>
        <button
          type="button"
          className="btn btn-ghost btn-small"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </button>
      </div>

      <div className="masthead container">
        <h1>Daily News</h1>
        <p>Local stories, sharper every morning</p>
      </div>

      <nav className="nav container" aria-label="Main">
        <div className="nav-links">
          <a href="#headlines">Headlines</a>
          <a href="#sports">Sports</a>
          <a href="#newsletter">Newsletter</a>
        </div>
        <a className="btn btn-primary" href="#newsletter">
          Subscribe
        </a>
      </nav>

      <div className="ticker">
        <div className="ticker-inner container">
          <span className="ticker-label">Breaking</span>
          <div className="ticker-window">
            <div className={paused ? 'ticker-track is-paused' : 'ticker-track'}>
              {[...breakingNews, ...breakingNews].map((item, index) => (
                <span key={index} aria-hidden={index >= breakingNews.length}>
                  {item}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-ghost btn-small"
            onClick={() => setPaused(!paused)}
          >
            {paused ? 'Play' : 'Pause'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
