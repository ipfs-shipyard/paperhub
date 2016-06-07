import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Card, Row, Col, Button, Glyph} from 'elemental'
require('pdfjs-dist/build/pdf.combined')
import PDF from 'react-pdf'

import {pages, paper} from '../actions'

class Paper extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired,
    prevPage: PropTypes.func.isRequired,
    select: PropTypes.func.isRequired,
    deselect: PropTypes.func.isRequired,

    paper: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired
  };

  componentWillMount () {
    this.props.load()
    this.props.select(this.props.id)
  }

  componentWillUnmount () {
    this.props.leave()
    this.props.deselect()
  }

  _nextPage = (event) => {
    event.preventDefault()
    this.props.nextPage(this.props.id)
  }

  _prevPage = (event) => {
    event.preventDefault()
    this.props.prevPage(this.props.id)
  }

  render () {
    if (!this.props.paper.content) {
      return <div>Loading {this.props.id}</div>
    }

    const {page, content} = this.props.paper

    let pdf = ''

    if (content.paper && content.paper.content) {
      pdf = (
        <div className='paper__pdf'>
          <Row>
            <Col>
              <em>Link:</em> <code>/ipfs/{this.props.id}</code>
            </Col>
          </Row>
          <Row>
            <Col sm='1' md='1/3' className='paper__pdf-control'>
              <Button onClick={this._prevPage}>
                <Glyph icon='chevron-left' />
              </Button>
              <Button onClick={this._nextPage}>
                <Glyph icon='chevron-right' />
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <PDF
                content={content.paper.content.toString('base64')}
                page={page}
                scale={1.0}
                loading={(<span>Loading ...</span>)}
                className='paper__pdf-content'
              />
            </Col>
          </Row>
        </div>
      )
    }

    return (
      <Row>
        <Col className='paper'>
          <Card className='paper'>
            <h3>{content.title}</h3>
            <h4>by <em>{content.author}</em></h4>
            <h5>Published in {content.year}</h5>
            <p>
              {content.description}
            </p>
            {pdf}
          </Card>
        </Col>
      </Row>
    )
  }
}

function mapStateToProps (state, ownProps) {
  const id = ownProps.params.id
  const paper = state.paper[id] || {}

  return {
    id,
    paper
  }
}

export default connect(mapStateToProps, {
  ...pages.paper,
  nextPage: paper.paper.nextPage,
  prevPage: paper.paper.prevPage,
  select: paper.paper.select,
  deselect: paper.paper.deselect
})(Paper)
