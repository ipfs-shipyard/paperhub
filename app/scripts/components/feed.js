import React, {Component, PropTypes} from 'react'
import {Card, Row, Col, Button} from 'elemental'

export default class Feed extends Component {
  static propTypes = {
    feed: PropTypes.array.isRequired
  };

  _renderCard = (item) => {
    return (
      <Row key={item.hash}>
        <Col sm='1' md='1/2' lg='1/2' className='feed__item'>
          <Card>
            <Row>
              <Col md='1/3'>
                <img src='http://placehold.it/84x120' />
              </Col>
              <Col md='2/3'>
                <Row>
                  <Col>
                    <span className='feed__title'>{item.title}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    by <span className='feed__author'>{item.author}</span>
                  </Col>
                </Row>
                <Row className='feed__buttons'>
                  <Col>
                    <Button type='hollow-primary'>
                      Read
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    )
  }

  render () {
    return (
      <Row className='feed'>
        <Col sm='1' md='1' lg='1'>
          {this.props.feed.map(this._renderCard)}
        </Col>
      </Row>
    )
  }
}
