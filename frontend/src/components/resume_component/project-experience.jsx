import React from 'react'
import './project-experience.css'

function ProjectExperience(props) {
  const { projectExperience } = props

  return (
    <div className='project_experience_wrap'>
      {!!projectExperience.length &&
        projectExperience.map((item, index) => (
          <div className='project_experience_item' key={index}>
            <div className='header'>
              <span className='company item'>{item.Name}</span>
              <span className='date item'>
                {item.Start}-{item.End}
              </span>
            </div>
            <p className='description'>{item.Description}</p>
          </div>
        ))}
    </div>
  )
}

export default ProjectExperience
