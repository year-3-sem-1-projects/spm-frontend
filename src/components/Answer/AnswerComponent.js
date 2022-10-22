import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
// import jwt_decode from 'jwt-decode';

export default function AnswerComponent({ isMyAnswers, data }) {
  const [upvote, setUpvote] = useState(data.upvote)
  const [downvote, setDownvote] = useState(data.downvote)
  const [isUpvoted, setIsUpvoted] = useState(false)
  const [isDownvoted, setIsDownvoted] = useState(false)
  // const currentUser = jwt_decode(localStorage.getItem('token')).data

  return (
    <>
      {/* Answer component card */}
      <Box
        sx={{
          marginBottom: 2,
        }}
      >
        <Card elevation={2}>
          <CardContent>
            <Box>
              {/* Question only if in My Answers */}
              {isMyAnswers ? (
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
              ) : null}
              <Typography
                variant="body2"
                component="div"
                sx={{
                  margin: 2,
                }}
              >
                {data.answer}
              </Typography>
              <CardActions
                sx={{
                  justifyContent: 'space-between',
                }}
              >
                <ButtonGroup 
                    variant="contained" 
                    aria-label="answer votes"
                    color="inherit"
                    size="small"
                >
                  <Button> <ArrowUpwardOutlinedIcon /></Button>
                  <Button> <ArrowDownwardOutlinedIcon /></Button>    
                </ButtonGroup>
              </CardActions>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  )
}
