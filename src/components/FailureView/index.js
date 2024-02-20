import './index.css'

const FailureView = props => {
  const {onRetry} = props

  const onClickReTry = () => {
    onRetry()
  }

  return (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426934/homepage-failure_egb8fl.png"
        alt="failure view"
        className="alert-icon"
      />
      <p className="failure-description">
        Something went wrong. Please try again
      </p>
      <button type="button" onClick={onClickReTry} className="retry-button">
        Retry
      </button>
    </div>
  )
}

export default FailureView
