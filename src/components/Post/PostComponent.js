/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react'
import { useState } from 'react'
import AspectRatio from '@mui/joy/AspectRatio'
import Avatar from '@mui/joy/Avatar'
import Box from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import CardOverflow from '@mui/joy/CardOverflow'
import Link from '@mui/joy/Link'
import IconButton from '@mui/joy/IconButton'
import Input from '@mui/joy/Input'
import Typography from '@mui/joy/Typography'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import SendOutlined from '@mui/icons-material/SendOutlined'
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded'
import EditPostDialog from './EditPostDialog'
import DeletePostDialog from './DeletePostDialog'
import Chip from '@mui/material/Chip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { ListItemIcon, ListItemText } from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import { RemoveRedEyeOutlined } from '@material-ui/icons'
import ViewPost from './ViewPost'
import jwt_decode from 'jwt-decode'

// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
// import Favorite from '@material-ui/icons/Favorite'

export default function PostComponent({ data, setPostData }) {
  console.log('dataaaaaa', data)

  const currentUser = jwt_decode(localStorage.getItem('token')).data
  //console.log('currentUser in post', currentUser)

  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const [like, setLike] = useState(0)
  const [dislike, setDisLike] = useState(1)

  const [likeactive, setLikeActive] = useState(false)
  const [dislikeactive, setDisLikeActive] = useState(false)

  function likef() {
    if (likeactive) {
      setLikeActive(false)
      setLike(like - 1)
    } else {
      setLikeActive(true)
      setLike(like + 1)
      if (dislikeactive) {
        setDisLikeActive(false)
        setLike(like + 1)
        setDisLike(dislike - 1)
      }
    }
  }
  // function dislikef() {
  //   if (dislikeactive) {
  //     setDisLikeActive(false)
  //     setDisLike(dislike - 1)
  //   } else {
  //     setDisLikeActive(true)
  //     setDisLike(like + 1)
  //     if (dislikeactive) {
  //       setLikeActive(false)
  //       setDisLike(dislike + 1)
  //       setLike(like - 1)
  //     }
  //   }
  // }

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    setAnchorEl(null)
    setIsEditOpen(!isEditOpen)
  }

  const handleDelete = () => {
    console.log('handle delete called')
    setAnchorEl(null)
    setIsDeleteOpen(!isDeleteOpen)
  }

  console.log('currentUseremail :')
  return (
    <>
      <DeletePostDialog
        deleteData={data}
        isDeleteDialogOpen={isDeleteOpen}
        handleCloseDeleteDialog={setIsDeleteOpen}
        setPostData={setPostData}
      />
      <EditPostDialog
        editData={data}
        isEditDialogOpen={isEditOpen}
        handleCloseEditDialog={handleEdit}
        setPostData={setPostData}
      />
      <ViewPost
        isDialogOpened={isOpen}
        handleCloseDialog={() => setIsOpen(false)}
      />

      <Card
        elevation={3}
        sx={{
          minWidth: 300,
          '--Card-radius': theme => theme.vars.radius.xs,
          backgroundColor: '#FFFFFF',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', pb: 1.5, gap: 1 }}>
          <Box
            sx={{
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                m: '-2px',
                borderRadius: '50%',
                background:
                  'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
              },
            }}
          >
            <Avatar
              size="sm"
              src="/static/logo.png"
              sx={{
                p: 0.5,
                border: '2px solid',
                borderColor: 'background.body',
              }}
            />
          </Box>
          <Typography fontWeight="lg">{data.username}</Typography>

          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ ml: 'auto' }}
          >
            {currentUser.email === data.user_email ? (
              <MoreHorizIcon
                sx={{
                  float: 'right',
                  cursor: 'pointer',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
                onClick={handleClick}
              />
            ) : null}
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
          </IconButton>
        </Box>
        <hr />
        {/* <CardOverflow>{data.description}</CardOverflow> */}
        <CardOverflow>{data.description}</CardOverflow>

        <CardOverflow>
          <AspectRatio>
            <img src={data.img} alt="" loading="lazy" />
          </AspectRatio>
        </CardOverflow>
        <Box sx={{ display: 'flex', alignItems: 'center', mx: -1, my: 1 }}>
          <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
            <IconButton variant="plain" color="neutral" size="sm">
              <FavoriteBorder
                onClick={likef}
                style={{ color: likef ? 'red' : 'black' }}
              />

              {/* <FormControlLabel
                control={
                  <Checkbox
                    onClick={likef}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    name="checkedH"
                  />
                }
              /> */}
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <RemoveRedEyeOutlined onClick={handleOpen} />
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <SendOutlined />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              mx: 'auto',
            }}
          >
            {[...Array(5)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  borderRadius: '50%',
                  width: `max(${6 - index}px, 3px)`,
                  height: `max(${6 - index}px, 3px)`,

                  bgcolor:
                    index === 0 ? 'primary.solidBg' : 'background.level3',
                }}
              />
            ))}
          </Box>
          <Box sx={{ width: 0, display: 'flex', flexDirection: 'row-reverse' }}>
            <IconButton variant="plain" color="neutral" size="sm">
              <BookmarkBorderRoundedIcon />
            </IconButton>
          </Box>
        </Box>
        <Link
          component="button"
          underline="none"
          fontSize="sm"
          fontWeight="lg"
          textColor="text.primary"
        >
          Like{like}
        </Link>
        {/* <Button onClick={likef}>Like {like}</Button>
        <Button onClick={dislikef}>Dislike {dislike}</Button> */}

        <Typography fontWeight="sm">
          Last updated At:{Date(data.edited_at).toString().slice(3, 15)}
        </Typography>
        <CardOverflow sx={{ p: 'var(--Card-padding)', display: 'flex' }}>
          <Chip
            label={data.category}
            sx={{
              margin: 1,
              color: 'primary.light',
              fontWeight: 'bold',
            }}
          />
        </CardOverflow>
      </Card>
      <br />
    </>
  )
}

//design eke awulak tiyena code eka

// import React from 'react'
// import { useState } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import clsx from 'clsx'
// import Card from '@material-ui/core/Card'
// import CardHeader from '@material-ui/core/CardHeader'
// import CardMedia from '@material-ui/core/CardMedia'
// import CardContent from '@material-ui/core/CardContent'
// import CardActions from '@material-ui/core/CardActions'
// import Collapse from '@material-ui/core/Collapse'
// import Avatar from '@material-ui/core/Avatar'
// import IconButton from '@material-ui/core/IconButton'
// import Typography from '@material-ui/core/Typography'
// import { red } from '@material-ui/core/colors'
// import FavoriteIcon from '@material-ui/icons/Favorite'
// import ShareIcon from '@material-ui/icons/Share'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import MoreVertIcon from '@material-ui/icons/MoreVert'
// import EditPostDialog from './EditPostDialog'
// import DeletePostDialog from './DeletePostDialog'

// const useStyles = makeStyles(theme => ({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
// }))

// export default function PostComponent({ data }) {
//   const classes = useStyles()
//   const [expanded, setExpanded] = React.useState(false)

//   const handleExpandClick = () => {
//     setExpanded(!expanded)
//   }

//   console.log('dataaaaaa', data)

//   const [anchorEl, setAnchorEl] = useState(null)
//   const open = Boolean(anchorEl)

//   const [isEditOpen, setIsEditOpen] = useState(false)
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false)

//   const handleClick = event => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const handleEdit = () => {
//     setAnchorEl(null)
//     setIsEditOpen(!isEditOpen)
//   }

//   const handleDelete = () => {
//     console.log('handle delete called')
//     setAnchorEl(null)
//     setIsDeleteOpen(!isDeleteOpen)
//   }

//   return (
//     <Card>
//       <DeletePostDialog
//         deleteData={data}
//         isDeleteDialogOpen={isDeleteOpen}
//         handleCloseDeleteDialog={setIsDeleteOpen}
//       />
//       <EditPostDialog
//         editData={data}
//         isEditDialogOpen={isEditOpen}
//         handleCloseEditDialog={handleEdit}
//       />
//       <CardHeader
//         avatar={<Avatar aria-label="recipe">R</Avatar>}
//         action={
//           <IconButton aria-label="settings">
//             <MoreVertIcon></MoreVertIcon>
//           </IconButton>
//         }
//         title="Shrimp and Chorizo Paella"
//         subheader="September 14, 2016"
//       />

//       <CardMedia
//         className={classes.media}
//         image={data.img}
//         title="Paella dish"
//       />
//       <CardContent>
//         <Typography variant="body2" color="textSecondary" component="p">
//           {data.description}
//         </Typography>
//       </CardContent>
//       <CardActions disableSpacing>
//         <IconButton aria-label="add to favorites">
//           <FavoriteIcon />
//         </IconButton>
//         <IconButton aria-label="share">
//           <ShareIcon />
//         </IconButton>
//         <IconButton
//           className={clsx(classes.expand, {
//             [classes.expandOpen]: expanded,
//           })}
//           onClick={handleExpandClick}
//           aria-expanded={expanded}
//           aria-label="show more"
//         >
//           <ExpandMoreIcon />
//         </IconButton>
//       </CardActions>
//       <Collapse in={expanded} timeout="auto" unmountOnExit>
//         <CardContent>
//           <Typography paragraph>{data.description}</Typography>
//         </CardContent>
//       </Collapse>
//     </Card>
//   )
// }

// corret code

// import * as React from 'react'
// import { useState } from 'react'
// import Box from '@mui/material/Box'
// import Typography from '@mui/material/Typography'

// import Card from '@mui/material/Card'
// import CardContent from '@mui/material/CardContent'
// import CardActions from '@mui/material/CardActions'
// import CardMedia from '@mui/material/CardMedia'
// import Chip from '@mui/material/Chip'
// import Button from '@mui/material/Button'
// import BorderColorIcon from '@mui/icons-material/BorderColor'
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
// import ModeEditIcon from '@mui/icons-material/ModeEdit'
// import DeleteIcon from '@mui/icons-material/Delete'
// import Menu from '@mui/material/Menu'
// import MenuItem from '@mui/material/MenuItem'
// import { ListItemIcon, ListItemText } from '@mui/material'
// import EditPostDialog from './EditPostDialog'
// import DeletePostDialog from './DeletePostDialog'

// export default function PostComponent({ data }) {
//   console.log('dataaaaaa', data)

//   const [anchorEl, setAnchorEl] = useState(null)
//   const open = Boolean(anchorEl)

//   const [isEditOpen, setIsEditOpen] = useState(false)
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false)

//   const handleClick = event => {
//     setAnchorEl(event.currentTarget)
//   }

//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   const handleEdit = () => {
//     setAnchorEl(null)
//     setIsEditOpen(!isEditOpen)
//   }

//   const handleDelete = () => {
//     console.log('handle delete called')
//     setAnchorEl(null)
//     setIsDeleteOpen(!isDeleteOpen)
//   }

//   return (
//     <>
//       <DeletePostDialog
//         deleteData={data}
//         isDeleteDialogOpen={isDeleteOpen}
//         handleCloseDeleteDialog={setIsDeleteOpen}
//       />
//       <EditPostDialog
//         editData={data}
//         isEditDialogOpen={isEditOpen}
//         handleCloseEditDialog={handleEdit}
//       />
//       {/* Question component card */}
//       <Box
//         sx={{
//           marginBottom: 2,
//         }}
//       >
//         <Card elevation={2}>
//           <CardContent>
//             <MoreHorizIcon
//               sx={{
//                 float: 'right',
//                 cursor: 'pointer',
//                 '&:hover': {
//                   color: 'primary.main',
//                 },
//               }}
//               onClick={handleClick}
//             />
//             <Menu
//               aria-labelledby="demo-positioned-button"
//               anchorEl={anchorEl}
//               open={open}
//               onClose={handleClose}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//             >
//               <MenuItem onClick={handleEdit}>
//                 <ListItemIcon>
//                   <ModeEditIcon fontSize="small" />
//                 </ListItemIcon>
//                 <ListItemText>Edit</ListItemText>
//               </MenuItem>
//               <MenuItem onClick={handleDelete}>
//                 <ListItemIcon>
//                   <DeleteIcon fontSize="small" />
//                 </ListItemIcon>
//                 <ListItemText>Delete</ListItemText>
//               </MenuItem>
//             </Menu>

//             <CardMedia image={data.img} title="Paella dish" />

//             <Typography
//               variant="h6"
//               component="div"
//               sx={{
//                 fontWeight: 'bold',
//                 margin: 1,
//               }}
//             >
//               {data.description}
//             </Typography>
//             <Chip
//               label={data.category}
//               sx={{
//                 margin: 1,
//                 color: 'primary.light',
//                 fontWeight: 'bold',
//               }}
//             />
//             <CardActions
//               sx={{
//                 justifyContent: 'space-between',
//               }}
//             >
//               <Button>
//                 <BorderColorIcon className={`mx-2`} />
//                 <span className={`mx-2`}>View</span>
//               </Button>
//             </CardActions>
//           </CardContent>
//         </Card>
//       </Box>
//     </>
//   )
// }
