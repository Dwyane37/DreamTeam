import React, { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import './my-dialog.css'

function MyDialog(props) {
  const { config } = props

  const temp = {}
  config.forEach((element) => {
    temp[element.label] = ''
  })

  const [inputData, setInputData] = useState([temp, ...props.data])

  const handleInput = (e, name, index) => {
    console.log(e.target.value, name, index)
    inputData[index][name] = e.target.value
    setInputData(inputData)
  }

  const deleteItem = (index) => {
    const tempData = [...inputData]
    tempData.splice(index, 1)
    setInputData([...tempData])
  }

  const addItem = (name) => {
    const tempData = [...inputData]
    tempData.unshift(temp)
    setInputData([...tempData])
  }

  const cancel = () => {
    console.log(props)
    props.cancel()
  }
  const save = () => {
    props.save(inputData)
  }

  return (
    <div className='my_dialog'>
      {inputData.map((element, index) => (
        <div className='form' key={index}>
          <div className='opearte'>
            <Button
              className='add'
              variant='contained'
              size='small'
              onClick={() => addItem()}
            >
              add
            </Button>
            {index ? (
              <Button
                className='delete'
                variant='contained'
                size='small'
                color='error'
                onClick={() => deleteItem(index)}
              >
                delete
              </Button>
            ) : (
              ''
            )}
          </div>
          {config.map((item, idx) => {
            return (
              <div className='form_item' key={item.label}>
                <div className='label'>{item.label}</div>
                <TextField
                  className='input'
                  size='small'
                  onChange={(e) => handleInput(e, item.label, index)}
                  fullWidth
                  defaultValue={element[item.label]}
                />
              </div>
            )
          })}
        </div>
      ))}

      <div className='footer'>
        <Button
          className='cancel'
          variant='contained'
          size='small'
          color='error'
          onClick={() => cancel()}
        >
          cancel
        </Button>
        <Button
          className='save'
          variant='contained'
          size='small'
          onClick={() => save()}
        >
          save
        </Button>
      </div>
    </div>
  )
}

export default MyDialog
