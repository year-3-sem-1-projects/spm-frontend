import { Button, MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'
import categories from '../../../constants/categories'
import { useForm } from 'react-hook-form'
import { FormInputText } from '../../../components/form/FormInputText'

const defaultValues = {
  name: '',
}

const Form = () => {
  const [category, setCategory] = useState('Science')

  // const checkValidity = name => {
  //   if (name.length < 3) {
  //     return false
  //   }
  //   return true
  // }

  const methods = useForm({ defaultValues: defaultValues })
  const { handleSubmit, reset, control, setValue, watch } = methods
  const onSubmit = data => console.log(data)

  // const handleSubmit = e => {
  //   e.preventDefault()
  //   const circle = {
  //     name: e.target['circle-name'].value,
  //     description: e.target['circle-description'].value,
  //     category: category,
  //   }
  //   console.log(circle)
  // }

  return (
    <>
      <form
        noValidate
        autoComplete="off"
        // onSubmit={e => handleSubmit(e)}
      >
        <FormInputText
          name="circle-name"
          control={control}
          label="Circle Name"
        />
        <TextField
          id="circle-name"
          label="Circle Name"
          type="text"
          placeholder="Type a Circle name here"
          fullWidth
          variant="filled"
          helperText="This can be changed in Circle settings"
          style={{ marginBottom: '15px' }}
        />

        <TextField
          id="circle-description"
          label="Description"
          type="text"
          placeholder="Type your description here"
          multiline
          fullWidth
          variant="filled"
          rows={2}
          style={{ marginBottom: '15px' }}
          helperText="Include few keywords to show people what to expect if they join"
        />
        <TextField
          id="circle-category"
          select
          label="Category"
          defaultValue={category}
          fullWidth
          onChange={e => setCategory(e.target.value)}
          helperText="Please select a category"
        >
          {categories.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button onClick={handleSubmit(onSubmit)} variant={'contained'}>
          Submit
        </Button>
        <Button onClick={() => reset()} variant={'outlined'}>
          Reset
        </Button>
      </form>
    </>
  )
}

export default Form
