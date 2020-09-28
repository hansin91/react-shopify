import React, {useEffect, useState} from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { Container } from 'react-bootstrap'
import { FETCH_CHECKOUT } from '../../apollo/Query'
import { DELETE_LINE_ITEMS } from '../../apollo/Mutation'
import { SpinnerLoading } from '../../components'
import Item from './components/Item'
import { parseCurrency } from '../../helpers'

function Checkout() {
  const [,setError] = useState('')
  const [cart, setCart] = useState(null as any)
  const [ loadCheckout, { loading } ] =
  useLazyQuery(FETCH_CHECKOUT, { variables: { id: localStorage.getItem('checkout') },
    fetchPolicy: 'cache-and-network',
    onCompleted: (({node}) => {
      setCart(node)
    }),
    onError: (error: any) => {
      if (error) {
        error = error.graphQLErrors[0].message
        setError(error)
      }
    }
  })

  const [ deleteItems ] = useMutation(DELETE_LINE_ITEMS, {
    onCompleted: (payload: any) => {
      loadCheckout()
    },
    onError: (error: any) => {
      if (error) {
        error = error.graphQLErrors[0].message
        setError(error)
      }
    }
  })

  useEffect(() => {
    loadCheckout()
  },[])

  const onDeleteItem = (payload: any) => {
    console.log(payload)
    const lineItemIds = [
      payload.id
    ]
    deleteItems({variables: { checkoutId: localStorage.getItem('checkout'), lineItemIds }})
  }

  if (loading) {
    return <SpinnerLoading />
  }

  return (
    <div className="checkout-wrapper">
      <div className="checkout-container" style={{paddingTop: '20px'}}>
        <Container>
          <h2>Checkout</h2>
          <table className="table pt-4">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart && cart.lineItems.edges.map((item: any) =>
                <Item
                onDeleteItem={onDeleteItem}
                key={item.node.id} data={item.node}/> )}
              {cart && cart.lineItems.edges.length > 0 &&
                <tr>
                  <td className="text-right" colSpan={3}>Total</td>
                  <td className="text-right">{parseCurrency(Number(cart.totalPriceV2.amount))}</td>
                </tr>
              }
            </tbody>
          </table>
        </Container>
      </div>
    </div>
  )
}

export default Checkout