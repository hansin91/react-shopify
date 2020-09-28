import { gql } from 'apollo-boost'

export const FETCH_PRODUCTS = gql`
  query Products($first: Int, $query: String!)
  {
    collections(first: $first, query: $query) {
      edges {
        node {
          products(first: 20){
            edges {
              node {
                id
                title
                description
                descriptionHtml
                handle
                productType
                tags
                vendor
                priceRange {
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                }
                images(first: 20) {
                  edges {
                    node {
                      id
                      altText
                      originalSrc
                      transformedSrc
                    }
                  }
                }
                variants(first: 20) {
                  edges {
                    node {
                      id
                      title
                      sku
                      weight
                      weightUnit
                      priceV2 {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                options {
                  id
                  name
                  values
                }
              }
            }
          }
        }
      }
    }
  }
`

export const FETCH_CUSTOMER = gql`
  query Customer($customerAccessToken: String!)
  {
    customer(customerAccessToken: $customerAccessToken) {
      id
      email
      firstName
      lastName
      phone
      displayName
      lastIncompleteCheckout{
        id
      }
    }
  }
`

export const FETCH_CHECKOUT = gql`
  query Checkout($id: ID!)
  {
    node(id: $id) {
    ... on Checkout {
        id
        webUrl
        lineItemsSubtotalPrice {
          amount
          currencyCode
        }
        createdAt
        currencyCode
        email
        totalPriceV2 {
          amount
          currencyCode
        }
        lineItems(first: 100) {
          edges {
            node {
              id
              quantity
              title
              unitPrice {
                amount
                currencyCode
              }
              variant {
                id
                title
                sku
                image {
                  id
                  altText
                  originalSrc
                  originalSrc
                }
                priceV2 {
                  amount
                  currencyCode
                }
              }
              customAttributes {
                  key
                  value
              }
            }
          }
        }
      }
    }
  }
`

export const FETCH_PRODUCT_DETAIL = gql`
  query Product($first: Int!, $query: String!)
  {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          descriptionHtml
          handle
          productType
          tags
          vendor
          options {
            id
            name
            values
          }
          priceRange {
            maxVariantPrice {
              amount
              currencyCode
            }
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 20) {
            edges {
              node {
                id
                altText
                originalSrc
                transformedSrc
              }
            }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                sku
                weight
                weightUnit
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`
