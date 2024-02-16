import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState(prevState => ({
      showError: !prevState.showError,
      errorMsg,
    }))
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderUsername = () => {
    const {username} = this.state
    console.log(username)

    return (
      <div className="input-container">
        <label htmlFor="username" className="label-text">
          USERNAME
        </label>
        <input
          type="text"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
          id="username"
          className="input-field"
        />
      </div>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    console.log(password)

    return (
      <div className="input-container">
        <label htmlFor="password" className="label-text">
          PASSWORD
        </label>
        <input
          type="password"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
          id="password"
          className="input-field"
        />
      </div>
    )
  }

  render() {
    const {showError, errorMsg} = this.state
    return (
      <div className="login-pg-bg-container">
        <img
          src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426908/lg-devices-logo_rpfa68.png"
          alt="login website logo"
          className="website-logo"
        />
        <form className="form-container" onSubmit={this.onSubmitLogin}>
          <h1 className="login-text">Login</h1>
          {this.renderUsername()}
          {this.renderPassword()}
          {showError && <p className="error-text">{errorMsg}</p>}
          <button className="sign-in-button" type="submit">
            Sign in
          </button>
        </form>
      </div>
    )
  }
}

export default Login
