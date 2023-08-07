import React from 'react'
import Image from "next/image"
type Props = {}

function Temp({}: Props) {
  return (
    <>
    <div className='fixed top-4 left-20'>
    <Image src="/icons/Polygon1.svg" alt="logo" height={150} width={170}  />
    </div>
    <div className='fixed top-4 right-20'>
    <Image src="/icons/Polygon2.svg" alt="logo" height={70} width={70}/>
    </div>
    </>
  )
}

export default Temp