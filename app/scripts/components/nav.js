import React, {Component, PropTypes} from 'react'

import {Link} from 'react-router'

export default class Nav extends Component{
  render () {
    return (
      <nav className='primary-nav'>
        <Link
          to='/home'
          className='primary-nav__brand special'
        >
          PaperHub
        </Link>
        <div className='primary-nav-menu'>
          <Link
            to='/upload'
            activeClassName='active'
            className='primary-nav__item'
          >
            <span className='primary-nav__item-inner'>
              Upload
            </span>
          </Link>
        </div>
      </nav>
    )
  }
}
