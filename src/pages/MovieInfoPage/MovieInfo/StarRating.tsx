import React from 'react'
import { Rating } from '@smastrom/react-rating'

interface Props {
  rating: number
  setRating: React.Dispatch<React.SetStateAction<number>>
}

function StarRating({ rating, setRating }: Props) {
  const star = (
    <path d="M62 25.154H39.082L32 3l-7.082 22.154H2l18.541 13.693L13.459 61L32 47.309L50.541 61l-7.082-22.152L62 25.154z" />
  )

  const customStyles = {
    itemShapes: star,

    activeFillColor: [
      '#FEE2E2',
      '#FEE2E2',
      '#FFEDD5',
      '#FFEDD5',
      '#FEF9C3',
      '#FEF9C3',
      '#ECFCCB',
      '#ECFCCB',
      '#D1FAE5',
      '#D1FAE5',
    ],
    activeBoxColor: [
      '#da1600',
      '#da1600',
      '#db711a',
      '#db711a',
      '#dcb000',
      '#dcb000',
      '#61bb00',
      '#61bb00',
      '#009664',
      '#009664',
    ],

    inactiveFillColor: 'white',
    inactiveBoxColor: '#dddddd',
  }
  return (
    <Rating
      className="md:w-[60%]"
      value={rating}
      halfFillMode="svg"
      items={10}
      onChange={(selectedValue) => setRating(selectedValue)}
      itemStyles={customStyles}
      radius="large"
      spaceBetween="small"
      spaceInside="large"
    />
  )
}

export default StarRating
