import React, { useState } from 'react'
import { Router, useParams } from 'react-router-dom'
import GetCurrentUser from '../../../hooks/getCurrentUser.js'
import {
  deleteCircle,
  getAllCircles,
  getCircle,
  updateCircle,
} from '../../../services/Circle.js'
import { useEffect } from 'react'
import {
  Box,
  Button,
  Paper,
  TextField,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import Loading from '../../../components/Loading/Loading'
import imageUpload from '../../../utils/imageUpload.js'
import jwt_decode from 'jwt-decode'
import CloseIcon from '@mui/icons-material/Close'

const Settings = () => {
  const { role, name } = useParams()

  const [circlesData, setCirclesData] = useState([])
  const [circleData, setCircleData] = useState({})
  const [circleName, setCircleName] = useState(name)
  const [circleAdmin, setCircleAdmin] = useState()
  const [circleDescription, setCircleDescription] = useState('')
  const [circleImage, setCircleImage] = useState('')
  const [circleCoverImage, setCircleCoverImage] = useState('')
  const [circleDetails, setCircleDetails] = useState('')
  const [circleDetailsError, setCircleDetailsError] = useState('')
  const [circleNameError, setCircleNameError] = useState(false)
  const [circleNameExistsError, setCircleNameExistsError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const user = jwt_decode(localStorage.getItem('token')).data

  useEffect(() => {
    getAllCircles()
      .then(data => {
        setCirclesData(data)
      })
      .catch(err => {
        console.error(err)
      })
    getCircle(name)
      .then(data => {
        setCircleData(data)
        setCircleName(data.name)
        setCircleDescription(data.description)
        setCircleAdmin(data.admin)
        setCircleImage(data.iconImage)
        setCircleCoverImage(data.coverImage)
        setCircleDetails(data.details)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(true)
        setLoading(false)
        setCircleData({})
        setCirclesData([])
      })
  }, [name])
  console.log('circleData', circleData)
  console.log('circleName', circleName)
  async function handleSubmit(e) {
    e.preventDefault()

    setCircleNameError(false)

    if (circleName === '') {
      setCircleNameError(true)
    }
    if (circleName) {
      const data = {
        prevName: name,
        name: circleName,
        description: circleDescription,
        admin: user.email,
      }
      const result = await updateCircle(data)
      console.log('result', result)
      circleData.name = circleName
      circleData.description = circleDescription
    }
  }
  const handleOnInputName = async value => {
    if (value.length >= 5) {
      setCircleNameError(false)
    }
    const circle = circlesData.find(circle => circle.name === value)
    if (circle) {
      setCircleNameExistsError(true)
    } else {
      setCircleNameExistsError(false)
    }
  }

  if (loading) {
    return <Loading loading={loading} />
  } else if (error) {
    return <div>Error</div>
  } else {
    return (
      <>
        <Box>
          <GeneralSettings
            handleOnInputName={handleOnInputName}
            circleName={circleName}
            circleAdmin={circleAdmin}
            setCircleName={setCircleName}
            circleNameError={circleNameError}
            circleNameExistsError={circleNameExistsError}
            circleDescription={circleDescription}
            setCircleDescription={setCircleDescription}
            user={user}
          />
        </Box>
        <Box
          sx={{
            marginTop: '30px',
          }}
        >
          <CircleDetails
            circleDetails={circleDetails}
            setCircleDetails={setCircleDetails}
            circleDetailsError={circleDetailsError}
            circleAdmin={circleAdmin}
            user={user}
          />
        </Box>
        <Box
          sx={{
            marginTop: '30px',
          }}
        >
          <CircleImages
            circleImage={circleImage}
            setCircleImage={setCircleImage}
            circleCoverImage={circleCoverImage}
            setCircleCoverImage={setCircleCoverImage}
            circleData={circleData}
            setCircleData={setCircleData}
            user={user}
          />
        </Box>
        <Box
          sx={{
            marginTop: '30px',
          }}
        >
          <DeleteCircle circleData={circleData} user={user} />
        </Box>
      </>
    )
  }
}

const GeneralSettings = ({
  circleName,
  setCircleName,
  circleNameError,
  circleAdmin,
  circleNameExistsError,
  circleDescription,
  setCircleDescription,
  user,
}) => {
  const [newCircleName, setNewCircleName] = useState(circleName)
  const [newCircleDescription, setNewCircleDescription] =
    useState(circleDescription)
  const handleSubmit = async e => {
    e.preventDefault()
    if (
      (circleName === newCircleName &&
        circleDescription === newCircleDescription) ||
      newCircleName.length === 0
    )
      return
    try {
      if (
        circleDescription !== newCircleDescription &&
        circleName === newCircleName
      ) {
        await updateCircle({
          name: circleName,
          admin: circleAdmin,
          user: user,
          description: newCircleDescription,
        })
        return
      }
      await updateCircle({
        prevName: circleName,
        name: newCircleName,
        admin: circleAdmin,
        user: user,
        description: newCircleDescription,
      })
      window.location.replace(
        `/circle/${newCircleName}/admin/dashboard/settings`,
      )
    } catch (error) {}
  }
  const handleOnChangeInputName = value => {
    console.log('value', value)
    setNewCircleName(value)
  }
  const handleOnChangeInputDescription = value => {
    setNewCircleDescription(value)
  }
  console.log('circle name::::::::', circleName)
  return (
    <>
      <Paper className={`p-5`}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
          }}
        >
          General
        </Typography>
        <Box
          sx={{
            marginTop: '30px',
          }}
        >
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Circle Name"
              variant="outlined"
              fullWidth
              value={newCircleName}
              autoFocus
              onChange={event => handleOnChangeInputName(event.target.value)}
              error={circleNameError}
              helperText={
                circleNameError
                  ? 'Circle name should have atleast 5 characters'
                  : circleNameExistsError
                  ? 'Circle name already exists'
                  : ''
              }
              sx={{
                marginBottom: '20px',
              }}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              fullWidth
              value={newCircleDescription}
              onChange={event =>
                handleOnChangeInputDescription(event.target.value)
              }
              sx={{
                marginBottom: '20px',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="text"
                type="reset"
                onClick={() => {
                  setNewCircleName(circleName)
                  setNewCircleDescription(circleDescription)
                }}
              >
                Reset
              </Button>
              <Button
                autoFocus
                onClick={e => handleSubmit(e)}
                variant="contained"
                sx={{
                  marginLeft: '10px',
                }}
              >
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </>
  )
}

const CircleDetails = ({
  circleDetails,
  setCircleDetails,
  circleDetailsError,
  circleAdmin,
  user,
}) => {
  const [newCircleDetails, setNewCircleDetails] = useState(circleDetails)
  const handleSubmit = e => {
    e.preventDefault()
  }
  return (
    <>
      <Paper className={`p-5`}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Details
        </Typography>
        <Box
          sx={{
            marginTop: '30px',
          }}
        >
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              label="Details"
              variant="outlined"
              fullWidth
              value={newCircleDetails}
              onChange={event => setNewCircleDetails(event.target.value)}
              sx={{
                marginBottom: '20px',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                variant="text"
                onClick={() => setNewCircleDetails(circleDetails)}
              >
                Reset
              </Button>
              <Button
                autoFocus
                onClick={handleSubmit}
                variant="contained"
                sx={{
                  marginLeft: '10px',
                }}
              >
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </>
  )
}

const CircleImages = ({
  setCircleData,
  circleData,
  circleImage,
  setCircleImage,
  circleCoverImage,
  setCircleCoverImage,
  user,
}) => {
  const uploadImage = async (uploadedFile, icon = true) => {
    console.log('file uploaded:::::: ', uploadedFile)
    try {
      const imgUrl = await imageUpload(uploadedFile, 'circle')
      console.log('imgUrl:::::: ', imgUrl)
      if (icon) {
        try {
          console.log('after icon image setup:::::: ', circleData)
          const result = await updateCircle({
            iconImage: imgUrl,
            user,
            id: circleData.id,
            name: circleData.name,
            admin: circleData.admin,
          })
          console.log('after uploading icon:::::: result', result)
          setCircleImage(imgUrl)
        } catch {
          console.log('Update Image failed!')
        }
        return
      }
      try {
        await updateCircle({
          coverImage: imgUrl,
          user,
          id: circleData.id,
          name: circleData.name,
          admin: circleData.admin,
        })
        setCircleCoverImage(imgUrl)
      } catch {
        console.log('Update Image failed!')
      }
    } catch (error) {
      alert.error('Error uploading image')
    }
  }
  return (
    <>
      <Paper className={`p-5`}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Visuals
        </Typography>
        <Box
          sx={{
            marginTop: '5px',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: '12px',
            }}
          >
            Use pictures to increase your Circle's growth
          </Typography>
          <Box
            sx={{
              marginTop: '20px',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
              }}
            >
              Icon
            </Typography>
            <Box
              sx={{
                marginTop: '10px',
              }}
            >
              <Box
                sx={{
                  outline: '1px solid #000',
                  width: '100px',
                  aspectRatio: '1/1',
                  borderRadius: '10%',
                  position: 'relative',
                  backgroundImage: `url(${circleImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <input
                  type="file"
                  id="icon_upload"
                  hidden
                  onClick={e => {
                    e.target.value = null
                  }}
                  onChange={e => {
                    uploadImage(e.target.files[0])
                  }}
                />
                <CreateIcon
                  onClick={() => {
                    document.getElementById('icon_upload').click()
                  }}
                  sx={{
                    fontSize: '25px',
                    padding: '4px',
                    position: 'absolute',
                    cursor: 'pointer',
                    top: '-10%',
                    right: '-10%',
                    backgroundColor: '#fff',
                    outline: '1px solid #000',
                    borderRadius: '50%',
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: '30px',
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: 'bold',
              }}
            >
              Cover Photo
            </Typography>
            <Box
              sx={{
                marginTop: '10px',
              }}
            >
              <Box
                sx={{
                  marginTop: '10px',
                }}
              >
                <Box
                  sx={{
                    outline: '1px solid #000',
                    width: '400px',
                    aspectRatio: '2/1',
                    borderRadius: '2%',
                    position: 'relative',
                    backgroundImage: `url(${circleCoverImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <input
                    type="file"
                    id="cover_upload"
                    hidden
                    onClick={e => {
                      e.target.value = null
                    }}
                    onChange={e => {
                      uploadImage(e.target.files[0], false)
                    }}
                  />
                  <CreateIcon
                    onClick={() => {
                      document.getElementById('cover_upload').click()
                    }}
                    sx={{
                      fontSize: '25px',
                      padding: '4px',
                      position: 'absolute',
                      cursor: 'pointer',
                      top: '-3%',
                      right: '-3%',
                      backgroundColor: '#fff',
                      outline: '1px solid #000',
                      borderRadius: '50%',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  )
}

const DeleteCircle = ({ circleData, user }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  return (
    <>
      <Paper className={`p-5`}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
          }}
        >
          Delete Circle
        </Typography>
        <Box
          sx={{
            marginTop: '5px',
            padding: '10px',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: '12px',
            }}
          >
            Deleting this Circle will remove the Circle page and all its content
            and comments. This is permanent and cannot be undone.
          </Typography>
          <Box
            sx={{
              marginTop: '40px',

              position: 'relative',
            }}
          >
            <Button
              sx={{
                position: 'absolute',
                right: '0',
                bottom: '0',
              }}
              variant="contained"
              color="error"
              onClick={handleOpen}
            >
              Delete Circle
            </Button>
            <DeleteCircleDialog
              isDialogOpened={isOpen}
              handleCloseDialog={() => setIsOpen(false)}
              circleData={circleData}
              user={user}
            />
          </Box>
        </Box>
      </Paper>
    </>
  )
}

function DeleteCircleDialog({
  isDialogOpened,
  handleCloseDialog,
  circleData,
  user,
}) {
  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')
  const [isDeleting, setIsDeleting] = useState(false)
  const handleClose = () => {
    handleCloseDialog(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!isDeleting) {
      console.log('Deleting Circle')
      return
    }
    try {
      await deleteCircle({
        name: circleData.name,
        admin: circleData.admin,
        user,
      })
      window.location.replace(`/circle`)
    } catch {
      setIsDeleting(false)
    }
  }

  const handleOnChangeInput = value => {
    if (value === circleData.name) {
      setIsDeleting(true)
    } else {
      setIsDeleting(false)
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h5">Are you absolutely sure?</Typography>
            <IconButton
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon
                sx={{
                  fontSize: '25px',
                  padding: '0',
                }}
              />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: '17px',
              }}
              color="text.primary"
              gutterBottom
            >
              This action cannot be undone. This will permanently delete the{' '}
              <strong>{circleData?.name}</strong> Circle, posts, questions,
              answers, and remove all members.
            </Typography>
            <Typography
              sx={{
                marginTop: '30px',
                fontSize: '17px',
              }}
              color="text.primary"
              gutterBottom
            >
              Please type <strong>{circleData?.name}</strong> to confirm.
            </Typography>
          </Box>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              // helperText={}
              margin="normal"
              // value={}
              onChange={e => handleOnChangeInput(e.target.value)}
              // error={}
              required
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              padding: '10px 20px',
              margin: '0 14px',
              textTransform: 'initial',
            }}
            fullWidth
            color="error"
            disabled={!isDeleting}
            onClick={handleSubmit}
            variant="contained"
          >
            I understand the consequences, delete this Circle.
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default Settings
