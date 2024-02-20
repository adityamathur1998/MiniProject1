import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import {MdMenuOpen} from 'react-icons/md'
import {ImCross} from 'react-icons/im'

import './index.css'

class Header extends Component {
  state = {
    showSearchBar: false,
    showMenu: false,
  }

  onClickShowMenu = () => {
    this.setState({showMenu: true})
  }

  onChangeSearchInput = event => {
    const {searchInput} = this.props
    if (event.key === 'Enter') {
      searchInput(event.target.value)
    }
  }

  onClickSearchIcon = () => {
    this.setState(prevState => ({
      showSearchBar: !prevState.showSearchBar,
    }))
  }

  onClickShowMenu = () => {
    this.setState({
      showMenu: true,
    })
  }

  onClickHideMenu = () => {
    this.setState({
      showMenu: false,
    })
  }

  render() {
    const {showMenu, showSearchBar} = this.state
    const {match} = this.props
    const {path} = match
    let homeClassnameStyling
    let popularClassnameStyling
    let accountClassNameStyling

    switch (path) {
      case '/popular':
        homeClassnameStyling = 'passive'
        popularClassnameStyling = 'active'
        accountClassNameStyling = 'passive'
        break
      case '/account':
        homeClassnameStyling = 'passive'
        popularClassnameStyling = 'passive'
        accountClassNameStyling = 'active'
        break
      default:
        homeClassnameStyling = 'active'
        popularClassnameStyling = 'passive'
        accountClassNameStyling = 'passive'
    }

    return (
      <nav className="nav-container">
        <div className="nav-element-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426908/lg-devices-logo_rpfa68.png"
              alt="website logo"
              className="website-logo"
            />
          </Link>
          <ul className="nav-list-item">
            <Link to="/" className="nav-link">
              <li className={`popup-heading ${homeClassnameStyling}`}>Home</li>
            </Link>
            <Link to="/popular" className="nav-link">
              <li className={`popup-heading ${popularClassnameStyling}`}>
                Popular
              </li>
            </Link>
          </ul>
          <div className="search-container">
            {showSearchBar && (
              <input
                type="search"
                placeholder="Search"
                onKeyDown={this.onChangeSearchInput}
                className="search"
              />
            )}
            <Link to="/search">
              <button
                type="button"
                className="icon-button"
                testid="searchButton"
              >
                <HiOutlineSearch
                  color="#ffffff"
                  size={20}
                  testid="searchButton"
                  onClick={this.onClickSearchIcon}
                />
              </button>
            </Link>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/dyx9u0bif/image/upload/v1657426927/account-avatar_irmhck.png"
                alt="profile"
                className={`profile-logo ${accountClassNameStyling}`}
              />
            </Link>
            <MdMenuOpen
              size={25}
              color="#ffffff"
              className="menu-icon"
              onClick={this.onClickShowMenu}
            />
          </div>
        </div>
        {showMenu && (
          <div>
            <ul className="list-mini">
              <Link to="/" className="nav-link">
                <li className={`popup-heading ${homeClassnameStyling}`}>
                  Home
                </li>
              </Link>
              <Link to="/popular" className="nav-link">
                <li className={`popup-heading ${popularClassnameStyling}`}>
                  Popular
                </li>
              </Link>
              <Link to="/account" className="nav-link">
                <li className={`popup-heading ${accountClassNameStyling}`}>
                  Account
                </li>
              </Link>
              <ImCross
                size={11}
                color="#ffffff"
                onClick={this.onClickHideMenu}
                className="icon"
              />
            </ul>
          </div>
        )}
      </nav>
    )
  }
}

export default withRouter(Header)
