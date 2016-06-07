import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import Feed from '../components/feed'
import {pages} from '../actions'

class Home extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
    feed: PropTypes.array.isRequired
  };

  componentWillMount () {
    this.props.load()
  }

  componentWillUnmount () {
    this.props.leave()
  }

  render () {
    return (
      <Feed feed={this.props.feed} />
    )
  }
}

function mapStateToProps (state) {
  const {feed} = state

  return {
    feed: feed.list
  }
}

export default connect(mapStateToProps, {
  ...pages.home
})(Home)
