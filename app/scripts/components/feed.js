import React, {Component, PropTypes} from 'react'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import {FlatButton} from 'material-ui'
import File from 'material-ui/svg-icons/editor/insert-drive-file'
import {purple500} from 'material-ui/styles/colors'

export default class Feed extends Component{
  render () {
    return (
      <div className='feed'>
        <Card expanded={false}>
          <CardHeader
            title='Awesome Paper'
            subtitle='from Mr. Daniels'
            showExpandableButton={false}
            avatar={<File color={purple500}/>}
          />
          <CardText>
            This is just an awesome paper, demonstrating
            how great awesome is.
          </CardText>
          <CardActions>
            <FlatButton label='Read' />
          </CardActions>
        </Card>
      </div>
    )
  }
}
