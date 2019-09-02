import React from 'react'
import { render } from 'react-dom'

import configureStore from 'libs/store'
import configureApolloClient from 'libs/apollo'
import Root from 'components/root'

import 'normalize.css'

const store = configureStore()
const apolloClient = configureApolloClient()

render(
  <Root store={store} apolloClient={apolloClient} />,
  document.getElementById('root'),
)
