import './styles.scss'
import React, { useCallback } from 'react'
import parse from 'react-html-parser'
import { debounce } from 'lodash'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Product } from '../../../../interfaces'

interface Props {
  product: Product
  collection: string,
  onFocusInput: Function
  onNamePersonalization: any
  onImageFile: Function
}

function ProductInfo({product, collection, onFocusInput, onImageFile, onNamePersonalization}: Props) {
  const debounceLoadData = useCallback(debounce(onNamePersonalization, 500), []);
  const handleInput = (input: string) => {
    debounceLoadData(input);
  }

  const handleFile = (e: any) => {
    e.persist();
    onImageFile(e.target.files[0])
  }

  const handleQuantity = (quantity: number) => {
    console.log(quantity)
  }

  return(
    <div className="col-md-5 col-sm-12 col-xs-12">
      <div className="product-info" style={{padding: '0 0.7rem'}}>
        <div className="product-info-detail">
          <Link className="text-decoration-none product-info-collection" to={`/collections/${collection}`}>
            <span style={{color: '#879898', display: 'block', paddingBottom: '10px'}}>{product.product_type}</span>
          </Link>
          <h1 className="product-info-title">{product.title}</h1>
          <div style={{color:'#879898'}}>{parse(product.description_html)}</div>
          <div className="row">
            <div className="col-md-10">
              <div className="pplr-wrapper pplr-dropdown pplr-cover">
                <Form>
                  <Form.Group>
                    <Form.Label className="pplrlabel">Name Personalisation</Form.Label>
                    <Form.Control
                      onChange={(e: any) => handleInput(e.target.value)}
                      onFocus={() => onFocusInput(true)}
                      className="pplrinput"
                      type="text"
                      placeholder="Your Name" />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="pplrlabel">Image</Form.Label>
                    <Form.Control onChange={handleFile}  type="file" accept="image/*"></Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="pplrlabel">Quantity</Form.Label>
                    <input type="number"
                      onChange={(e: any) => handleQuantity(Number(e.target.value))}
                      min="1"
                      className="pplrlabel form-control"
                      defaultValue="1" />
                  </Form.Group>
                  <Form.Group>
                   <input type="submit" className="btn btn-primary p_a_t_c purchase-btn" value="Add to bag"/>
                  </Form.Group>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo