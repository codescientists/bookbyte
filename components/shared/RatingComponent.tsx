"use client"

import { Rating } from 'react-simple-star-rating'

const RatingComponent = () => {
  return (
    <div className="flex items-center">
        <Rating
            readonly={true}    
            initialValue={4}        
            allowFraction={true}
            size={25}
        />
    </div>
  )
}

export default RatingComponent