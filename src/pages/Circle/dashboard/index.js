import React from 'react'
import { Route, Routes, useParams } from 'react-router-dom'
import Settings from './settings'
import People from './people'
import Stats from './stats'
import Leave from './leave'
import SideNavigation from '../../../components/SideNavigation/SideNavigation.jsx'
import SettingsIcon from '@mui/icons-material/Settings'
import GroupsIcon from '@mui/icons-material/Groups'
import DonutSmallIcon from '@mui/icons-material/DonutSmall'
import LogoutIcon from '@mui/icons-material/Logout'
import SecurityIcon from '@mui/icons-material/Security'
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material'

const Dashboard = () => {
  const { role, name } = useParams()
  const BASE_PATH = `/circle/${name}/${role}/dashboard`

  const items = [
    {
      name: 'Settings',
      icon: <SettingsIcon />,
      link: `${BASE_PATH}/settings`,
    },
    {
      name: 'People',
      icon: <GroupsIcon />,
      link: `${BASE_PATH}/people`,
    },
    {
      name: 'Stats',
      icon: <DonutSmallIcon />,
      link: `${BASE_PATH}/stats`,
    },
    {
      name: 'Leave Circle',
      icon: <LogoutIcon />,
      link: `${BASE_PATH}/leave`,
    },
  ]

  // if (role === 'admin') {
  return (
    <>
      <Box>
        <TopBar name={name} role={role} />
      </Box>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/people" element={<People />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/leave" element={<Leave />} />
      </Routes>
    </>
  )
}

const TopBar = ({ name, role }) => {
  return (
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
        {name}
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
  )
}

// <Container>
//   <Grid
//     container
//     columnSpacing={{ xs: 1, sm: 2, md: 4, lg: 6 }}
//     sx={{
//       marginTop: '50px',
//     }}
//   >
//     <Grid item md={3} zeroMinWidth>
//       <Grid
//         item
//         sx={{
//           marginBottom: '40px',
//         }}
//       >
//         <Paper className={`p-5`}>
//           <Typography
//             variant="h6"
//             sx={{
//               fontWeight: 'bold',
//             }}
//           >
//             {`${
//               role.substring(0, 1).toUpperCase() + role.substring(1)
//             } Dashboard`}
//           </Typography>
//         </Paper>
//       </Grid>
//       <Grid item className={`pb-10`} zeroMinWidth>
//         <SideNavigation items={items} />
//       </Grid>
//     </Grid>
//     <Grid item md={6}>
//       <Grid
//         item
//         sx={{
//           marginBottom: '40px',
//         }}
//       >
//         Settings
//       </Grid>
//     </Grid>
//   </Grid>
// </Container>

export default Dashboard
