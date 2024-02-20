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

class SearchFilter extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    moviesList: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getMoviesList()
  }

  getMoviesList = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {searchInput} = this.state
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
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
        moviesList: updatedData,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  searchInput = text => {
    this.setState(
      {
        searchInput: text,
      },
      this.getMoviesList,
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onRetry = () => {
    this.getMoviesList()
  }

  renderFailure = () => <FailureView onRetry={this.onRetry} />

  renderNotFoundView = () => {
    const {searchInput} = this.state

    return (
      <div className="no-found-search-container">
        <img
          src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657092588/Group_7394_jzwy1v.png"
          alt="no movies"
          className="search-not-found-image"
        />
        <p className="search-not-found-description">
          Your search for {searchInput}
          did not find any matches.
        </p>
      </div>
    )
  }

  renderResultView = () => {
    const {moviesList} = this.state

    return (
      <>
        {moviesList.length > 0 ? (
          <>
            <div className="search-filter-bg-container">
              <ul className="search-ul-list">
                {moviesList.map(each => (
                  <Link to={`movies/${each.id}`}>
                    <li className="search-li-item" key={each.id}>
                      <img
                        src={each.posterPath}
                        alt={each.title}
                        className="search-poster"
                      />
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </>
        ) : (
          this.renderNotFoundView()
        )}
      </>
    )
  }

  renderSuccessView = () => {
    const {searchInput} = this.state
    const isEmpty = searchInput === ''

    return (
      <div>
        {isEmpty ? (
          <div className="search-pg-initial-container">
            <p className="empty-text">
              Search the movie,by clicking on the search Icon
            </p>
          </div>
        ) : (
          this.renderResultView()
        )}
      </div>
    )
  }

  renderMovies = () => {
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
        <Header searchInput={this.searchInput} />
        <div className="popular-movies-container">{this.renderMovies()}</div>
        <FooterSection />
      </div>
    )
  }
}

export default SearchFilter
