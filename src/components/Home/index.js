import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import HomePoster from '../HomePoster'
import Header from '../Header'
import FailureView from '../FailureView'
import TrendingNow from '../TrendingNow'
import Originals from '../Originals'
import FooterSection from '../FooterSection'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    moviePoster: '',
  }

  componentDidMount() {
    this.getHomePagePoster()
  }

  getHomePagePoster = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedDataLength = data.results.length
      const randomPoster =
        data.results[Math.floor(Math.random() * fetchedDataLength)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
        title: randomPoster.title,
      }
      this.setState({
        moviePoster: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {moviePoster} = this.state

    return (
      <>
        <HomePoster poster={moviePoster} />
      </>
    )
  }

  onRetry = () => {
    this.getHomePagePoster()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderHomePoster = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {moviePoster} = this.state
    const backgroundImage = moviePoster.posterPath
    console.log(backgroundImage)
    return (
      <div className="home-pg-container">
        <Header />
        <div className="home-sizes-container">{this.renderHomePoster()}</div>
        <div>
          <div className="slider-container">
            <h1 className="trending-now-text">Trending Now</h1>
            <TrendingNow />
          </div>
          <div className="slider-container">
            <h1 className="trending-now-text">Originals</h1>
            <Originals />
          </div>
        </div>
        <FooterSection />
      </div>
    )
  }
}

export default Home
