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
import { updatePost } from '../../services/Post'

export default function EditPostDialog({
  isEditDialogOpen,
  handleCloseEditDialog,
  editData,
  setPostData,
}) {
  const currentUser = GetCurrentUser()

  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')

  const [description, setDescription] = useState(editData.description)
  const [category, setCategory] = useState(editData.category)
  const [img, setImg] = useState(editData.img)
  const [postError, setPostError] = useState(false)
  const [categoryError, setCategoryError] = useState(false)
  const [imgError, setImgError] = useState(false)

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
      const data = {
        _id: editData._id,
        description: description,
        category: category,
        img: img,
        user_email: currentUser.email,
        username: currentUser.username,
      }
      console.log('edit dataaaaaaaa', data)
      const result = await updatePost(data)
      setPostData(prev => {
        const index = prev.findIndex(item => item._id === editData._id)
        prev[index] = data
        return [...prev]
      })
      console.log(result)
    }
    handleCloseEditDialog()
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle>Edit Your Post</DialogTitle>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            {/* user component */}
            <TextField
              onChange={e => setDescription(e.target.value)}
              label="Post"
              value={description === '' ? editData.description : description}
              helperText="Please enter your post here"
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
              label="Image Url"
              value={img === '' ? editData.img : img}
              helperText="Please enter image url here"
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
              value={category === '' ? editData.category : category}
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
            <Button variant="text" onClick={handleCloseEditDialog}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}
