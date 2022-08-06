import React from 'react'
import './education.css'

function Education(props) {
  const { education } = props
  return (
    <div className='education_wrap'>
      {!!education.length &&
        education.map((item, index) => (
          <div className='education_item' key={index}>
            <div className='header'>
              <span className='university item'>{item.University}</span>
              <span className='degree item'>{item.Degree}</span>
              <span className='faculty item '>{item.Faculty}</span>
              <span className='date item'>
                {item.Start}-{item.End}
              </span>
            </div>
            <p className='major'>major: {item.Major}</p>
            <p className='grades'>grades: {item.Grades}</p>
          </div>
        ))}
    </div>
  )
}

export default Education
