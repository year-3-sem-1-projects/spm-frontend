import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import categories from '../../constants/categories';
import GetCurrentUser from '../../hooks/getCurrentUser';
import { updateQuestion } from "../../services/Question";

export default function EditQuestionDialog({ isEditDialogOpen, handleCloseEditDialog, editData }) {

  const currentUser = GetCurrentUser();

  const [fullWidth] = useState(true);
  const [maxWidth] = useState("sm");

  const [question, setQuestion] = useState(editData.question);
  const [category, setCategory] = useState(editData.category);
  const [questionError, setQuestionError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); 

    setQuestionError(false);
    setCategoryError(false);

    if(question === '') {
      setQuestionError(true);
    }
    if(category === '') {
      setCategoryError(true);
    }
    
    if(question && category) {
      const data = {
        question: question,
        category: category,
        user_email: currentUser.email
      }
      console.log('edit dataaaaaaaa', data)
      const result = await updateQuestion(data);
      console.log(result);
    }
    handleCloseEditDialog()
  }

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isEditDialogOpen}
        onClose={handleCloseEditDialog}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle>Add Your Question</DialogTitle>
        <form 
          noValidate 
          autoComplete="off"
          onSubmit={handleSubmit} 
        >
          <DialogContent>
            {/* user component */}
            <TextField
              onChange={(e) => setQuestion(e.target.value)}
              label="Question"
              value={question === '' ? editData.question : question}
              placeholder="Type your question here"
              variant="filled"
              fullWidth
              multiline
              rows={5}
              required
              error={questionError}
              sx={{marginTop: 2, marginBottom: 2, display: 'block'}}
            />
            <TextField
              onChange={(e) => setCategory(e.target.value)}
              select
              label="Category"
              value={category === '' ? editData.category : category}
              helperText="Please select a cateogry"
              fullWidth
              required
              error={categoryError}
              sx={{marginTop: 2, marginBottom: 2, display: 'block'}}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button variant="text"  onClick={handleCloseEditDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}


