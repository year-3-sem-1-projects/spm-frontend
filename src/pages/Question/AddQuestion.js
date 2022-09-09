import React, { useState } from "react";
import Button from '@mui/material/Button';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AddQuestionDialog from "../../components/Question/AddQuestionDialog";

export default function AddQuestion() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="add-question">
      <AddQuestionDialog
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />
      <Button 
        fullWidth 
        size="large" 
        variant="outlined" 
        startIcon={<QuestionMarkIcon />} 
        onClick={() => handleOpen()}
        sx={{height: 75}}
      >
        Add Question
      </Button>
    </div>
  );
}
