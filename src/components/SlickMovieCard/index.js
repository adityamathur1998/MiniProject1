import {Link, withRouter} from 'react-router-dom'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const SlickMovieCard = props => {
  const {movies} = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    <Slider {...settings}>
      {movies.map(each => {
        const {id, posterPath, title} = each
        return (
          <Link to={`/movies/${id}`} className="slick-item" key={id}>
            <li testid="MovieCard" className="react-slick-li-item" key={id}>
              <img className="slick-movie-img" src={posterPath} alt={title} />
            </li>
          </Link>
        )
      })}
    </Slider>
  )
}

export default withRouter(SlickMovieCard)
