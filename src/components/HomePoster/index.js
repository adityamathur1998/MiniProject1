import './index.css'

const HomePoster = props => {
  const {poster} = props
  const {backdropPath, overview, title} = poster

  return (
    <div
      className="device-container"
      alt={title}
      style={{
        backgroundImage: `url(${backdropPath})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        height: '100%',
      }}
    >
      <div className="home-header-content heading-container">
        <h1 className="home-poster-title">{title}</h1>
        <p className="home-poster-description">{overview}</p>
        <button type="button" className="play-button">
          Play
        </button>
      </div>
    </div>
  )
}

export default HomePoster
