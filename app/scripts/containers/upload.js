import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Form, FormField, FormInput, Button, Card, Row, Col, FileUpload}  from 'elemental'

import {router, pages, upload} from '../actions'
import {Link} from 'react-router'

function readAsBuffer (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
      reader.onload = (event) => {
        resolve({
          content: new Buffer(reader.result),
          path: file.name
        })
      }
    reader.onerror = (event) => {
      reject(reader.error)
    }

    reader.readAsArrayBuffer(file)
  })
}

class Upload extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
    setTitle: PropTypes.func.isRequired,
    setAuthor: PropTypes.func.isRequired,
    setPaper: PropTypes.func.isRequired,
    submitForm: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired
  };

  _handleTitleChange = (event) => {
    this.props.setTitle(event.target.value)
  }

  _handleAuthorChange = (event) => {
    this.props.setAuthor(event.target.value)
  }

  _handlePdfChange = (event, data) => {
    readAsBuffer(data.file).then((res) => {
      this.props.setPaper(res)
    })
  }

  _handleSubmit = (event) => {
    event.preventDefault()

    this.props.submitForm()
  }

  componentWillMount () {
    this.props.load()
  }

  componentWillUnmount () {
    this.props.leave()
  }

  render () {
    return (
      <Row>
        <Col sm='1' md='2/3' lg='2/3' className='upload'>
          <Card>
            <Form onSubmit={this._handleSubmit} type='horizontal'>
              <h3>Upload new Paper</h3>
              <FormField label='Title'>
                <FormInput
                  type='text'
                  autofocus
                  placeholder='Title of the article'
                  onChange={this._handleTitleChange}
                  value={this.props.form.title}
                />
              </FormField>
              <FormField label='Author(s)'>
                <FormInput
                  type='text'
                  placeholder='List of authors'
                  value={this.props.form.author}
                  onChange={this._handleAuthorChange}
                />
              </FormField>
              <FormField label='Paper'>
                <FileUpload
                  buttonLabelInitial='Select PDF file'
                  buttonLabelChange='Change PDF file'
                  accept='application/pdf'
                  onChange={this._handlePdfChange}
                />
              </FormField>
              <div className='upload__buttons'>
                <FormField offsetAbsentLabel>
                  <Button
                    submit
                    type='hollow-primary'
                  >
                    Submit
                  </Button>
                  <Button
                    type='link'
                    component={<Link to='/home'>Cancel</Link>}
                  >
                  </Button>
                </FormField>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
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
