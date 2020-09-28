import React from 'react'
import { Button } from 'react-bootstrap'
import { parseCurrency } from '../../../../helpers'

interface Props {
  data: any
  onDeleteItem: Function
}

function Item({data, onDeleteItem}: Props) {

  return (
    <tr>
      <td>
        <div className="checkout-item" style={{display: 'flex'}}>
          <div className="checkout-item-image">
            <img style={{height: 'auto', maxWidth: '100px'}}
              src={data.variant.image.originalSrc} alt={data.variant.title} />
          </div>
          <div style={{alignSelf: 'center'}} className="checkout-item-title pl-3">
            <p style={{color:'#006fbb'}}>{data.title}</p>
            <p style={{color: '##637381'}}>{data.variant.title !== 'Default Title' ? data.variant.title : ''}</p>
            <p style={{color: '##637381'}}>{data.variant.sku}</p>
            {data.customAttributes.map((attr: any, index: number) => {
              return (
                <div key={index}
                  className="checkout-item-attributes">
                  {attr.key === 'url' && <a target="__blank" href={attr.value}>Design</a>}
                </div>
              )
            })}
          </div>
        </div>
      </td>
      <td>{data.quantity}</td>
      <td className="text-right">{parseCurrency(data.variant.priceV2.amount)}</td>
      <td className="text-right">{parseCurrency(Number(data.variant.priceV2.amount) * data.quantity)}</td>
      <td>
        <Button variant={'danger'}
          type="button" onClick={() => onDeleteItem(data)}>Delete</Button>
      </td>
    </tr>
  )
}

export default Item