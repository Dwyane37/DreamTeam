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
              <span className='company item'>{item.name}</span>
              <span className='date item'>
                {item.start}-{item.end}
              </span>
            </div>
            <p className='description'>{item.description}</p>
          </div>
        ))}
    </div>
  )
}

export default ProjectExperience
