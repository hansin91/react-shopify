import React, { useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux'
import { Banner, SpinnerLoading } from '../../../../components'
import { loadBanner } from '../../../../stores/actions/banner'
import { homePage } from '../../../../config'

const {banners} = homePage
const [title] = banners

function BannerWrapper() {
  const dispatch = useDispatch()
  const banner = useSelector((state: RootStateOrAny) => state.banner.banner)
  const loading = useSelector((state: RootStateOrAny) => state.banner.loading)
  useEffect(() => {
    dispatch(loadBanner(title))
  },[dispatch])
  if (loading) {
    return <SpinnerLoading />
  }
  return (
    <div className="banner-wrapper row" style={{paddingTop: '50px'}}>
      {banner &&  <Banner position="right" data={banner} />}
    </div>
  )
}

export default BannerWrapper