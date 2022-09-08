import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import React from 'react'
import Circle from './Circle'
import { TEST_STYLE } from './Circle'
const Categories = [
  'Technology',
  'Science',
  'Art & Design',
  'Crypto',
  'Health & Fitness',
  'Finance & Business',
]

const DiscoverCircles = () => {
  return (
    <>
      <Container>
        <Grid
          container
          columnSpacing={6}
          sx={{
            marginTop: '50px',
          }}
        >
          <Grid item md={3}>
            <Paper className={`p-5`} elevation={3}>
              <Typography
                variant="h5"
                className={`pb-3`}
                sx={{
                  fontWeight: 'bold',
                }}
              >
                Categories
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={`All Categories`}
                  onChange={e =>
                    console.log(`All Categories`, e.target.checked)
                  }
                  sx={{
                    color: 'black',
                  }}
                />
                {Categories.map(category => (
                  <FormControlLabel
                    control={<Checkbox />}
                    label={category}
                    onChange={e => console.log(category, e.target.checked)}
                    sx={{
                      color: 'black',
                    }}
                  />
                ))}
              </FormGroup>
            </Paper>
          </Grid>
          <Grid item md={9}>
            <Grid
              item
              sx={{
                marginBottom: '40px',
              }}
            >
              <Paper className={`p-5`} elevation={3}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  Create Circle
                </Typography>
                <Box
                  sx={{
                    marginTop: '10px',
                  }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}
                    size="small"
                    sx={{
                      color: 'black',
                      marginRight: '10px',
                    }}
                  >
                    Create Circle
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<ExploreOutlinedIcon />}
                    size="small"
                    sx={{
                      color: 'black',
                      marginRight: '10px',
                    }}
                    href="#discover-circles"
                  >
                    Discover Circles
                  </Button>
                </Box>
              </Paper>
            </Grid>
            <Grid item className={`pb-10`}>
              <Paper className={`p-5 pt-5`} elevation={3}>
                <Typography
                  id="discover-circles"
                  variant="h5"
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  Discover Circles
                </Typography>
                <Typography variant="body1">Circles you might like</Typography>
                <Box className={`flex flex-wrap gap-10 mt-5`}>
                  <Circle />
                  <Circle />
                  <Circle />
                  <Circle />
                  <Circle />
                  <Circle />
                  <Circle />
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default DiscoverCircles
