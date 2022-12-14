import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Chip from '@mui/material/Chip'
import Button from '@mui/material/Button'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { ListItemIcon, ListItemText } from '@mui/material'
import EditQuestionDialog from './EditQuestionDialog'
import DeleteQuestionDialog from './DeleteQuestionDialog'
import AddAnswer from '../../pages/Question/AddAnswer'
// import GetCurrentUser from '../../hooks/getCurrentUser';
import jwt_decode from 'jwt-decode'
import { Link } from 'react-router-dom'
import { getAnswersByQuestion } from '../../services/Question'

export default function QuestionComponent({ data, setQuestionData, setFilterData }) {
  
  // const currentUser = GetCurrentUser()
  const currentUser = jwt_decode(localStorage.getItem('token')).data
  const [answerCount, setAnswerCount] = useState([])

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
useEffect(() => {
    getAnswersByQuestion(data._id)
      .then((res) => {
        console.log('answer count in question component', res)
        setAnswerCount(res.length)
        console.log('answer count in question component', answerCount)
      })
      .catch((err) => console.log(err))
  }, [data._id, answerCount])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    setAnchorEl(null)
    setIsEditOpen(!isEditOpen)
  }

  const handleDelete = () => {
    console.log('handle delete called')
    setAnchorEl(null)
    setIsDeleteOpen(!isDeleteOpen)
  }

  const handleAnswerCount = () => {
    if (answerCount > 1) {
      return `${answerCount} Answers`
    } else if (answerCount === 1) {
      return `${answerCount} Answer`
    } else {
      return 'Not Yet Answered'
    }
  }
  console.log('currentUseremail: ')
  return (
    <>
      <DeleteQuestionDialog
        deleteData={data}
        isDeleteDialogOpen={isDeleteOpen}
        handleCloseDeleteDialog={setIsDeleteOpen}
        setQuestionData={setQuestionData}
        setFilterData={setFilterData}
      />
      <EditQuestionDialog
        editData={data}
        isEditDialogOpen={isEditOpen}
        handleCloseEditDialog={handleEdit}
        setQuestionData={setQuestionData}
        setFilterData={setFilterData}
      />
      {/* Question component card */}
      <Box
        sx={{
          marginBottom: 2,
        }}
      >
        <Card elevation={2}>
          <CardContent>
            {currentUser.email === data.user_email ? (
              <MoreHorizIcon
                sx={{
                  float: 'right',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
                onClick={handleClick}
              />
            ) : null}
            <Menu
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={handleEdit}>
                <ListItemIcon>
                  <ModeEditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
              </MenuItem>
            </Menu>

            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 'bold',
                margin: 1,
              }}
            >
              {data.question}
            </Typography>
            <Chip
              label={data.category}
              sx={{
                margin: 1,
                color: 'primary.light',
                fontWeight: 'bold',
              }}
            />
            <CardActions
              sx={{
                justifyContent: 'space-between',
              }}
            >
              <Link to={`/question/question-and-answers/${data._id}`}>
                <Button size="small" text sx={{ textTransform: 'none' }}>
                  {handleAnswerCount()}
                </Button>
              </Link>
              <AddAnswer data={data} />
              {/* <Button>
                            <BorderColorIcon className={`mx-2`}/>
                            <span className={`mx-2`}>Answer</span>
                        </Button> */}
            </CardActions>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
