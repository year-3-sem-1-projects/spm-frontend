import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
import React, { useState } from 'react'
import { updateUser } from '../../services/User'
import imageUpload from '../../utils/imageUpload'
// import SimpleSnackbar from '../../components/Notifications/Snackbar'

export default function EditUserDialog({
  isDialogOpened,
  user,
  handleCloseDialog,
}) {
  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')
  //   const [message, setMessage] = useState('')
  //   const [open, setOpen] = useState(false)
  const [file, setFile] = useState('')
  const [imageURL, setImageURL] = useState()
  const [coverImage, setcoverImage] = useState('')
  const [coverImageURL, setCoverImageURL] = useState()
  const [username, setUsername] = useState(user.username)

  const handleChange = e => {
    setFile(e.target.files[0])
  }
  const handleCoverChange = e => {
    setcoverImage(e.target.files[0])
  }
  const handleClose = () => {
    handleCloseDialog(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    handleCloseDialog(false)
    if (file) {
      await imageUpload(file).then(res => {
        setImageURL(res)
        console.log(imageURL)
      })
    } else {
        setImageURL(user.photo_url)
    }

    if (coverImage) {
        await imageUpload(coverImage).then(res => {
          setCoverImageURL(res)
        })
      } else {
          setCoverImageURL(user.cover_photo_url)
      }
      console.log(imageURL)
      console.log(coverImageURL)
    const data = {
      email: user.email,
      username: username,
      photo_url: imageURL,
      cover_photo_url: coverImageURL,
    }
    await updateUser(data).then(res => {
      alert(res.data.message)
    })
  }

  return (
    <Dialog
      open={isDialogOpened}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
    >
      <DialogTitle>Edit User Profile</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit your profile information here.
        </DialogContentText>
        <br />
        <form>
          <TextField
            id="email"
            label="Email"
            defaultValue={user.email}
            helperText="This is your email address, unfortunately it cannot be changed."
            variant="filled"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            margin="dense"
            id="username"
            label="Username"
            defaultValue={user.username}
            fullWidth
            variant="outlined"
            onChange={e => setUsername(e.target.value)}
          />
          <br />
          <br />
          <Button variant="contained" component="label">
            Upload Profile Picture
            <input
              type="file"
              onChange={handleChange}
              accept="/image/*"
              hidden
            />
          </Button>
          <br />
          <br />
          <Button variant="contained" component="label">
            Upload Cover Photo
            <input
              type="file"
              onChange={handleCoverChange}
              accept="/image/*"
              hidden
            />
          </Button>
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Edit</Button>
      </DialogActions>
      {/* {open ? <SimpleSnackbar message={message} /> : null} */}
    </Dialog>
  )
}
