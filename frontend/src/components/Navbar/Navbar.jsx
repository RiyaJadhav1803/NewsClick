import React from 'react'
import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
const Navbar = () => {
  return (
    <div className='header-height'>
        <div className='navbar-text'>
           <p className='navbar-icon'><FontAwesomeIcon icon={faNewspaper} /></p>
           <i className='navbar-text-h1'>News Click!</i>
           <p className='navbar-icon'><FontAwesomeIcon icon={faNewspaper} /></p>
        </div>
    </div>
  )
}

export default Navbar