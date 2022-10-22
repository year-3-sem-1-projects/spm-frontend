import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getCircle, joinCircle } from '../../../services/Circle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import { PLACEHOLDER } from '../discover-circles/Circle'
import { Avatar, Container, Divider, Grid, Paper } from '@mui/material'
import Loading from '../../../components/Loading/Loading'
import Popover from './Popover'
import SecurityIcon from '@mui/icons-material/Security'
import PersonIcon from '@mui/icons-material/Person'
import AddBoxIcon from '@mui/icons-material/AddBox'
import jwt_decode from 'jwt-decode'
import { DEFAULT_COVER_IMAGE, EMPTY_BOX } from '../../../constants/circle'
const roles = {
  admin: <SecurityIcon />,
  member: <PersonIcon />,
  follow: <AddBoxIcon />,
}

const Profile = () => {
  const { name } = useParams()
  // const [user, setUser] = useState(null)
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [role, setRole] = useState('Follow')

  const user = jwt_decode(localStorage.getItem('token')).data
  useEffect(() => {
    getCircle(name)
      .then(data => {
        setProfile(data)
        if (data.admin.email === user.email) setRole('Admin')
        else if (data.members.find(member => member.email === user.email))
          setRole('Member')
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setError(true)
        setLoading(false)
        setProfile({})
      })
  }, [name, role])

  const handleClose = () => {
    setAnchorEl(null)
  }

  if (loading) {
    return <Loading loading={loading} />
  } else if (error) {
    return <div>Error</div>
  } else {
    // checkMemberValidity()
    console.log('profile ::::::::::::', role)
    return (
      <>
        <Box
          sx={{
            position: 'absolute',
            display: 'block',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '100vw',
            borderBottom: '2px solid #e0e0e0',
          }}
        >
          <MediaCard profile={profile} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'block',
                position: 'absolute',
                top: '80%',
                left: '26%',
                color: '#fff',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  textShadow: '0px 0px 10px rgba(0,0,0,1)',
                }}
              >
                {profile.name}
              </Typography>
              <Typography
                variant="body1"
                color="#E4E3E0"
                sx={{
                  textShadow: '0px 0px 10px rgba(0,0,0,1)',
                }}
              >
                {profile.description}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'block',
                position: 'absolute',
                top: '85%',
                right: '26%',
              }}
            >
              <AuthButton
                role={role}
                setRole={setRole}
                user={user}
                setAnchorEl={setAnchorEl}
                handleClose={handleClose}
                name={profile.name}
                anchorEl={anchorEl}
              />

              {/* {user.email === profile.admin.email ? (
                <AuthButton
                  role={'Admin'}
                  setAnchorEl={setAnchorEl}
                  handleClose={handleClose}
                  name={profile.name}
                  anchorEl={anchorEl}
                />
              ) : checkMemberValidity() ? (
                <AuthButton
                  role={'Member'}
                  setAnchorEl={setAnchorEl}
                  handleClose={handleClose}
                  name={profile.name}
                  anchorEl={anchorEl}
                />
              ) : (
                <AuthButton role={'Follow'} />
              )} */}
            </Box>
          </Box>
          <Box
            sx={{
              position: 'absolute',
              width: '70vw',
              marginLeft: '15vw',
              marginTop: '3vh',
            }}
          >
            <Grid
              container
              spacing={4}
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <Grid item sm={8}>
                <Paper
                  sx={{
                    padding: '2rem',
                    margin: '1rem 0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {`Welcome to ${profile.name}`}
                  </Typography>
                  <img src={EMPTY_BOX} alt="no content to display" srcset="" />
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Circle is empty.
                  </Typography>
                  <Typography variant="body1">
                    There are no posts or questions in the Circle yet.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item sm={4}>
                <Paper
                  sx={{
                    padding: '1rem',
                    margin: '1rem 0',
                    borderRadius: '1rem',
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Details
                  </Typography>
                  <Divider sx={{ marginTop: '1rem' }} />
                  <Typography variant="body1" sx={{ marginTop: '1rem' }}>
                    {profile?.details || 'No details yet.'}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </>
    )
  }
}

function AuthButton({
  role,
  user,
  setRole,
  setAnchorEl,
  anchorEl,
  handleClose,
  name,
}) {
  console.log('authbutton ::::::::::::', role)
  const handleFollow = async () => {
    try {
      await joinCircle({
        name,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      })
      setRole('Member')
    } catch (error) {}
  }
  return role === 'Follow' ? (
    <Button
      variant="outlined"
      startIcon={roles.follow}
      sx={{
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
      onClick={handleFollow}
    >
      {role}
    </Button>
  ) : (
    <>
      <Button
        variant="outlined"
        startIcon={roles[role.toLowerCase()]}
        sx={{
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
        onClick={event => setAnchorEl(event.currentTarget)}
      >
        {role}
      </Button>
      <Popover
        anchorEl={anchorEl}
        content={`Go to ${role} Dashboard`}
        handleClose={handleClose}
        className={`cursor-pointer`}
        name={name}
        role={role}
      />
    </>
  )
}

function MediaCard({ profile }) {
  return (
    <>
      <Card sx={{ maxWidth: '100vw' }}>
        <CardMedia
          component="img"
          image={profile?.coverImage || DEFAULT_COVER_IMAGE}
          alt="circle cover image"
          className="blur-md"
          sx={{
            objectFit: 'cover',
            objectPosition: 'center',
            height: '55vh',
            width: '100vw',
            maxHeight: '100vh',
            maxWidth: '100vw',
            filter: 'brightness(0.5) blur(5px)',
          }}
        />

        <CardMedia
          component="img"
          image={profile?.coverImage || DEFAULT_COVER_IMAGE}
          alt="circle cover image"
          sx={{
            position: 'absolute',
            top: '0%',
            left: '25%',
            objectFit: 'cover',
            objectPosition: 'center',
            height: '35vh',
            width: '75vw',
            maxHeight: '50vh',
            maxWidth: '50vw',
            borderRadius: '2%',
          }}
        />
      </Card>
      <Avatar
        alt={profile.name}
        src={profile.iconImage}
        sx={{
          width: 150,
          height: 150,
          position: 'absolute',
          top: '35%',
          left: '27%',
          // transform: 'translate(-180%, -80%)',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)',
          borderRadius: '12%',
        }}
        variant="square"
      />
    </>
  )
}

export default Profile
