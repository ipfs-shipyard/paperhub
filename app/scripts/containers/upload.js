import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Paper, TextField, RaisedButton} from 'material-ui'

import {router, pages, upload} from '../actions'

const paperStyle = {
  margin: '100px auto',
  maxWidth: '768px',
  padding: '20px 40px 40px'
}

const buttonsStyle = {
  marginTop: '40px'
}

const buttonStyle = {
  marginRight: '12px'
}

class Upload extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setAuthor: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  };

  _handleTitleChange = (event) => {
    this.props.setTitle(event.target.value)
  }

  _handleAuthorChange = (event) => {
    this.props.setAuthor(event.target.value)
  }

  _handleSubmit = () => {
    console.log('submitting', this.props.form)
    this.props.resetForm()
  }

  _handleCancel = () => {
    this.props.goBack()
    this.props.resetForm()
  }

  componentWillMount () {
    this.props.load()
  }

  componentWillUnmount () {
    this.props.leave()
  }

  render () {
    return (
      <Paper style={paperStyle} zDepth={1}>
        <h3>Upload new Paper</h3>
        <TextField
          hintText='Title'
          value={this.props.form.title}
          onChange={this._handleTitleChange}
        /> <br />
        <TextField
          hintText='Author'
          value={this.props.form.author}
          onChange={this._handleAuthorChange}
        /> <br />

        <div style={buttonsStyle}>
          <RaisedButton
            primary
            label='Submit'
            style={buttonStyle}
            onClick={this._handleSubmit}
          />
          <RaisedButton
            primary={false}
            label='Cancel'
            style={buttonStyle}
            onClick={this._handleCancel}
          />
        </div>
      </Paper>
    )
  }
}

function mapStateToProps (state) {
  return {
    form: state.upload
  }
}

export default connect(mapStateToProps, {
  ...pages.upload,
  ...upload.upload,
  goBack: router.goBack
})(Upload)
