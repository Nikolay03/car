/* eslint-disable max-len */
import React from 'react'

import SvgIcon from './SvgIcon'

const Basket = ({ color, ...props }) => {
  return (
    <SvgIcon fill={color} viewBox={'0 0 24 24'} xmlns={'http://www.w3.org/2000/svg'} {...props}>
      <path d={'M19.5788 6.75H4.42128C4.23672 6.75 4.05862 6.81806 3.92109 6.94115C3.78357 7.06425 3.69625 7.23374 3.67587 7.41718L2.34254 19.4172C2.33089 19.522 2.34149 19.6281 2.37363 19.7286C2.40578 19.829 2.45876 19.9216 2.52911 20.0002C2.59945 20.0788 2.68559 20.1416 2.78188 20.1847C2.87818 20.2277 2.98247 20.25 3.08795 20.25H20.912C21.0176 20.25 21.1218 20.2277 21.2181 20.1847C21.3144 20.1416 21.4006 20.0788 21.4709 20.0002C21.5413 19.9216 21.5942 19.829 21.6264 19.7286C21.6585 19.6281 21.6691 19.522 21.6575 19.4172L20.3241 7.41718C20.3038 7.23374 20.2164 7.06425 20.0789 6.94115C19.9414 6.81806 19.7633 6.75 19.5788 6.75Z'} stroke={'#111111'} strokeWidth={'1.5'} strokeLinecap={'round'} strokeLinejoin={'round'} />
      <path d={'M8.25 6.75C8.25 5.75544 8.6451 4.80161 9.34838 4.09835C10.0516 3.39508 11.0054 3 12 3C12.9946 3 13.9484 3.39508 14.6516 4.09835C15.3549 4.80161 15.75 5.75544 15.75 6.75'} stroke={'#111111'} strokeWidth={'1.5'} strokeLinecap={'round'} strokeLinejoin={'round'} />
    </SvgIcon>
  )
}
export default Basket
