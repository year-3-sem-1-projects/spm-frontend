import React, { useState } from 'react'
import Button from '@mui/material/Button'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import AddPostDialog from '../../components/Post/AddPostDialog'

export default function AddPost({ setPostData }) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="add-post">
      <AddPostDialog
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
        setPostData={setPostData}
      />
      <Button
        fullWidth
        size="large"
        variant="outlined"
        startIcon={<QuestionMarkIcon />}
        onClick={() => handleOpen()}
        sx={{ height: 75 }}
      >
        Add Post
      </Button>
    </div>
  )
}
