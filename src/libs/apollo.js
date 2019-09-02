import ApolloClient from 'apollo-boost'
import * as cookies from 'tiny-cookie'

export default function configureApolloClient () {
  const accessToken = cookies.get('access_token')
  return new ApolloClient({
    uri: '/graphql',
    request (operation) {
      operation.setContext({
        headers: {
          Authorization: accessToken ? `Bearer ${accessToken}` : null,
        },
      })
    },
    onError ({ graphQLErrors, networkError }) {
      if (graphQLErrors) {
        alert(
          'We meet some GraphQL errors. Please edit `src/libs/apollo.js` to handle those errors.',
        )
      }
      if (networkError && networkError.statusCode === 401) {
        alert(
          'You need to relogin. Please edit `src/libs/apollo.js` to handle the non-auth error.',
        )
      }
    },
  })
}
