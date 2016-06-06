import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import Feed from '../components/feed'
import {pages} from '../actions'

class Home extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
    node: PropTypes.object.isRequired
  };

  componentWillMount () {
    this.props.load()
  }

  componentWillUnmount () {
    this.props.leave()
  }

  render () {
    return (
      <Feed />
    )
  }
}

function mapStateToProps (state) {
  const {id} = state

  return {
    node: id
  }
}

export default connect(mapStateToProps, {
  ...pages.home
})(Home)
