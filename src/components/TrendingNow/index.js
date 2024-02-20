import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'
import SlickMovieCard from '../SlickMovieCard'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingNow extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    trendingNowList: [],
  }

  componentDidMount() {
    this.getTrendingMoviesList()
  }

  getTrendingMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        overview: eachMovie.overview,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
      }))
      this.setState({
        apiStatus: apiStatusConstant.success,
        trendingNowList: updatedData,
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

  onRetry = () => {
    this.getTrendingMoviesList()
  }

  renderSuccessView = () => {
    const {trendingNowList} = this.state

    return (
      <>
        <SlickMovieCard movies={trendingNowList} />
      </>
    )
  }

  renderFailure = () => <FailureView onRetry={this.onRetry} />

  renderTrendingNow = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.inProgress:
        return this.renderLoaderView()
      case apiStatusConstant.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="trending-now-container">{this.renderTrendingNow()}</div>
    )
  }
}

export default TrendingNow
