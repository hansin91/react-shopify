import React, {Fragment} from 'react'
import { Route, Switch } from 'react-router-dom'
import { Navbar } from '../../components'
import {HomePage, ProductDetail, Collection} from '../../pages'

function Home() {
  return(
    <Fragment>
      <Navbar />
      <div style={{ paddingTop: '55px'}}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/collections/:name/products/:product" component={ProductDetail} />
          <Route exact path="/collections/:handle" component={Collection} />
        </Switch>
      </div>
    </Fragment>
  )
}

export default Home