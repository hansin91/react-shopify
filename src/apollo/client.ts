import ApolloClient from 'apollo-boost'
const { REACT_APP_SHOPIFY_STOREFRONT_TOKEN, REACT_APP_SHOPIFY_GRAPHQL_URL } = process.env

export default new ApolloClient({
  uri: REACT_APP_SHOPIFY_GRAPHQL_URL,
  request: async operation => {
    operation.setContext({
      headers: {
        'X-Shopify-Storefront-Access-Token': REACT_APP_SHOPIFY_STOREFRONT_TOKEN,
        'Content-Type': 'application/json'
      }
    });
  }
});
