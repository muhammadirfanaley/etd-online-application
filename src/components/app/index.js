import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import lazyLoad from 'libs/utils/lazy-loading'
const Home = lazyLoad(() => import('components/home'))

const App = () => (
  <Fragment>
    <Route exact path="/" component={Home} />
  </Fragment>
)

export default App
