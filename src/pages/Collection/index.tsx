import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { loadCollections } from '../../stores/actions'
import { SpinnerLoading } from '../../components'
import { collections } from '../../config'
import { Products, Image } from './components'

const getPosition = (handle: string): string => {
  const fitered = collections.filter((collection) => collection.handle === handle)
  if (fitered.length) {
    const [data] = fitered
    return data.position
  }
  return 'left'
}

function Collection() {
  const {handle} = useParams() as any
  const position = getPosition(handle)
  const dispatch = useDispatch()
  const loading = useSelector((state: RootStateOrAny) => state.collection.loading)
  const collection = useSelector((state: RootStateOrAny) => state.collection.collection)
  const params = {
    handle
  }
  useEffect(() => {
    dispatch(loadCollections(params))
  },[dispatch, handle])

  if (loading) {
    return (
      <SpinnerLoading />
    )
  }

  return (
    <div className="collection-page">
      {collection && <Image position={position} collection={collection} />}
      {collection && <Products collection={collection} />}
    </div>
  )
}

export default Collection