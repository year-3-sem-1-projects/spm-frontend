import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import SideNavigation from '../../../components/SideNavigation/SideNavigation.jsx'
import SettingsIcon from '@mui/icons-material/Settings'
import GroupsIcon from '@mui/icons-material/Groups'
import DonutSmallIcon from '@mui/icons-material/DonutSmall'
import LogoutIcon from '@mui/icons-material/Logout'
import { useParams } from 'react-router-dom'
import SecurityIcon from '@mui/icons-material/Security'
import GetCurrentUser from '../../../hooks/getCurrentUser.js'
import {
  getAllCircles,
  getCircle,
  updateCircle,
} from '../../../services/Circle.js'
import { useEffect } from 'react'

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
  // const circleData = getCircle(name)

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
        setCircleImage(data.image)
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
  }, [])

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

  const items = [
    {
      name: 'Settings',
      icon: <SettingsIcon />,
      link: 'settings',
    },
    {
      name: 'People',
      icon: <GroupsIcon />,
      link: 'members',
    },
    {
      name: 'Stats',
      icon: <DonutSmallIcon />,
      link: 'stats',
    },
    {
      name: 'Leave Circle',
      icon: <LogoutIcon />,
      link: 'leave',
    },
  ]

  return (
    <>
      <Box>
        <Paper
          elevation={0}
          sx={{
            // width: '100vw',
            p: 2,
            backgroundColor: '#F5F5F5',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              marginLeft: '15vw',
            }}
          >
            {circleData.name}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<SecurityIcon />}
            sx={{
              position: 'absolute',
              right: '24rem',
              backgroundColor: '#fff',
              color: '#000',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '20px',
              boxShadow: '0px 0px 10px rgba(0,0,0,0.5)',
              '&:hover': {
                backgroundColor: '#000',
                color: '#fff',
              },
            }}
            onClick={event => console.log(event.currentTarget)}
          >
            {role}
          </Button>
        </Paper>
      </Box>
      <Container>
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 4, lg: 6 }}
          sx={{
            marginTop: '50px',
          }}
        >
          <Grid item md={3} zeroMinWidth>
            <Grid
              item
              sx={{
                marginBottom: '40px',
              }}
            >
              <Paper className={`p-5`}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {`${
                    role.substring(0, 1).toUpperCase() + role.substring(1)
                  } Dashboard`}
                </Typography>
              </Paper>
            </Grid>
            <Grid item className={`pb-10`} zeroMinWidth>
              <SideNavigation menuItems={items} />
            </Grid>
          </Grid>
          <Grid item md={6}>
            <Grid
              item
              sx={{
                marginBottom: '40px',
              }}
            >
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
                      onChange={event =>
                        setCircleDescription(event.target.value)
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
            </Grid>
            {/* <Grid item zeroMinWidth>
              <Paper className={`p-5`}>
                <Typography variant="h5">Center</Typography>
              </Paper>
            </Grid>
            <Grid item zeroMinWidth>
              <Paper className={`p-5`}>
                <Typography variant="h5">Center</Typography>
              </Paper>
            </Grid>
            <Grid item zeroMinWidth>
              <Paper className={`p-5`}>
                <Typography variant="h5">Center</Typography>
              </Paper> 
            </Grid>*/}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Settings
