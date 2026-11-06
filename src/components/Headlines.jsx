import { useState } from 'react'

const stories = [
  {
    id: 1,
    category: 'City',
    title: 'City council approves new public transport plan',
    summary: 'Twelve new bus routes and a late-night service will begin rolling out next spring.',
    more: 'Councillors passed the plan after a long debate over funding. Work on the first routes starts in January, and residents can comment on the stop locations until the end of the month.',
    time: '1 hour ago',
  },
  {
    id: 2,
    category: 'Education',
    title: 'Local university opens a new research centre',
    summary: 'The centre will focus on clean energy and water management.',
    more: 'Forty researchers will move into the building this term, and the university plans to offer paid placements to final-year students.',
    time: '3 hours ago',
  },
  {
    id: 3,
    category: 'Weather',
    title: 'Heavy rainfall expected across the region this weekend',
    summary: 'Forecasters advise residents in low-lying areas to prepare.',
    more: 'Rain is expected to start on Friday evening and ease by Sunday afternoon. Emergency crews are clearing drains along the main roads.',
    time: '4 hours ago',
  },
  {
    id: 4,
    category: 'City',
    title: 'Old market square reopens after restoration',
    summary: 'Stalls return this week with wider walkways and new lighting.',
    more: 'The restoration took eighteen months and kept the original stone arches. Traders say they expect the busy season to bring visitors back.',
    time: '6 hours ago',
  },
  {
    id: 5,
    category: 'Education',
    title: 'Schools to add coding classes from next term',
    summary: 'Students from grade six onwards will take a weekly lesson.',
    more: 'Teachers will finish their training over the holidays, and every school will receive updated computer labs by the end of the year.',
    time: 'Yesterday',
  },
]

const filters = ['All', 'City', 'Education', 'Weather', 'Saved']

function Headlines() {
  const [filter, setFilter] = useState('All')
  const [saved, setSaved] = useState([])
  const [expanded, setExpanded] = useState([])

  const toggle = (list, setList, id) =>
    setList(list.includes(id) ? list.filter((item) => item !== id) : [...list, id])

  const visible = stories.filter((story) => {
    if (filter === 'All') return true
    if (filter === 'Saved') return saved.includes(story.id)
    return story.category === filter
  })

  return (
    <section id="headlines" className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <p className="eyebrow">Top stories</p>
            <h2>Headlines</h2>
          </div>
          <div className="filters" role="group" aria-label="Filter headlines">
            {filters.map((name) => (
              <button
                key={name}
                type="button"
                className={filter === name ? 'chip is-active' : 'chip'}
                aria-pressed={filter === name}
                onClick={() => setFilter(name)}
              >
                {name === 'Saved' ? `Saved (${saved.length})` : name}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="empty">No saved stories yet. Press Save on a story to keep it here.</p>
        ) : (
          <div className="story-grid">
            {visible.map((story, index) => {
              const isSaved = saved.includes(story.id)
              const isExpanded = expanded.includes(story.id)

              return (
                <article key={story.id} className={index === 0 ? 'story story-lead' : 'story'}>
                  <div className="story-body">
                    <p className="kicker">{story.category}</p>
                    <h3>{story.title}</h3>
                    <p className="story-text">{story.summary}</p>
                    {isExpanded && <p className="story-text">{story.more}</p>}
                    <div className="story-foot">
                      <span className="meta">{story.time}</span>
                      <div className="story-actions">
                        <button
                          type="button"
                          className="btn btn-ghost btn-small"
                          aria-expanded={isExpanded}
                          onClick={() => toggle(expanded, setExpanded, story.id)}
                        >
                          {isExpanded ? 'Read less' : 'Read more'}
                        </button>
                        <button
                          type="button"
                          className={isSaved ? 'btn btn-primary btn-small' : 'btn btn-ghost btn-small'}
                          aria-pressed={isSaved}
                          aria-label={`Save: ${story.title}`}
                          onClick={() => toggle(saved, setSaved, story.id)}
                        >
                          {isSaved ? 'Saved' : 'Save'}
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default Headlines
