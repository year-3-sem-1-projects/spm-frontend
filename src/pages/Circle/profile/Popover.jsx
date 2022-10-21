import { Popover } from '@mui/material'
import { Link } from 'react-router-dom'

export default function CustomPopover({
  content,
  anchorEl,
  handleClose,
  name,
  role,
}) {
  return (
    <>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPopover-paper': {
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            backgroundColor: '#e0e0e0',
            padding: '16px',
          },
          transform: 'translateY(-1%)',
        }}
      >
        <Link
          to={`/circle/${name}/${role.toLowerCase()}/dashboard/${
            role === 'admin' ? 'settings' : 'people'
          }`}
        >
          {content}
        </Link>
      </Popover>
    </>
  )
}
