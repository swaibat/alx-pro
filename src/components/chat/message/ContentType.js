import React from 'react'
import ProductContent from './types/ProductContent'
import LocationContent from './types/LocationContent'
import TextContent from './types/TextContent'
import ImageContent from './types/ImageContent'
// import RenderMessage from './RenderMessage'

const ContentType = ({ item }) => (
  <>
    <ProductContent {...item} />
    <LocationContent {...item} />
    <ImageContent {...item} />
    <TextContent {...item} />
    {/* <RenderMessage {...item} /> */}
  </>
)

export default ContentType
