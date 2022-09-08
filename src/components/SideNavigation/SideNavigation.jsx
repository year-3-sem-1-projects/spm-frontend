import * as React from 'react';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link } from 'react-router-dom';

export default function IconMenu({menuItems}) {

  const displayMenuItems = menuItems.map((item, index) => 
    <Link to={item.link}>
      <MenuItem 
        key={index}
        sx={{ padding: '0.5rem 1rem', margin: '0.5rem 0', borderRadius: '0.5rem'}}
      >
        <ListItemIcon>
          {item.icon}
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </MenuItem>
    </Link>
  )
  return (
    <Paper sx={{ width: 320, maxWidth: '100%' }}>
      <MenuList>
        {displayMenuItems}
      </MenuList>
    </Paper>
  );
}
