import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography,
  IconButton,
} from '@mui/material'
import jwt_decode from 'jwt-decode'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { assignAdmin, getCircle, removeMember } from '../../../services/Circle'
import Avatar from '@mui/material/Avatar'
import Loading from '../../../components/Loading/Loading'
import CloseIcon from '@mui/icons-material/Close'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import Tooltip from '@mui/material/Tooltip'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

const People = () => {
  const { name } = useParams()
  const [circle, setCircle] = useState({})
  const [people, setPeople] = useState([])
  const [filterPeople, setFilterPeople] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [assignAdminDialogOpen, setAssignAdminDialogOpen] = useState(false)
  const [removeMemberDialogOpen, setRemoveMemberDialogOpen] = useState(false)
  const user = jwt_decode(localStorage.getItem('token')).data

  useEffect(() => {
    getCircle(name)
      .then(res => {
        console.log(res)
        setCircle(res)
        setPeople([res.admin, ...res.members])
        setFilterPeople([res.admin, ...res.members])
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(true)
        setLoading(false)
        setPeople([])
      })
  }, [name])
  const handleSearch = value => {
    if (value === '') return setFilterPeople(people)

    setFilterPeople(
      people.filter(person =>
        person.username.toLowerCase().includes(value.toLowerCase()),
      ),
    )
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
            Admin
          </Typography>
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar alt="Remy Sharp" src="" />
            <Typography
              sx={{
                marginLeft: '20px',
                fontSize: '14px',
              }}
            >
              <strong>
                {people[0].username} {`(${people[0].email})`}
              </strong>
            </Typography>
          </Box>
        </Paper>
        <Paper className={`p-5 mt-5`}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
            }}
          >
            Members
          </Typography>
          <Box>
            <TextField
              sx={{
                marginTop: '20px',
                marginBottom: '20px',
              }}
              fullWidth
              id="outlined-basic"
              placeholder={`Search for members in ${circle.name}`}
              variant="outlined"
              onChange={e => handleSearch(e.target.value)}
            />
          </Box>
          {filterPeople.map(person => {
            if (person._id === people[0]._id) {
              return null
            }
            return (
              <Box
                sx={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar alt="Remy Sharp" src="" />
                <Typography
                  sx={{
                    marginLeft: '20px',
                    fontSize: '14px',
                  }}
                >
                  <strong>
                    {person.username}
                    {` (${person.email})`}
                  </strong>
                </Typography>
                {user._id === people[0]._id && (
                  <Box
                    sx={{
                      marginLeft: 'auto',
                      padding: '0px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Tooltip title="Assign as admin">
                      <AssignmentIndIcon
                        sx={{
                          marginLeft: '20px',
                          fontSize: '20px',
                          cursor: 'pointer',
                        }}
                        onClick={() => setAssignAdminDialogOpen(true)}
                      />
                    </Tooltip>

                    <AssignAdminDialog
                      isDialogOpened={assignAdminDialogOpen}
                      handleCloseDialog={setAssignAdminDialogOpen}
                      person={person}
                      user={user}
                      circleData={circle}
                      setPeople={setPeople}
                    />
                    <Tooltip title="Remove">
                      <CloseIcon
                        sx={{
                          marginLeft: '20px',
                          fontSize: '20px',
                          cursor: 'pointer',
                        }}
                        onClick={() => setRemoveMemberDialogOpen(true)}
                      />
                    </Tooltip>
                    <RemoveMemberDialog
                      isDialogOpened={removeMemberDialogOpen}
                      handleCloseDialog={setRemoveMemberDialogOpen}
                      person={person}
                      circleData={circle}
                      user={user}
                    />
                  </Box>
                )}
              </Box>
            )
          })}
          {filterPeople.length === 0 && (
            <Typography
              sx={{
                marginTop: '20px',
                fontSize: '14px',
              }}
            >
              No members found.
            </Typography>
          )}
        </Paper>
      </>
    )
  }
}

function AssignAdminDialog({
  isDialogOpened,
  handleCloseDialog,
  person,
  user,
  circleData,
  setPeople,
}) {
  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')
  const handleClose = () => {
    handleCloseDialog(false)
  }
  console.log('person assign dialog:::::::::::', person)
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await assignAdmin({
        name: circleData.name,
        admin: circleData.admin,
        newAdmin: person,
        user,
      })
      window.location.replace(`/circle/${circleData.name}`)
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
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
              }}
            >
              Are you sure?
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
              The following member will be promoted to the admin role
            </Typography>
            <Box
              sx={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                outline: '1px solid #e0e0e0',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <Avatar alt="Remy Sharp" src="" />
              <Typography
                sx={{
                  marginLeft: '20px',
                  fontSize: '14px',
                }}
              >
                <strong>
                  {person.username}
                  {` (${person.email})`}
                </strong>
              </Typography>
            </Box>
            <Box
              sx={{
                marginTop: '25px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
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
                  You will be demoted to the member role
                </Typography>
              </Box>
            </Box>
          </Box>
        </DialogContent>
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

function RemoveMemberDialog({
  isDialogOpened,
  handleCloseDialog,
  person,
  user,
  circleData,
  setPeople,
}) {
  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')
  const handleClose = () => {
    handleCloseDialog(false)
  }
  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await removeMember({
        name: circleData.name,
        admin: circleData.admin,
        removeUser: person,
        user,
      })
      setPeople(prev => prev.filter(p => p.id !== person.id))
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
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
              }}
            >{`Removing 1 member from ${circleData.name}`}</Typography>
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
              The following member will be removed:
            </Typography>
            <Box
              sx={{
                marginTop: '20px',
                display: 'flex',
                alignItems: 'center',
                outline: '1px solid #e0e0e0',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <Avatar alt="Remy Sharp" src="" />
              <Typography
                sx={{
                  marginLeft: '20px',
                  fontSize: '14px',
                }}
              >
                <strong>
                  {person.username}
                  {` (${person.email})`}
                </strong>
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
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
            Remove Member
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default People
