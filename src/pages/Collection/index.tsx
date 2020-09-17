import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { loadCollection } from '../../stores/actions'
import { SpinnerLoading } from '../../components'

function Collection() {
  const {title} = useParams() as any
  const dispatch = useDispatch()
  const loading = useSelector((state: RootStateOrAny) => state.collection.loadingCollection)
  const collection = useSelector((state: RootStateOrAny) => state.collection.collection)
  useEffect(() => {
    dispatch(loadCollection(title))
  },[dispatch, title])

  if (loading) {
    return (
      <SpinnerLoading />
    )
  }

  return (
    <div className="collection-page">
      {collection && <div className="collection-page-image" style={{ backgroundImage: `url(${collection.image})`,
        height: '55vh',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}></div>}
    </div>
  )
}

export default Collection