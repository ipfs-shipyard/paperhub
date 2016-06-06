import React from 'react'
import {Row, Col} from 'react-bootstrap'
import {Link} from 'react-router'

export default function NotFound () {
  return (
    <Row>
      <Col sm={10} smOffset={1}>
        <h1>'404 - Not Found'</h1>
        <p>
          <Link to='/'>
            'Go to console home'
          </Link>
        </p>
      </Col>
    </Row>
  )
}
