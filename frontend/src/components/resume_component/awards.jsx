import React from 'react'
import './awards.css'

function Awards(props) {
  const { awards } = props

  return (
    <div className='awards_wrap'>
      {!!awards.length &&
        awards.map((item, index) => (
          <div className='awards_item' key={index}>
            <div className='header'>
              <span className='title item'>{item.Title}: </span>
              <span className='description'>{item.Description}</span>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Awards
