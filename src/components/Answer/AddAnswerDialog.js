import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import GetCurrentUser from '../../hooks/getCurrentUser'
import { postAnswer } from '../../services/Question'

export default function AddAnswerDialog({ isDialogOpened, handleCloseDialog, data }) {

  const currentUser = GetCurrentUser()

  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')

  const [answer, setAnswer] = useState('')
  const [questionData, setQuestionData] = useState(data)
  const [answerError, setAnswerError] = useState(false)
  const [questionError, setQuestionDataError] = useState(false)

  const handleClose = () => {
    handleCloseDialog(false)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setAnswerError(false)
    setQuestionDataError(false)
    if (answer === '') {
      setAnswerError(true)
    }
    if(questionData === '') {
        setQuestionDataError(true)
    }

    if (answer && questionData) {
      const answerContent = {
        answer: answer,
        question: questionData.question,
        question_id: questionData._id,
        user_email: currentUser.email,
      }
      const result = await postAnswer(answerContent)
      console.log('THIS IS THE RESULT AFTER ADDING Q::::::', result)
      handleCloseDialog(false);
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isDialogOpened}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle>{questionData.question}</DialogTitle>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogContent>
            {/* user component */}
            <TextField
              onChange={e => setAnswer(e.target.value)}
              label="Answer"
              placeholder="Type your answer here"
              variant="filled"
              fullWidth
              multiline
              rows={5}
              required
              error={answerError}
              sx={{ marginTop: 2, marginBottom: 2, display: 'block' }}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="text" onClick={handleClose} type="Submit">
              Cancel
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              Publish
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}
