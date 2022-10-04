import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import categories from '../../../constants/categories'
import { Typography } from '@mui/material'
import { createCircle } from '../../../services/Circle'

export default function CreateCircleDialog({
  isDialogOpened,
  handleCloseDialog,
  data,
  email,
  setCircleData,
  setFollow,
}) {
  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')

  const [category, setCategory] = useState('')
  const [circleName, setCircleName] = useState('')
  const [circleDescription, setCircleDescription] = useState('')
  const [circleNameError, setCircleNameError] = useState(false)
  const [categoryError, setCategoryError] = useState(false)
  const [circleNameExistsError, setCircleNameExistsError] = useState(false)
  const handleClose = () => {
    handleCloseDialog(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setCircleNameError(false)
    setCategoryError(false)

    if (circleName === '') {
      setCircleNameError(true)
    }
    if (category === '') {
      setCategoryError(true)
    }
    if (circleName && category) {
      const data = {
        name: circleName,
        description: circleDescription,
        category,
        admin: email,
      }
      const result = await createCircle(data)
      console.log('result', result)
      setCircleName('')
      setCircleDescription('')
      setCategory('')
      handleClose()
      setCircleData(prevState => [...prevState, data])
      setFollow(prevState => [...prevState, data])
    }
  }

  const handleOnInputName = value => {
    if (value.length >= 5) {
      setCircleNameError(false)
    }
    const circle = data.find(circle => circle.name === value)
    if (circle) {
      setCircleNameExistsError(true)
    } else {
      setCircleNameExistsError(false)
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isDialogOpened}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle>
          <Typography variant="h5">Create Circle</Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Share your interests, curate content, host discussions, and more.
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Circle Name"
              variant="outlined"
              fullWidth
              helperText={
                circleNameError
                  ? 'Circle name should have atleast 5 characters'
                  : circleNameExistsError
                  ? 'Circle name already exists'
                  : ''
              }
              margin="normal"
              value={circleName}
              onInput={e => handleOnInputName(e.target.value)}
              onChange={e => setCircleName(e.target.value)}
              error={circleNameError || circleNameExistsError}
              required
            />
            <TextField
              id="outlined-basic"
              label="Circle Description"
              variant="outlined"
              fullWidth
              margin="normal"
              value={circleDescription}
              onChange={e => setCircleDescription(e.target.value)}
            />
            <TextField
              id="outlined-select-currency"
              select
              label="Category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              helperText={categoryError ? 'Please select category' : ''}
              variant="outlined"
              fullWidth
              margin="normal"
              error={categoryError}
              required
            >
              {categories.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant="text" onClick={handleClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={handleSubmit} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
