import { Box, Paper, TextField, Typography } from '@mui/material'
import jwt_decode from 'jwt-decode'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCircle } from '../../../services/Circle'
import Avatar from '@mui/material/Avatar'
import Loading from '../../../components/Loading/Loading'
import CloseIcon from '@mui/icons-material/Close'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import Tooltip from '@mui/material/Tooltip'

const People = () => {
  const { name } = useParams()
  const [circle, setCircle] = useState({})
  const [people, setPeople] = useState([])
  const [filterPeople, setFilterPeople] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const user = jwt_decode(localStorage.getItem('token')).data

  useEffect(() => {
    getCircle(name)
      .then(res => {
        console.log(res)
        setCircle(res)
        setPeople([res.admin, ...res.members])
        setFilterPeople([res.admin, ...res.members])
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(true)
        setLoading(false)
        setPeople([])
      })
  }, [name])

  if (loading) {
    return <Loading loading={loading} />
  } else if (error) {
    return <div>Error</div>
  } else {
    return (
      <>
        <Paper className={`p-5`}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
            }}
          >
            Admin
          </Typography>
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar alt="Remy Sharp" src="" />
            <Typography
              sx={{
                marginLeft: '20px',
                fontSize: '14px',
              }}
            >
              <strong>
                {people[0].username} {`(${people[0].email})`}
              </strong>
            </Typography>
          </Box>
        </Paper>
        <Paper className={`p-5 mt-5`}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
            }}
          >
            Members
          </Typography>

          {filterPeople.map(person => {
            if (person._id === people[0]._id) {
              return null
            }
            return (
              <Box
                sx={{
                  marginTop: '20px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Avatar alt="Remy Sharp" src="" />
                <Typography
                  sx={{
                    marginLeft: '20px',
                    fontSize: '14px',
                  }}
                >
                  <strong>
                    {person.username}
                    {` (${person.email})`}
                  </strong>
                </Typography>
                {user._id === people[0]._id && (
                  <Box
                    sx={{
                      marginLeft: 'auto',
                      padding: '0px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <Tooltip title="Assign as admin">
                      <AssignmentIndIcon
                        sx={{
                          marginLeft: '20px',
                          fontSize: '20px',
                          cursor: 'pointer',
                        }}
                        onclick={() => {}}
                      />
                    </Tooltip>
                    <Tooltip title="Remove">
                      <CloseIcon
                        sx={{
                          marginLeft: '20px',
                          fontSize: '20px',
                          cursor: 'pointer',
                        }}
                      />
                    </Tooltip>
                  </Box>
                )}
              </Box>
            )
          })}
          {filterPeople.length === 0 && (
            <Typography
              sx={{
                marginTop: '20px',
                fontSize: '14px',
              }}
            >
              No members found.
            </Typography>
          )}
        </Paper>
      </>
    )
  }
}

export default People
