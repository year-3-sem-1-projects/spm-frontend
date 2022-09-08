import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { Avatar, Box, IconButton, Tooltip, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'


const StyledMenu = styled(props => (
  
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light'
        ? 'rgb(55, 65, 81)'
        : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}))


export default function CustomizedMenus({
  USER,
  settings,
  settingList,
  handleCloseUserMenu,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.reload()
    navigate('/')
  }

  return (    
    <Box sx={[{ display: { ms: 'none', md: 'block' } }]}>
      {localStorage.getItem('token') ? 
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        <Tooltip title="Open settings">
          <Box
            sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}
          >
            {localStorage.getItem('token') ? 
            <IconButton sx={{ p: 0, marginRight: '20px' }} disableRipple>
               <Avatar alt={USER.username} src={USER.image} /> 
            </IconButton> : null}
            {localStorage.getItem('token') ? 
            <Typography
              variant="h7"
              noWrap
              component="a"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 500,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '13px',
              }}
            >
              {USER.username}
            </Typography> : null}
          </Box>
        </Tooltip>
      </Button> : null}
      {localStorage.getItem('token') ? 
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {settings.map(setting => (
          // <Link to={`/${setting}`}>
            <MenuItem
              sx={{
                flexGrow: 1,
                // padding: '10px 50px',
                // transform: 'translateX(-20%)',
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
      </StyledMenu> : null}
    </Box>
  )
}
