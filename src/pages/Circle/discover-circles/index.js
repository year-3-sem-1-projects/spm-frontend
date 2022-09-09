import {
  Avatar,
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
import Loading from '../../../components/Loading/Loading'
import { Link } from 'react-router-dom'

const DiscoverCircles = () => {
  const USER_EMAIL = localStorage.getItem('email')
  const [circleData, setCircleData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [filterOptions, setFilterOptions] = useState(['ALL'])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [follow, setFollow] = useState([])

  useEffect(() => {
    getAllCircles()
      .then(res => {
        setCircleData(res)
        setFollow(
          res.filter(circle => {
            if (circle.admin === USER_EMAIL) return true
            if (circle.members) {
              const member = circle.members.find(
                member => member.email === USER_EMAIL,
              )

              if (member) {
                return true
              }
            }
            return null
          }),
        )
        if (filterOptions.includes('ALL')) {
          setFilterData(
            res.filter(circle => {
              if (circle.admin === USER_EMAIL)
                return circle.admin !== USER_EMAIL
              if (circle.members) {
                const member = circle.members.find(
                  member => member.email === USER_EMAIL,
                )
                console.log('member', member)
                if (member) {
                  return null
                }
              }
              return circle
            }),
          )
        } else {
          setFilterData(
            res
              .filter(item => {
                return filterOptions.includes(item.category)
              })
              .filter(circle => {
                if (circle.admin === USER_EMAIL)
                  return circle.admin !== USER_EMAIL
                if (circle.members) {
                  const member = circle.members.find(
                    member => member.email === USER_EMAIL,
                  )
                  console.log('member', member)
                  if (member) {
                    return null
                  }
                }
                return circle
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
    const discoveryCircles = res => {}
  }, [filterOptions])

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
    return <Loading loading={loading} />
  } else if (error) {
    return <div>Error</div>
  } else {
    console.log('followData', follow)
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
                  <Box>
                    {follow.map(circle => (
                      <Link to={`/circle/${circle.name}`}>
                        <Paper
                          className={`flex items-center my-2`}
                          elevation={1}
                        >
                          <Avatar
                            alt={circle.name}
                            src={circle.iconImage}
                            sx={[
                              {
                                width: 30,
                                height: 30,
                                marginRight: '10px',
                              },
                            ]}
                            variant="square"
                          />
                          <Typography variant="body1">{circle.name}</Typography>
                        </Paper>
                      </Link>
                    ))}
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
