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
import CreateCircleDialog from './CreateCircleDialog'

const DiscoverCircles = () => {
  const [circleData, setCircleData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [filterOptions, setFilterOptions] = useState(['ALL'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    getAllCircles()
      .then(res => {
        setCircleData(res)
        if (filterOptions.includes('ALL')) {
          setFilterData(res)
        } else {
          setFilterData(
            res.filter(item => {
              return filterOptions.includes(item.category)
            }),
          )
        }
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
        setError(true)
        setCircleData([])
      })
  }, [filterOptions])

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleClickCategory = (category, checked) => {
    console.log('category', category)
    console.log('checked', checked)
    if (checked) {
      setFilterOptions([...filterOptions, category])
    } else {
      setFilterOptions(filterOptions.filter(item => item !== category))
    }
  }
  if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>Error</div>
  } else {
    console.log('filter', filterData)
    console.log('circle', circleData)
    console.log('filterOptions', filterOptions)

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
                    <CreateCircleDialog
                      isDialogOpened={isOpen}
                      handleCloseDialog={() => setIsOpen(false)}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<AddCircleOutlineIcon />}
                      size="small"
                      sx={{
                        color: 'black',
                        marginRight: '10px',
                      }}
                      onClick={() => handleOpen()}
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
                  <Typography variant="body1">
                    Circles you might like
                  </Typography>
                  <Box className={`flex flex-wrap gap-10 mt-5`}>
                    {filterData.length > 0 ? (
                      filterData.map(item => {
                        console.log('item', item)
                        return (
                          <Circle
                            key={item.name}
                            name={item.name}
                            iconImage={item.iconImage}
                            coverImage={item.coverImage}
                            description={item.description}
                          />
                        )
                      })
                    ) : (
                      <Typography variant="body1">
                        No circles found. Try changing your filters.
                      </Typography>
                    )}

                    {/* <Circle />
                    <Circle />
                    <Circle />
                    <Circle />
                    <Circle />
                    <Circle />
                    <Circle /> */}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </>
    )
  }
}

export default DiscoverCircles
