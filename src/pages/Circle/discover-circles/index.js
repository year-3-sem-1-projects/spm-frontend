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
import React, { useState, useEffect } from 'react'
import Circle from './Circle'
import { TEST_STYLE } from './Circle'
import FilterOptions from '../../../components/FilterOptions/FilterOptions'
import { getAllCircles } from '../../../services/Circle'

const DiscoverCircles = () => {
  const [circleData, setCircleData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [filterOptions, setFilterOptions] = useState(['ALL'])

  useEffect(() => {
    getAllCircles()
  }, [circleData])

  const handleClickCategory = (category, checked) => {
    if (checked) {
      setFilterOptions([...filterOptions, category])
    } else {
      setFilterOptions(filterOptions.filter(item => item !== category))
    }

    if ('ALL' in filterOptions) {
      setFilterData(circleData)
    } else {
      if (filterOptions.length === 0) {
        setFilterData([])
      } else {
        setFilterData(
          circleData.filter(item => filterOptions.includes(item.category)),
        )
      }
    }
  }
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
            <FilterOptions handleClick={handleClickCategory} />
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
                  {filterData.length > 0 ? (
                    filterData.map(item => (
                      <Circle
                        key={item.name}
                        name={item.name}
                        iconImage={item.iconImage}
                        coverImage={item.coverImage}
                        description={item.description}
                      />
                    ))
                  ) : (
                    <Typography variant="body1">
                      No circles found. Try changing your filters.
                    </Typography>
                  )}

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
