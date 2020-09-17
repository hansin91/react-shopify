import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { CollectionCard } from '../../../../components'
import { homePage } from '../../../../config'
import { loadHomepageCards } from '../../../../stores/actions'

const { front } = homePage
let className = ''
if (front.length === 3) {
  className = 'col-sm-4'
}
if (front.length === 2) {
  className= 'col-sm-6'
}

if (front.length === 1) {
  className = 'col-sm-12'
}

function CollectionCards() {
  const dispatch = useDispatch()
  const cards = useSelector((state: RootStateOrAny) => state.homepage.cards)
  const loading = useSelector((state: RootStateOrAny) => state.homepage.loading)
  useEffect(() => {
    dispatch(loadHomepageCards(front))
  },[dispatch])
  return (
    <div className="collection-cards" style={{ paddingTop: '50px' }}>
      <div className="row">
        {cards.map((card: any) =>
          <CollectionCard
            key={card.id}
            className={className}
            loading={loading}
            collection={card} />)}
      </div>
    </div>
  )
}

export default CollectionCards