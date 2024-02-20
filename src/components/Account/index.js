import Cookies from 'js-cookie'
import Header from '../Header'
import FooterSection from '../FooterSection'

import './index.css'

const Account = props => {
  const username = localStorage.getItem('username')
  const password = localStorage.getItem('password')

  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const passwordInAsterisk = '*'.repeat(password.length)

  return (
    <div className="account-pg-bg-container">
      <Header />
      <div className="account-content-container">
        <div className="account-content">
          <h1 className="account-text">Account</h1>
          <hr className="horizontal-line" />
          <div className="membership-details-container">
            <p className="membership-text">Member ship</p>
            <div className="user-details-container">
              <h1 className="user-email-id">{username}@gmail.com</h1>
              <h1 className="password">Password : {passwordInAsterisk}</h1>
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="plan-details-container">
            <p className="plan-details-text">Plan details</p>
            <div className="plan-type">
              <p>Premium</p>
              <p className="utlta-hd-text">Ultra HD</p>
            </div>
          </div>
          <hr className="horizontal-line" />
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <FooterSection />
    </div>
  )
}

export default Account
