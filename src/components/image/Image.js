import React from 'react'
import './Image.css'

const Image = ({ src }) => {
  return (
    <img className="avatar" src={src} alt="avatar"/>
  )
}

export default Image
