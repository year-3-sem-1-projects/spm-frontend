import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { ListItemIcon, ListItemText } from '@mui/material';

export default function QuestionComponent({question, category, answers}) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
      setAnchorEl(null);
    }

    const handleEdit = () => {
        setAnchorEl(null);
        setIsEditOpen(!isEditOpen);
    }

    const handleDelete = () => {
        setAnchorEl(null);
        setIsDeleteOpen(!isDeleteOpen);  
    }

  return (
    <>
     {/* Question component card */}
        <Box>
            <Card>
                <CardContent>
                    <MoreHorizIcon 
                        sx={{
                            float: 'right',
                            cursor: 'pointer',
                            '&:hover': {
                                color: 'primary.main',
                            }
                        }}
                        onClick={handleClick}
                    />
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
                            margin: 1
                        }}
                    >
                        {question}
                    </Typography>
                    <Chip 
                        label={category} 
                        sx={{
                            margin: 1
                        }}
                    />
                    <CardActions sx={{
                        justifyContent: 'space-between',
                    }}>
                        <Button text>{answers}</Button>
                        <Button>
                            <BorderColorIcon className={`mx-2`}/>
                            <span className={`mx-2`}>Answer</span>
                        </Button>
                    </CardActions>
                </CardContent>
            </Card>
        </Box>
    </>
  );
}
