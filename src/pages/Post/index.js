import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AddPost from './AddPost'
import SideNavigation from '../../components/SideNavigation/SideNavigation.jsx'
import QuizIcon from '@mui/icons-material/Quiz'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import CreateIcon from '@mui/icons-material/Create'
import BarChartIcon from '@mui/icons-material/BarChart'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FilterOptions from '../../components/FilterOptions/FilterOptions.jsx'
import { Container, Paper, Typography } from '@mui/material'
import PostComponent from '../../components/Post/PostComponent'
import { readPost } from '../../services/Post'
import Loading from '../../components/Loading/Loading'
import PostPanel from '../../components/PostPanel/PostPanel'
import GetCurrentUser from '../../hooks/getCurrentUser'
// import SearchPost from './SearchPost'



const Index = () => {
  const user = GetCurrentUser();
  const [postData, setPostData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
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
  }, [])

  console.log('all posts', postData)

  const items = [
    {
      name: 'Recommended Posts',
      icon: <AutoAwesomeIcon />,
      link: 'recommended',
    },
    {
      name: 'My Posts',
      icon: <QuizIcon />,
      link: 'my',
    },
    // {
    //   name: 'My Answers',
    //   icon: <CreateIcon />,
    //   link: 'answers',
    // },
    {
      name: 'Stats',
      icon: <BarChartIcon />,
      link: 'stats',
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
                {user ? 
                <PostPanel /> : null}
                <Paper className={`p-4`}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    Search
                    {/* <SearchPost /> */}
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
                  <PostComponent data={post} />
                ))}
              </Grid>
            </Grid>

            <Grid item md={3} zeroMinWidth>
              <Grid
                item
                sx={{
                  marginBottom: '40px',
                }}
              >
                <AddPost />
              </Grid>
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

// import React, { useEffect, useState } from 'react'
// import Navbar from '../../components/Navbar/Navbar'
// import AddPost from './AddPost'
// import SideNavigation from '../../components/SideNavigation/SideNavigation.jsx'
// import QuizIcon from '@mui/icons-material/Quiz'
// import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
// import CreateIcon from '@mui/icons-material/Create'
// import BarChartIcon from '@mui/icons-material/BarChart'
// import Box from '@mui/material/Box'
// import Grid from '@mui/material/Grid'
// import FilterOptions from '../../components/FilterOptions/FilterOptions.jsx'
// import { Container, Paper, Typography } from '@mui/material'
// import PostComponent from '../../components/Post/PostComponent'
// import { readPost } from '../../services/Post'
// import Loading from '../../components/Loading/Loading'

// const Index = () => {
//   const items = [
//     {
//       name: 'Recommended Posts',
//       icon: <AutoAwesomeIcon />,
//       link: 'recommended',
//     },
//     {
//       name: 'My Posts',
//       icon: <QuizIcon />,
//       link: 'my',
//     },
//     {
//       name: 'My Answers',
//       icon: <CreateIcon />,
//       link: 'answers',
//     },
//     {
//       name: 'Stats',
//       icon: <BarChartIcon />,
//       link: 'stats',
//     },
//   ]

//   return (
//     <>
//       <Navbar />
//       <Container>
//         <Grid
//           container
//           columnSpacing={{ xs: 1, sm: 2, md: 4, lg: 6 }}
//           sx={{
//             marginTop: '50px',
//           }}
//         >
//           <Grid item md={3} zeroMinWidth>
//             <Grid
//               item
//               sx={{
//                 marginBottom: '40px',
//               }}
//             >
//               <Paper className={`p-5`}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   Posts
//                 </Typography>
//               </Paper>
//             </Grid>
//             <Grid item className={`pb-10`} zeroMinWidth>
//               <SideNavigation menuItems={items} />
//             </Grid>
//           </Grid>
//           <Grid item md={6}>
//             <Grid
//               item
//               sx={{
//                 marginBottom: '40px',
//               }}
//             >
//               <Paper className={`p-4`}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 'bold',
//                   }}
//                 >
//                   Search
//                 </Typography>
//                 <Box
//                   sx={{
//                     marginTop: '10px',
//                   }}
//                 ></Box>
//               </Paper>
//             </Grid>
//             <Grid item zeroMinWidth>
//               <PostComponent />
//               <PostComponent />
//               <PostComponent />
//             </Grid>
//           </Grid>
//           <Grid item md={3} zeroMinWidth>
//             <Grid
//               item
//               sx={{
//                 marginBottom: '40px',
//               }}
//             >
//               <AddPost />
//             </Grid>
//             <Grid item className={`pb-10`} zeroMinWidth>
//               <FilterOptions />
//             </Grid>
//           </Grid>
//         </Grid>
//       </Container>
//     </>
//   )
// }

// export default Index
