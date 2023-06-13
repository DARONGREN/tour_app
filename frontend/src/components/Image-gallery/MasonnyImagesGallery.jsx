import React from 'react'
import galleryImages from './galleryimages'
import Masnory, { ResponsiveMasonry } from 'react-responsive-masonry'

const MasonnyImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
      <Masnory gutter="1rem">
        {galleryImages.map((item, index) => (
          <img
            className="masnory__img"
            src={item}
            alt=""
            key={index}
            style={{ width: '100%', display: 'block', borderRadius: '10px' }}
          />
        ))}
      </Masnory>
    </ResponsiveMasonry>
  )
}

export default MasonnyImagesGallery
