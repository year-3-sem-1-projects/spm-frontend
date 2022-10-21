import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { getCircle, leaveCircle } from '../../../services/Circle'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import CloseIcon from '@mui/icons-material/Close'
import Loading from '../../../components/Loading/Loading'

const LeaveCircle = () => {
  const { role, name } = useParams()
  const [isOpen, setIsOpen] = useState(false)
  const [circleData, setCircleData] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const user = jwt_decode(localStorage.getItem('token')).data

  useEffect(() => {
    getCircle(name)
      .then(data => {
        setCircleData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(true)
        setLoading(false)
        setCircleData({})
      })
  }, [name])

  const handleOpen = () => {
    setIsOpen(!isOpen)
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
            Leave {name}
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
              Remove this Circle from your followed Circles
            </Typography>
          </Box>
          {role === 'admin' ? (
            <Box
              sx={{
                marginTop: '25px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ErrorOutlineIcon />
                <Typography
                  sx={{
                    fontSize: '15px',
                    fontWeight: 'bold',
                    marginLeft: '5px',
                    marginTop: '2px',
                  }}
                >
                  Assign a member as admin before leaving.
                </Typography>
              </Box>
            </Box>
          ) : null}
          <Box
            sx={{
              marginTop: '20px',
              position: 'relative',
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={handleOpen}
              disabled={role === 'admin'}
            >
              Leave Circle
            </Button>
            <LeaveCircleDialog
              isDialogOpened={isOpen}
              handleCloseDialog={() => setIsOpen(false)}
              circleData={circleData}
              user={user}
            />
          </Box>
        </Paper>
      </>
    )
  }
}

function LeaveCircleDialog({
  isDialogOpened,
  handleCloseDialog,
  circleData,
  user,
}) {
  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')
  const handleClose = () => {
    handleCloseDialog(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await leaveCircle({
        name: circleData.name,
        admin: circleData.admin,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      })
      window.location.replace(`/circle`)
    } catch {}
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
            <Typography variant="h6">
              Are you sure you want to leave <strong>{circleData.name}</strong>?
            </Typography>
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
        <DialogActions>
          <Button
            sx={{
              padding: '10px 20px',
              margin: '0 14px',
              textTransform: 'initial',
            }}
            onClick={handleClose}
            variant="outlined"
          >
            Cancel
          </Button>
          <Button
            sx={{
              padding: '10px 20px',
              margin: '0 14px',
              textTransform: 'initial',
            }}
            color="error"
            onClick={handleSubmit}
            variant="contained"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default LeaveCircle
