import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import './index.css'

const FooterSection = () => (
  <>
    <div className="footer-container">
      <button type="button" className="icon-button">
        <FaGoogle />
      </button>
      <button type="button" className="icon-button">
        <FaTwitter />
      </button>
      <button type="button" className="icon-button">
        <FaInstagram />
      </button>
      <button type="button" className="icon-button">
        <FaYoutube />
      </button>
    </div>
    <p className="contact-us-text">Contact Us</p>
  </>
)

export default FooterSection
