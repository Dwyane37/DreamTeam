import React from 'react'
import './project-display.css'

function ProjectDisplay(props) {
  const { projectDisplay } = props

  return (
    <div className='project_display_wrap'>
      {!!projectDisplay.length &&
        projectDisplay.map((item, index) => (
          <div className='project_display_item' key={index}>
            <div className='header'>
              <span className='title item'>{item.name}: </span>
              <span className='description'>{item.link}</span>
            </div>
          </div>
        ))}
    </div>
  )
}

export default ProjectDisplay
