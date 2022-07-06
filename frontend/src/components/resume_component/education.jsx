import React from 'react'
import './education.css'

function Education(props) {
  const { education } = props
  return (
    <div className='education_wrap'>
      {education.length &&
        education.map((item, index) => (
          <div className='education_item' key={index}>
            <div className='header'>
              <span className='university item'>{item.university}</span>
              <span className='degree item'>{item.degree}</span>
              <span className='faculty item '>{item.faculty}</span>
              <span className='date item'>
                {item.start}-{item.end}
              </span>
            </div>
            <p className='major'>major: {item.major}</p>
            <p className='grades'>grades: {item.grades}</p>
          </div>
        ))}
    </div>
  )
}

export default Education
