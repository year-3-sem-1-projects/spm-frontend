import React, { useState } from 'react'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea } from '@mui/material'

export default function ViewPost({ isDialogOpened, handleCloseDialog, data }) {
  console.log('dataaaaaa', data)
  const [fullWidth] = useState(true)
  const [maxWidth] = useState('sm')

  const handleClose = () => {
    handleCloseDialog(false)
  }

  const [isOpen, setIsOpen] = useState(false)

  return (
    <React.Fragment>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isDialogOpened}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">View Post</DialogTitle>
        <DialogContent>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://source.unsplash.com/random"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  ggggggggggggggg
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ggggggggggggggg
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}
