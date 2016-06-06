import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import ReduxToastr, {toastr} from 'react-redux-toastr'
import {DragDropContext} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import {AppBar, FlatButton} from 'material-ui'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import {errors, router} from '../actions'

const barStyle = {
  position: 'fixed',
  top: 0
}

class App extends Component {
  static propTypes = {
    // Injected by React Redux
    errorMessage: PropTypes.string,
    resetErrorMessage: PropTypes.func.isRequired,
    // Injected by React Router
    children: PropTypes.node,
    params: PropTypes.object,
    location: PropTypes.object,
    push: PropTypes.func.isRequired
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

  _goToUpload = () => {
    this.props.push('/upload')
  }

  render () {
    const {children} = this.props

    const uploadButton = (
      <FlatButton
        label='Upload'
        onClick={this._goToUpload}
      />
    )

    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className='app'>
          <ReduxToastr
            timeOut={5000}
            newestOnTop={false}
            position='top-right'
          />
          <AppBar
            title='PaperHub'
            showMenuIconButton={false}
            iconElementRight={uploadButton}
            style={barStyle}
          />
          <div className='children'>
            {children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps (state) {
  return {
    errorMessage: state.errors
  }
}

export default DragDropContext(HTML5Backend)(connect(mapStateToProps, {
  resetErrorMessage: errors.resetErrorMessage,
  push: router.push
})(App))
