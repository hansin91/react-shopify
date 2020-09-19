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
                presentmentPriceRanges(first: 1) {
                  edges {
                    node {
                      maxVariantPrice {
                        amount
                        currencyCode
                      }
                      minVariantPrice {
                        amount
                        currencyCode
                      }
                    }
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
          presentmentPriceRanges(first: 1) {
            edges {
              node {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
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
