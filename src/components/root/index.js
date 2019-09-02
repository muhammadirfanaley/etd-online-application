import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router } from 'react-router-dom'
import { hot } from 'react-hot-loader'

import App from 'components/app'

const Root = ({ store, apolloClient }) => (
  <Provider store={store}>
    <ApolloProvider client={apolloClient}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </Provider>
)
Root.propTypes = {
  store: PropTypes.object.isRequired,
  apolloClient: PropTypes.object.isRequired,
}

export default hot(module)(Root)
