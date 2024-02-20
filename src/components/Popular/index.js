import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FooterSection from '../FooterSection'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    popularMoviesList: [],
  }

  componentDidMount() {
    this.getPopularMoviesList()
  }

  getPopularMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(eachMovie => ({
        backdropPath: eachMovie.backdrop_path,
        id: eachMovie.id,
        posterPath: eachMovie.poster_path,
        title: eachMovie.title,
        overview: eachMovie.overview,
      }))
      this.setState({
        apiStatus: apiStatusConstant.success,
        popularMoviesList: updatedData,
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
    this.getPopularMoviesList()
  }

  renderFailure = () => <FailureView onRetry={this.onRetry} />

  renderSuccessView = () => {
    const {popularMoviesList} = this.state

    return (
      <ul className="popular-ul-list">
        {popularMoviesList.map(eachMovie => (
          <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
            <li className="popular-li-item" key={eachMovie.id}>
              <img
                src={eachMovie.posterPath}
                alt={eachMovie.title}
                className="popular-poster"
              />
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderPopularMovies = () => {
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
      <div className="popular-pg-container">
        <Header />
        <div className="popular-movies-container">
          {this.renderPopularMovies()}
        </div>
        <FooterSection />
      </div>
    )
  }
}

export default Popular
