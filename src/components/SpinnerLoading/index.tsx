import './styles.scss'
import React from 'react'
import { Spinner } from 'react-bootstrap'

function SpinnerLoading() {
  return (
    <div className="spinner-container">
      <Spinner animation="grow" />
    </div>
  )
}

export default SpinnerLoading