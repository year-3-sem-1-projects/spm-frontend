import React, { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { deletePost } from '../../services/Post'

export default function DeletePostDialog({
  isDeleteDialogOpen,
  handleCloseDeleteDialog,
  deleteData,
  setPostData,
}) {
  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')

  const handleClose = () => {
    handleCloseDeleteDialog()
  }

  async function handleDelete() {
    console.log('THIS IS THE DELETE DATA::::::', deleteData)
    const result = await deletePost(deleteData)
    setPostData(prev => prev.filter(post => post._id !== deleteData._id))
    console.log(result)
    handleCloseDeleteDialog()
  }

  return (
    <div>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
      >
        <DialogTitle
          sx={{
            margin: 1,
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          <ErrorOutlineIcon
            sx={{ color: '#f44336', fontSize: 40, marginRight: 1 }}
          />
          Are you sure you want to delete this post?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: 16,
              fontWeight: 400,
              display: 'flex',
            }}
          >
            Your post and all the likes will be deleted permanently.This action
            cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
