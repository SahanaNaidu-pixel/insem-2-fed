import { useState } from 'react'

const matches = [
  {
    id: 1,
    sport: 'Cricket',
    status: 'Live',
    home: { name: 'City Lions', score: '182/4' },
    away: { name: 'Harbour Hawks', score: '176' },
    note: '32 overs played',
  },
  {
    id: 2,
    sport: 'Football',
    status: 'Full time',
    home: { name: 'Northside FC', score: '2' },
    away: { name: 'Riverside United', score: '1' },
    note: 'City Stadium',
  },
  {
    id: 3,
    sport: 'Football',
    status: 'Upcoming',
    home: { name: 'Valley Rovers', score: '-' },
    away: { name: 'Eastern Athletic', score: '-' },
    note: 'Saturday, 7:30 PM',
  },
]

const stories = [
  { id: 1, sport: 'Cricket', title: 'Home side wins the league opener by three wickets' },
  { id: 2, sport: 'Athletics', title: 'Young sprinter sets a new state record' },
  { id: 3, sport: 'Football', title: 'Football finals to be held at the city stadium' },
  { id: 4, sport: 'Athletics', title: 'Marathon route announced for the winter race' },
  { id: 5, sport: 'Cricket', title: 'Captain returns to the squad after injury' },
  { id: 6, sport: 'Football', title: 'Academy team reaches the youth cup semi-final' },
]

const tabs = ['All', 'Cricket', 'Football', 'Athletics']
const PAGE_SIZE = 3

function Sports() {
  const [tab, setTab] = useState('All')
  const [following, setFollowing] = useState([])
  const [shown, setShown] = useState(PAGE_SIZE)

  const selectTab = (name) => {
    setTab(name)
    setShown(PAGE_SIZE)
  }

  const toggleFollow = (id) =>
    setFollowing(following.includes(id) ? following.filter((item) => item !== id) : [...following, id])

  const visibleMatches = matches.filter((match) => tab === 'All' || match.sport === tab)
  const matchingStories = stories.filter((story) => tab === 'All' || story.sport === tab)

  return (
    <section id="sports" className="section section-sports">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Scores and news</p>
            <h2>Sports</h2>
          </div>
          <div className="filters" role="group" aria-label="Filter sports">
            {tabs.map((name) => (
              <button
                key={name}
                type="button"
                className={tab === name ? 'chip is-active' : 'chip'}
                aria-pressed={tab === name}
                onClick={() => selectTab(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {visibleMatches.length > 0 && (
          <div className="match-grid">
            {visibleMatches.map((match) => {
              const isFollowing = following.includes(match.id)

              return (
                <article key={match.id} className="match">
                  <div className="match-top">
                    <span className="meta">{match.sport}</span>
                    <span className={match.status === 'Live' ? 'status is-live' : 'status'}>
                      {match.status}
                    </span>
                  </div>
                  {[match.home, match.away].map((team) => (
                    <div key={team.name} className="team">
                      <span>{team.name}</span>
                      <strong>{team.score}</strong>
                    </div>
                  ))}
                  <div className="match-foot">
                    <span className="meta">{match.note}</span>
                    <button
                      type="button"
                      className={isFollowing ? 'btn btn-primary btn-small' : 'btn btn-ghost btn-small'}
                      aria-pressed={isFollowing}
                      aria-label={`Follow ${match.home.name} v ${match.away.name}`}
                      onClick={() => toggleFollow(match.id)}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        <ul className="sport-list">
          {matchingStories.slice(0, shown).map((story) => (
            <li key={story.id}>
              <span className="tag">{story.sport}</span>
              {story.title}
            </li>
          ))}
        </ul>

        {shown < matchingStories.length && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setShown(shown + PAGE_SIZE)}
          >
            Load more
          </button>
        )}
      </div>
    </section>
  )
}

export default Sports
