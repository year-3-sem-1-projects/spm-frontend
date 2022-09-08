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

export default function CreateCircleDialog({
  isDialogOpened,
  handleCloseDialog,
}) {
  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')
  const [category, setCategory] = useState('Science')
  const [circleName, setCircleName] = useState('')
  const [circleDescription, setCircleDescription] = useState('')

  const handleClose = () => {
    handleCloseDialog(false)
  }

  function handleSubmit() {}

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isDialogOpened}
        onClose={handleClose}
        onSubmit={handleSubmit}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle>
          <Typography variant="h5">Create Circle</Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Share your interests, curate content, host discussions, and more.
          </Typography>
        </DialogTitle>

        <DialogContent></DialogContent>
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
