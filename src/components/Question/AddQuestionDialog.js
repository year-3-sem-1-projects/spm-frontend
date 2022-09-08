import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import categories from '../../constants/categories';

export default function AddQuestionDialog({ isDialogOpened, handleCloseDialog }) {

  const [fullWidth] = React.useState(true);
  const [maxWidth] = React.useState("sm");
  const [category, setCategory] = React.useState('EUR');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const handleClose = () => {
    handleCloseDialog(false);
  };

  function handleSubmit() {

    
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
        <DialogTitle>Add Your Question</DialogTitle>
        <DialogContent>
          {/* user component */}
          <TextField
            id="question-content"
            label="Question"
            type="text"
            placeholder="Type your question here"
            multiline
            fullWidth
            variant="filled"
            rows={5}
            style={{marginBottom: "15px"}}
          />
          <TextField
            id="question-category"
            select
            label="Category"
            value={category}
            onChange={handleChange}
            helperText="Please select a cateogry"
          >
            {categories.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>
        </DialogContent>
        <DialogActions>
          <Button variant="text"  onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add</Button>
       </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}


