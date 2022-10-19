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

import Loading from '../../../components/Loading/Loading'

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
  }, [name])
  console.log('settingsJS')
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
}

export default Settings
