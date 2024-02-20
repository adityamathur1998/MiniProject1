import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import FailureView from '../FailureView'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieDetailsPage extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    trendingNowList: [],
  }
}

export default MovieDetailsPage
