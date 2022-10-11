import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import AdbIcon from '@mui/icons-material/Adb'
import HomeIcon from '@mui/icons-material/Home'
import QuizIcon from '@mui/icons-material/Quiz'
import GroupIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import LogoutIcon from '@mui/icons-material/Logout'
import { Link } from 'react-router-dom'
import SearchAppBar from '../Searchbar/SearchBar'
import CustomizedMenus from './CustomMenu'
import { useEffect, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'


const ICON_SIZE = 'medium'
const pages = ['', 'Question/recommended', 'Circle']
const pageList = {
  '/': <HomeIcon fontSize={ICON_SIZE} />,
  '/Question/recommended': <QuizIcon fontSize={ICON_SIZE} />,
  '/Circle': <GroupIcon fontSize={ICON_SIZE} />,
}
const settings = ['Profile', 'Logout']
const settingList = {
  '/Profile': <PersonIcon />,
  '/Logout': <LogoutIcon />,
}

const LOGO = 'Edupox'

const unregisteredUser = {
  id: '001',
  username: 'Toshinori Yagi',
  image: 'https://i.redd.it/8lczu2vop1911.jpg',
}


const ResponsiveAppBar = () => {

  const navigate = useNavigate()
  
  const currentUser = localStorage.getItem('token')
  const [USER, setUSER] = useState(unregisteredUser)
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  useEffect(() => {
    if (currentUser) {
      const decodedToken = jwt_decode(currentUser)
      setUSER(decodedToken.data)
    } else {
      setUSER(unregisteredUser)
    }
  }, [currentUser])
  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    
    localStorage.removeItem('token')
    window.location.reload()
    navigate('/')
  }
  // const handleProfile = () => {
  //   // const id = localStorage.getItem('token')._id
  //   console.log(jwt_decode(localStorage.getItem('token')))

  //   // navigate('/user')
  // }
  return (
    <AppBar position="sticky" 
      sx={{
        backgroundColor: '#1d2228',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={[
              {
                width: '100%',
                display: {
                  xs: 'flex',
                  md: 'flex',
                },
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            {/* LOGO for big screens*/}
            <Box
              sx={[
                {
                  display: { xs: 'none', md: 'flex' },
                },
              ]}
            >
              <Link to="/">
                <AdbIcon sx={{}} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  {LOGO}
                </Typography>
              </Link>
            </Box>

            {/* search bar for big screens*/}
            <Box
              sx={[
                {
                  display: { xs: 'none', md: 'flex' },
                },
              ]}
            >
              <SearchAppBar />
            </Box>
            {/* menu for big screens*/}
            <Box
              sx={[
                {
                  display: { xs: 'none', md: 'flex' },
                },
              ]}
            >
              {pages.map(page => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={[
                    {
                      my: 2,
                      color: 'white',
                      display: 'block',
                      marginLeft: '60px',
                    },
                  ]}
                >
                  
                  <Link style={{ width: '100%' }} to={`/${page}`}>
                    {pageList[`/${page}`]}
                  </Link>
                </Button>
              ))}
            </Box>
            {/* user for big screen*/}
            <Box sx={[{ display: { xs: 'none', md: 'flex' } , backgroundColor: '#ff9f055d'}]}>
              <CustomizedMenus
                USER={USER}
                settings={settings}
                settingList={settingList}
                handleCloseUserMenu={handleCloseUserMenu}
              />
            </Box>

            {/* menu for small screens*/}
            <Box sx={[{ display: { xs: 'flex', md: 'none' } }]}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, index) => (
                  <Link to={`/${page}`}>
                    <MenuItem key={index} onClick={handleCloseNavMenu} sx={{}}>
                      <Typography
                        textAlign="center"
                        sx={{ paddingRight: '10px' }}
                      >
                        {pageList[`/${page}`]}
                      </Typography>
                      <Typography textAlign="center">
                        {page === '' ? 'Home' : `${page}`}
                      </Typography>
                    </MenuItem>
                  </Link>
                ))}
              </Menu>
            </Box>

            {/* LOGO for small screens */}
            <Box
              sx={[
                {
                  display: { xs: 'flex', md: 'none' },
                },
              ]}
            >
              <Link to="/">
                <AdbIcon sx={{}} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  {LOGO}
                </Typography>
              </Link>
            </Box>
            {/* user for small screens */}
            <Box sx={[{ display: { xs: 'flex', md: 'none' } }]}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, marginRight: '20px' }}
                >{localStorage.getItem('token') ? 
                  <Avatar alt={USER.username} src={USER.image} /> : null}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{
                  mt: '45px',
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map(setting => (
                  // <Link to={`/${setting}`}>
                    <MenuItem
                      sx={{
                        padding: '10px 10px 10px 10px',
                      }}
                      key={setting}
                      onClick={handleCloseUserMenu}
                    >
                      <Typography textAlign="center">
                        {settingList[`/${setting}`]}
                      </Typography>
                      <Typography onClick={handleLogout} textAlign="center">{setting}</Typography>
                    </MenuItem>
                  // </Link>
                ))}
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
