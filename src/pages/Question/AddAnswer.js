import React, { useState } from 'react'
import Button from '@mui/material/Button'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import AddAnswerDialog from '../../components/Answer/AddAnswerDialog'

export default function AddAnswer({data}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="add-answer">
      <AddAnswerDialog
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
        data={data}
      />
      <Button onClick={() => handleOpen()}>
        <BorderColorIcon className={`mx-2`} />
        <span className={`mx-2`}>Answer</span>
      </Button>
    </div>
  )
}
