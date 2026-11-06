import { useState } from 'react'

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setSubscribed(email)
    setEmail('')
  }

  return (
    <footer className="footer">
      <div className="footer-grid container">
        <div>
          <h2>Daily News</h2>
          <p>Local stories, sharper every morning.</p>
        </div>

        <div>
          <h3>Sections</h3>
          <a href="#headlines">Headlines</a>
          <a href="#sports">Sports</a>
        </div>

        <div id="newsletter" className="newsletter">
          <h3>Morning newsletter</h3>
          {subscribed ? (
            <p role="status">Thanks! {subscribed} is on the list.</p>
          ) : (
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email address</label>
              <div className="newsletter-row">
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">
                  Subscribe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} Daily News. All rights reserved.</p>
        <button
          type="button"
          className="btn btn-ghost btn-small"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
        </button>
      </div>
    </footer>
  )
}

export default Footer
