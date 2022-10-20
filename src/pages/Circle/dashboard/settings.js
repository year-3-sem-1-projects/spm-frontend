import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import GetCurrentUser from '../../../hooks/getCurrentUser.js'
import {
  getAllCircles,
  getCircle,
  updateCircle,
} from '../../../services/Circle.js'
import { useEffect } from 'react'
import { Box, Button, Paper, TextField, Grid, Typography } from '@mui/material'
import CreateIcon from '@mui/icons-material/Create'
import Loading from '../../../components/Loading/Loading'
import imageUpload from '../../../utils/imageUpload.js'

const Settings = () => {
  const { role, name } = useParams()

  const [circlesData, setCirclesData] = useState([])
  const [circleData, setCircleData] = useState({})
  const [circleName, setCircleName] = useState()
  const [circleDescription, setCircleDescription] = useState('')
  const [circleImage, setCircleImage] = useState('')
  const [circleCoverImage, setCircleCoverImage] = useState('')
  const [circleDetails, setCircleDetails] = useState('')
  const [circleNameError, setCircleNameError] = useState(false)
  const [circleNameExistsError, setCircleNameExistsError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const user = GetCurrentUser()

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
  console.log('circleImage', circleImage)
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
            handleSubmit={handleSubmit}
            handleOnInputName={handleOnInputName}
            circleName={circleName}
            setCircleName={setCircleName}
            circleNameError={circleNameError}
            circleNameExistsError={circleNameExistsError}
            circleDescription={circleDescription}
            setCircleDescription={setCircleDescription}
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
          <DeleteCircle />
        </Box>
      </>
    )
  }
}

const GeneralSettings = (
  handleSubmit,
  handleOnInputName,
  circleName,
  setCircleName,
  circleNameError,
  circleNameExistsError,
  circleDescription,
  setCircleDescription,
) => {
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
          <form noValidate autoComplete="off" onSubmit={e => handleSubmit(e)}>
            <TextField
              id="outlined-basic"
              label="Circle Name"
              variant="outlined"
              fullWidth
              onInput={e => handleOnInputName(e.target.value)}
              value={circleName}
              onChange={event => setCircleName(event.target.value)}
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
              value={circleDescription}
              onChange={event => setCircleDescription(event.target.value)}
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
              <Button variant="text" type="reset">
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

const CircleDetails = ({ circleDetails, setCircleDetails }) => {
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
              value={circleDetails}
              onChange={event => setCircleDetails(event.target.value)}
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
              <Button variant="text" type="reset">
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
          setCircleData(prevData => {
            prevData.iconImage = imgUrl
            return {
              ...prevData,
              user,
            }
          })
          console.log('after icon image setup:::::: ', circleData)
          try {
            const result = await updateCircle(circleData)
            console.log('after uploading icon:::::: result', result)
            setCircleImage(imgUrl)
          } catch {
            console.log('Update Image failed!')
          }
        } catch {
          console.log('Set Image failed!')
        }
        return
      }
      try {
        setCircleData(prevData => {
          prevData.coverImage = imgUrl
          return {
            ...prevData,
            user,
          }
        })
        try {
          await updateCircle(circleData)
          setCircleCoverImage(imgUrl)
        } catch {
          console.log('Update Image failed!')
        }
      } catch (error) {}
      setCircleCoverImage(imgUrl)
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

const DeleteCircle = () => {
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
              marginTop: '30px',
            }}
          >
            <Button variant="contained" color="error">
              Delete Circle
            </Button>
          </Box>
        </Box>
      </Paper>
    </>
  )
}

export default Settings
