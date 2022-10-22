import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'

import SideNavigation from '../../components/SideNavigation/SideNavigation.jsx'
import QuizIcon from '@mui/icons-material/Quiz'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CreateIcon from '@mui/icons-material/Create'
import BarChartIcon from '@mui/icons-material/BarChart'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FilterOptions from '../../components/FilterOptions/FilterOptions'
import { Container, Paper, Typography } from '@mui/material'
import MyPost from '../../components/Post/MyPost'
import { readPost } from '../../services/Post'
import Loading from '../../components/Loading/Loading'
import PostPanel from '../../components/PostPanel/PostPanel'
import GetCurrentUser from '../../hooks/getCurrentUser'
import SearchAppBar from '../../components/Searchbar/SearchBar'

const Index = () => {
  const currentUser = GetCurrentUser()
  const [postData, setPostData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    console.log('currentUser', currentUser)
    if (currentUser !== undefined) {
      readPost()
        .then(res => {
          setPostData(res)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setError(true)
          setLoading(false)
          setPostData([])
        })
    }
  }, [currentUser])

  console.log('all posts', postData)

  const items = [
    {
      name: 'Recommended Posts',
      icon: <AutoAwesomeIcon />,
      link: '/',
    },
    {
      name: 'My Posts',
      icon: <QuizIcon />,
      link: '/myposts',
    },
    // {
    //   name: 'My Answers',
    //   icon: <CreateIcon />,
    //   link: 'answers',
    // },
    {
      name: 'Stats',
      icon: <BarChartIcon />,
      link: '/stats',
    },
  ]

  if (loading) {
    return <Loading loading={loading} />
  } else if (error) {
    return <div>Error</div>
  } else {
    return (
      <>
        <Navbar />
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
                    Posts
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
                {currentUser ? <PostPanel /> : null}
                <Paper className={`p-4`}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    <SearchAppBar />
                  </Typography>
                  <Box
                    sx={{
                      marginTop: '10px',
                    }}
                  ></Box>
                </Paper>
              </Grid>
              <Grid item zeroMinWidth>
                {postData?.map(post => (
                  <MyPost data={post} />
                ))}
              </Grid>
            </Grid>

            <Grid item md={3} zeroMinWidth>
              <Grid item className={`pb-10`} zeroMinWidth>
                <FilterOptions />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </>
    )
  }
}

export default Index
