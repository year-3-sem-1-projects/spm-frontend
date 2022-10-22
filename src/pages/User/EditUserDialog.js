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
  setProfilePic,
  setCoverPic,
  setUsername
}) {
  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')
  //   const [message, setMessage] = useState('')
  //   const [open, setOpen] = useState(false)
  const [file, setFile] = useState('')
  const [imageURL, setImageURL] = useState(user.photo_url)
  const [coverImage, setcoverImage] = useState('')
  const [coverImageURL, setCoverImageURL] = useState(user.cover_photo_url)
  const [usernameD, setUsernameD] = useState(user.username)

//   const handleChange = e => {
//     setFile(e.target.files[0])
//   }
//   const handleCoverChange = e => {
//     setcoverImage(e.target.files[0])
//   }
  const handleClose = () => {
    handleCloseDialog(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    handleCloseDialog(false)
    // if (file) {
    //   imageUpload(file, 'user').then(res => {
    //     setImageURL(res)
    //     console.log("res", res)
    //   })
    // } else {
    //   setImageURL(user.photo_url)
    // }

    // if (coverImage) {
    //   imageUpload(coverImage, 'user').then(res => {
    //     setCoverImageURL(res)
    //     console.log('coverImage', res)
    //   })
    // } else {
    //   setCoverImageURL(user.cover_photo_url)
    // }

    console.log('imageURL', imageURL)
    console.log('coverImageURL', coverImageURL)

    const data = {
      email: user.email,
      username: usernameD,
      photo_url: imageURL,
      cover_photo_url: coverImageURL,
    }
    updateUser(data).then(res => {
      alert(res.data.message)
      setProfilePic(imageURL)
      setCoverPic(coverImageURL)
      setUsername(usernameD)
      setFile()
      setcoverImage()

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
            // defaultValue={user.username}
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
              onChange={e => {
                setFile(e.target.files[0])
                if(file){
                imageUpload(file, 'user').then(res => {
                    setImageURL(res)
                  })
                } else {
                  setImageURL(user.photo_url)
                }
              }}
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
              onChange={e => {
                setcoverImage(e.target.files[0])
                if(coverImage){
                    imageUpload(coverImage, 'user').then(res => {
                        setCoverImageURL(res)
                      })
                    } else {
                      setCoverImageURL(user.cover_photo_url)
                    }
              }}
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
