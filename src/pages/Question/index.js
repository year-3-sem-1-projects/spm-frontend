import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AddQuestion from './AddQuestion'
import SideNavigation from '../../components/SideNavigation/SideNavigation.jsx'
import QuizIcon from '@mui/icons-material/Quiz';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CreateIcon from '@mui/icons-material/Create';
import BarChartIcon from '@mui/icons-material/BarChart';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FilterOptions from '../../components/FilterOptions/FilterOptions.jsx'
import { Container, Paper, Typography } from '@mui/material'
import QuestionComponent from '../../components/Question/QuestionComponent';


const index = () => {

  const items = [
    {
      name: 'Recommended Questions',
      icon: <AutoAwesomeIcon />,
      link: 'recommended'
    },
    {
      name: 'My Questions',
      icon: <QuizIcon />,
      link: 'my'
    },
    {
      name: 'My Answers',
      icon: <CreateIcon />,
      link: 'answers'
    },
    {
      name: 'Stats',
      icon: <BarChartIcon />,
      link: 'stats'
    }
  ]

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
                    Questions & Answers
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
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  >
                    Search Bar
                  </Typography>
                  <Box
                    sx={{
                      marginTop: '10px',
                    }}
                  >
                  </Box>
                </Paper>
              </Grid>
              <Grid item zeroMinWidth>
                <QuestionComponent  data={{question: "What is the difference between a method and a function in OOP?", category: "Technology", answerCount: 7}}/>
              </Grid>
            </Grid>
            <Grid item md={3} zeroMinWidth>
              <Grid
                item
                sx={{
                  marginBottom: '40px',
                }}
              >
                <AddQuestion />
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

export default index
