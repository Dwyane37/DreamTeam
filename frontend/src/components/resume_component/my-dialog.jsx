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
    inputData[index][name] = e.target.value
    setInputData(inputData)
  }

  const deleteItem = (index) => {
    const tempData = [...inputData]
    tempData.splice(index, 1)
    setInputData([...tempData])
    props.deleteItem(index)
  }

  const addItem = (name) => {
    const tempData = [...inputData]
    tempData.unshift(temp)
    setInputData([...tempData])
  }

  const cancel = () => {
    props.cancel()
  }
  const save = () => {
    const temp = inputData.filter((item) => {
      let flag = false
      Object.keys(item).forEach((key) => {
        console.log(item[key])
        if (item[key]) {
          flag = true
        }
      })
      return flag
    })

    props.save(temp)
  }
  console.log(props.type)
  return (
    <div className='my_dialog'>
      {inputData.map((element, index) => (
        <div className='form' key={index}>
          {props.type !== 'userInfo' ? (
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
          ) : (
            ''
          )}
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
