import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import ReduxToastr, {toastr} from 'react-redux-toastr'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Nav from '../components/nav'
import {errors} from '../actions'

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node,
    params: PropTypes.object,
    location: PropTypes.object
  };

  componentWillReceiveProps (nextProps) {
    const {errorMessage} = this.props

    if (nextProps.errorMessage && errorMessage !== nextProps.errorMessage) {
      toastr.error(nextProps.errorMessage, {
        onHideComplete: () => {
          this.props.resetErrorMessage()
        }
      })
    }
  }

  render () {
    const {children} = this.props

    return (
      <div className='page-wrapper'>
        <ReduxToastr
          timeOut={5000}
          newestOnTop={false}
          position='top-right'
        />
        <Nav />
        <div className='page-body'>
          <div className='page-body-inner'>
            {children}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    errorMessage: state.errors
  }
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, {
  resetErrorMessage: errors.resetErrorMessage
})(App))
