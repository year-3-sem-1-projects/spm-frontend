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
        user_email: currentUser.email,
        username: currentUser.username,
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
              helperText="Please enter your description here"
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
              helperText="Please enter Image url"
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

// import React, { useState } from 'react'
// import Button from '@mui/material/Button'
// import TextField from '@mui/material/TextField'
// import MenuItem from '@mui/material/MenuItem'
// import Dialog from '@mui/material/Dialog'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import DialogTitle from '@mui/material/DialogTitle'
// import categories from '../../constants/categories'
// import GetCurrentUser from '../../hooks/getCurrentUser'
// import { createPost } from '../../services/Post'
// import imageUpload from '../../utils/imageUpload'

// export default function AddPostDialog({ isDialogOpened, handleCloseDialog }) {
//   const currentUser = GetCurrentUser()

//   const [fullWidth] = useState(true)
//   const [maxWidth] = useState('sm')

//   const [description, setDescription] = useState('')
//   const [category, setCategory] = useState('')

//   const [postError, setPostError] = useState(false)
//   const [categoryError, setCategoryError] = useState(false)

//   const [imgError, setImgError] = useState(false)
//   const [file, setFile] = useState('')
//   const [img, setImg] = useState('')

//   const handleChange = e => {
//     setFile(e.target.files[0])
//   }

//   const handleClose = () => {
//     handleCloseDialog(false)
//   }

//   async function handleSubmit(e) {
//     e.preventDefault()
//     handleCloseDialog(false)
//     // if (file) {
//     //   await imageUpload(file).then(res => {
//     //     setImg(res)
//     //     console.log(img)
//     //   })
//     // }

//     setPostError(false)
//     setCategoryError(false)
//     setImgError(false)

//     if (description === '') {
//       setPostError(true)
//     }
//     if (category === '') {
//       setCategoryError(true)
//     }
//     if (img === '') {
//       setImgError(true)
//     }

//     if (description && category && img) {
//       const postContent = {
//         description: description,
//         category: category,
//         img: img,
//       }
//       const result = await createPost(postContent)
//       console.log(result)
//       handleCloseDialog(false)
//     }
//   }

//   return (
//     <React.Fragment>
//       <Dialog
//         fullWidth={fullWidth}
//         maxWidth={maxWidth}
//         open={isDialogOpened}
//         onClose={handleClose}
//         aria-labelledby="max-width-dialog-title"
//       >
//         <DialogTitle>Add Your Post</DialogTitle>
//         <form noValidate autoComplete="off" onSubmit={handleSubmit}>
//           <DialogContent>
//             {/* user component */}
//             <TextField
//               onChange={e => setDescription(e.target.value)}
//               label="Description"
//               helperText="Please enter your description here"
//               variant="filled"
//               fullWidth
//               multiline
//               rows={5}
//               required
//               error={postError}
//               sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
//             />

//             {/* <Button variant="contained" component="label">
//               Upload Post image
//               <input
//                 type="file"
//                 onChange={handleChange}
//                 accept="/image/*"
//                 error={imgError}
//                 hidden
//               />
//             </Button>
//             <br />
//             <br /> */}

//             <TextField
//               onChange={e => setImg(e.target.value)}
//               label="Image"
//               helperText="Please enter Image url"
//               variant="filled"
//               fullWidth
//               multiline
//               rows={5}
//               required
//               error={imgError}
//               sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
//             />

//             <TextField
//               onChange={e => setCategory(e.target.value)}
//               select
//               label="Category"
//               value={category}
//               helperText="Please select a cateogry"
//               fullWidth
//               required
//               error={categoryError}
//               sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
//             >
//               {categories.map(option => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </DialogContent>
//           <DialogActions>
//             <Button variant="text" onClick={handleClose} type="Submit">
//               Cancel
//             </Button>
//             <Button onClick={handleSubmit} variant="contained">
//               Add
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </React.Fragment>
//   )
// }

//----------------------------------------
// import React, { useState, useEffect } from 'react'
// import Button from '@mui/material/Button'
// import TextField from '@mui/material/TextField'
// import MenuItem from '@mui/material/MenuItem'
// import Dialog from '@mui/material/Dialog'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import DialogTitle from '@mui/material/DialogTitle'
// import categories from '../../constants/categories'
// import GetCurrentUser from '../../hooks/getCurrentUser'
// import { createPost } from '../../services/Post'
// import { storage } from '../../lib/firebase'
// import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage'
// import { v4 } from 'uuid'

// export default function AddPostDialog({ isDialogOpened, handleCloseDialog }) {
//   const currentUser = GetCurrentUser()

//   const [fullWidth] = useState(true)
//   const [maxWidth] = useState('sm')

//   const [description, setDescription] = useState('')
//   const [category, setCategory] = useState('')
//   const [img, setImg] = useState(null)
//   const [imageList, setImageList] = useState([])
//   const imageListRef = ref(storage, 'images/')

//   const [postError, setPostError] = useState(false)
//   const [categoryError, setCategoryError] = useState(false)
//   const [imgError, setImgError] = useState(false)

//   const handleUpload = () => {
//     if (img == null) return
//     const imageRef = ref(storage, `images/${img.name + v4()}`)
//     uploadBytes(imageRef, img).then(() => {
//       alert('Image has been uploaded')
//     })
//   }
//   useEffect(() => {
//     listAll(imageListRef).then(res => {
//       res.items.forEach(item => {
//         getDownloadURL(item).then(url => {
//           setImageList(prev => [...prev, url])
//         })
//       })
//     })
//   }, [])

//   const handleClose = () => {
//     handleCloseDialog(false)
//   }

//   async function handleSubmit(e) {
//     e.preventDefault()

//     setPostError(false)
//     setCategoryError(false)
//     setImgError(false)

//     if (description === '') {
//       setPostError(true)
//     }
//     if (category === '') {
//       setCategoryError(true)
//     }
//     if (img === '') {
//       setImgError(true)
//     }

//     if (description && category && img) {
//       const postContent = {
//         description: description,
//         category: category,
//         img: img,
//       }
//       const result = await createPost(postContent)
//       console.log(result)

//       handleCloseDialog(false)
//     }
//   }

//   return (
//     <React.Fragment>
//       <Dialog
//         fullWidth={fullWidth}
//         maxWidth={maxWidth}
//         open={isDialogOpened}
//         onClose={handleClose}
//         aria-labelledby="max-width-dialog-title"
//       >
//         <DialogTitle>Add Your Post</DialogTitle>
//         <form noValidate autoComplete="off" onSubmit={handleSubmit}>
//           <DialogContent>
//             {/* user component */}
//             <TextField
//               onChange={e => setDescription(e.target.value)}
//               label="Description"
//               helperText="Please enter your description here"
//               variant="filled"
//               fullWidth
//               multiline
//               rows={5}
//               required
//               error={postError}
//               sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
//             />

//             <TextField
//               type="file"
//               onChange={event => {
//                 setImg(event.target.files[0])
//               }}
//               error={imgError}
//             />
//             <Button onClick={handleUpload}>Upload</Button>

//             <br />

//             <TextField
//               onChange={e => setCategory(e.target.value)}
//               select
//               label="Category"
//               value={category}
//               helperText="Please select a cateogry"
//               fullWidth
//               required
//               error={categoryError}
//               sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
//             >
//               {categories.map(option => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </DialogContent>
//           <DialogActions>
//             <Button variant="text" onClick={handleClose} type="Submit">
//               Cancel
//             </Button>
//             <Button onClick={handleSubmit} variant="contained">
//               Add
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </React.Fragment>
//   )
// }

//----------------------------------------------------------------------

// import React, { useState } from 'react'
// import Button from '@mui/material/Button'
// import TextField from '@mui/material/TextField'
// import MenuItem from '@mui/material/MenuItem'
// import Dialog from '@mui/material/Dialog'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import DialogTitle from '@mui/material/DialogTitle'
// import categories from '../../constants/categories'
// import GetCurrentUser from '../../hooks/getCurrentUser'
// import { createPost } from '../../services/Post'
// import imageUpload from '../../utils/imageUpload'

// export default function AddPostDialog({ isDialogOpened, handleCloseDialog }) {
//   const currentUser = GetCurrentUser()

//   const [fullWidth] = useState(true)
//   const [maxWidth] = useState('sm')

//   const [description, setDescription] = useState('')
//   const [category, setCategory] = useState('')
//   const [img, setImg] = useState(null)

//   const [postError, setPostError] = useState(false)
//   const [categoryError, setCategoryError] = useState(false)
//   const [imgError, setImgError] = useState(false)

//   const handleClose = () => {
//     handleCloseDialog(false)
//   }

//   async function handleSubmit(e) {
//     e.preventDefault()

//     setPostError(false)
//     setCategoryError(false)
//     setImgError(false)

//     if (description === '') {
//       setPostError(true)
//     }
//     if (category === '') {
//       setCategoryError(true)
//     }
//     if (img === '') {
//       setImgError(true)
//     }

//     if (description && category && img) {
//       const postContent = {
//         description: description,
//         category: category,
//         img: img,
//       }
//       const result = await createPost(postContent)
//       console.log(result)

//       handleCloseDialog(false)
//     }
//   }

//   return (
//     <React.Fragment>
//       <Dialog
//         fullWidth={fullWidth}
//         maxWidth={maxWidth}
//         open={isDialogOpened}
//         onClose={handleClose}
//         aria-labelledby="max-width-dialog-title"
//       >
//         <DialogTitle>Add Your Post</DialogTitle>
//         <form noValidate autoComplete="off" onSubmit={handleSubmit}>
//           <DialogContent>
//             {/* user component */}
//             <TextField
//               onChange={e => setDescription(e.target.value)}
//               label="Description"
//               helperText="Please enter your description here"
//               variant="filled"
//               fullWidth
//               multiline
//               rows={5}
//               required
//               error={postError}
//               sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
//             />

//             <TextField
//               type="file"
//               onChange={event => {
//                 setImg(event.target.files[0])
//               }}
//               error={imgError}
//             />
//             <Button onClick={imageUpload}>Upload</Button>

//             <br />

//             <TextField
//               onChange={e => setCategory(e.target.value)}
//               select
//               label="Category"
//               value={category}
//               helperText="Please select a cateogry"
//               fullWidth
//               required
//               error={categoryError}
//               sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
//             >
//               {categories.map(option => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </DialogContent>
//           <DialogActions>
//             <Button variant="text" onClick={handleClose} type="Submit">
//               Cancel
//             </Button>
//             <Button onClick={handleSubmit} variant="contained">
//               Add
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </React.Fragment>
//   )
// }

//------------------------------------------------------------------------------------

//-----------------------------------------------------------------------
// import React, { useState } from 'react'
// import Button from '@mui/material/Button'
// import TextField from '@mui/material/TextField'
// import MenuItem from '@mui/material/MenuItem'
// import Dialog from '@mui/material/Dialog'
// import DialogActions from '@mui/material/DialogActions'
// import DialogContent from '@mui/material/DialogContent'
// import DialogTitle from '@mui/material/DialogTitle'
// import categories from '../../constants/categories'
// import GetCurrentUser from '../../hooks/getCurrentUser'
// import { createPost } from '../../services/Post'

// ///

// import { storage } from '../../lib/firebase'
// import { ref, uploadBytes } from 'firebase/storage'
// import { v4 } from 'uuid'

// export default function AddPostDialog({ isDialogOpened, handleCloseDialog }) {
//   const currentUser = GetCurrentUser()

//   const [fullWidth] = useState(true)
//   const [maxWidth] = useState('sm')

//   const [description, setDescription] = useState('')
//   const [category, setCategory] = useState('')
//   // const [img, setImg] = useState('')
//   const [img, setImg] = useState(null)
//   // const [url, setUrl] = useState('')
//   // const [progress, setProgress] = useState(0)

//   const [postError, setPostError] = useState(false)
//   const [categoryError, setCategoryError] = useState(false)
//   const [imgError, setImgError] = useState(false)

//   const handleChange = e => {
//     if (e.target.files[0]) {
//       setImg(e.target.files[0])
//     }
//   }

//   const handleUpload = () => {
//     const uploadTask = ref(storage, `images/${img.name + v4()}`)
//     uploadBytes(uploadTask, img).then(() => {
//       alert('Image has been uploaded')
//     })

//     // uploadTask.on(
//     //   'state_changed',
//     //   snapshot => {
//     //     const progress = Math.round(
//     //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
//     //     )
//     //     setProgress(progress)
//     //   },
//     //   error => {
//     //     console.log(error)
//     //   },
//     //   () => {
//     //     storage
//     //       .ref('images')
//     //       .child(img.name)
//     //       .getDownloadURL()
//     //       .then(url => {
//     //         console.log(url)
//     //         setUrl(url)
//     //       })
//     //   },
//     // )
//   }

//   const handleClose = () => {
//     handleCloseDialog(false)
//   }

//   async function handleSubmit(e) {
//     e.preventDefault()

//     setPostError(false)
//     setCategoryError(false)
//     setImgError(false)

//     if (description === '') {
//       setPostError(true)
//     }
//     if (category === '') {
//       setCategoryError(true)
//     }
//     if (img === '') {
//       setImgError(true)
//     }

//     if (description && category && img) {
//       const postContent = {
//         description: description,
//         category: category,
//         img: img,
//       }
//       const result = await createPost(postContent)
//       console.log(result)
//       handleCloseDialog(false)
//     }
//   }

//   return (
//     <React.Fragment>
//       <Dialog
//         fullWidth={fullWidth}
//         maxWidth={maxWidth}
//         open={isDialogOpened}
//         onClose={handleClose}
//         aria-labelledby="max-width-dialog-title"
//       >
//         <DialogTitle>Add Your Post</DialogTitle>
//         <form noValidate autoComplete="off" onSubmit={handleSubmit}>
//           <DialogContent>
//             {/* user component */}
//             <TextField
//               onChange={e => setDescription(e.target.value)}
//               label="Description"
//               helperText="Please enter your description here"
//               variant="filled"
//               fullWidth
//               multiline
//               rows={5}
//               required
//               error={postError}
//               sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
//             />
//             {/* <TextField
//               onChange={e => setImg(e.target.value)}
//               label="Image"
//               helperText="Please enter Image url"
//               variant="filled"
//               fullWidth
//               multiline
//               rows={5}
//               required
//               error={imgError}
//               sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
//             /> */}
//             {/* <progress value={progress} max="100" />
//             <br /> */}
//             <TextField
//               type="file"
//               onChange={handleChange}
//               error={imgError}
//               label="Image"
//             />
//             <Button onClick={handleUpload}>Upload</Button>
//             <br />
//             {/* {url}
//             <br />
//             <img
//               src={url || 'http://via.placeholder.com/300'}
//               alt="firebase-image"
//             /> */}
//             <TextField
//               onChange={e => setCategory(e.target.value)}
//               select
//               label="Category"
//               value={category}
//               helperText="Please select a cateogry"
//               fullWidth
//               required
//               error={categoryError}
//               sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
//             >
//               {categories.map(option => (
//                 <MenuItem key={option.value} value={option.value}>
//                   {option.label}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </DialogContent>
//           <DialogActions>
//             <Button variant="text" onClick={handleClose} type="Submit">
//               Cancel
//             </Button>
//             <Button onClick={handleSubmit} variant="contained">
//               Add
//             </Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//     </React.Fragment>
//   )
// }
