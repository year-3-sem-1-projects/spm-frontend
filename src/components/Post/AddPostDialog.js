import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import categories from '../../constants/categories'
import GetCurrentUser from '../../hooks/getCurrentUser'
import { createPost } from '../../services/Post'

export default function AddPostDialog({ isDialogOpened, handleCloseDialog }) {
  const currentUser = GetCurrentUser()

  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')

  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [img, setImg] = useState('')
  const [postError, setPostError] = useState(false)
  const [categoryError, setCategoryError] = useState(false)
  const [imgError, setImgError] = useState(false)

  const handleClose = () => {
    handleCloseDialog(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    setPostError(false)
    setCategoryError(false)
    setImgError(false)

    if (description === '') {
      setPostError(true)
    }
    if (category === '') {
      setCategoryError(true)
    }
    if (img === '') {
      setImgError(true)
    }

    if (description && category && img) {
      const postContent = {
        description: description,
        category: category,
        img: img,
      }
      const result = await createPost(postContent)
      console.log(result)
      handleCloseDialog(false)
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
        <DialogTitle>Add Your Post</DialogTitle>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            {/* user component */}
            <TextField
              onChange={e => setDescription(e.target.value)}
              label="Description"
              placeholder="Type your description here"
              variant="filled"
              fullWidth
              multiline
              rows={5}
              required
              error={postError}
              sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
            />
            <TextField
              onChange={e => setImg(e.target.value)}
              label="Image"
              placeholder="Enter Image url"
              variant="filled"
              fullWidth
              multiline
              rows={5}
              required
              error={imgError}
              sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
            />
            <TextField
              onChange={e => setCategory(e.target.value)}
              select
              label="Category"
              value={category}
              helperText="Please select a cateogry"
              fullWidth
              required
              error={categoryError}
              sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
            >
              {categories.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={handleClose} type="Submit">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}
