import React from 'react'
import {Route, IndexRoute, Redirect} from 'react-router'

import App from './containers/app'
import HomePage from './containers/home'
import UploadPage from './containers/upload'
import PaperPage from './containers/paper'
import NotFoundPage from './components/notfound'

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage}/>
    <Route path='home' component={HomePage} />
    <Route path='upload' component={UploadPage} />

    <Route path='paper(/:id)' component={PaperPage} />

    <Route path='*' component={NotFoundPage} />
    <Redirect from='/index.html' to='/home' />
  </Route>
)
