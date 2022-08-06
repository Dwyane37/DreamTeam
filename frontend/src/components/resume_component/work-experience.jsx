import React from 'react'
import './work-experience.css'

function WorkExperience(props) {
  const { workExperience } = props

  return (
    <div className='work_experience_wrap'>
      {!!workExperience.length &&
        workExperience.map((item, index) => (
          <div className='work_experience_item' key={index}>
            <div className='header'>
              <span className='company item'>{item.Company}</span>
              <span className='position item'>{item.Position}</span>
              <span className='date item'>
                {item.start}-{item.end}
              </span>
            </div>
            <p className='description'>{item.Description}</p>
          </div>
        ))}
    </div>
  )
}

export default WorkExperience
