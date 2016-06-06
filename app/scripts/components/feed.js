import React, {Component, PropTypes} from 'react'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import {FlatButton} from 'material-ui'
import File from 'material-ui/svg-icons/editor/insert-drive-file'
import {purple500} from 'material-ui/styles/colors'

const cardStyle = {
  marginBottom: '20px'
}

export default class Feed extends Component {
  static propTypes = {
    feed: PropTypes.array.isRequired
  };

  _renderCard = (item) => {
    let desc = ''

    if (item.description) {
      desc = (
        <CardText>
          {item.description}
        </CardText>
      )
    }

    return (
      <Card expanded={false} key={item.hash} style={cardStyle}>
        <CardHeader
          title={item.title}
          subtitle={item.author}
          showExpandableButton={false}
          avatar={<File color={purple500}/>}
        />
        {desc}
        <CardActions>
          <FlatButton label='Read' />
        </CardActions>
      </Card>
    )
  }

  render () {
    return (
      <div className='feed'>
        {this.props.feed.map(this._renderCard)}
      </div>
    )
  }
}
