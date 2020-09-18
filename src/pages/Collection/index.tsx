import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { loadCollection } from '../../stores/actions'
import { SpinnerLoading } from '../../components'
import { collections } from '../../config'
import Image from './components/Image'

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
  const loading = useSelector((state: RootStateOrAny) => state.collection.loadingCollection)
  const collection = useSelector((state: RootStateOrAny) => state.collection.collection)
  useEffect(() => {
    dispatch(loadCollection(handle))
  },[dispatch, handle])

  if (loading) {
    return (
      <SpinnerLoading />
    )
  }

  return (
    <div className="collection-page">
      {collection && <Image position={position} collection={collection} />}
    </div>
  )
}

export default Collection