import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import truncate from '../../../utils/truncateText'

export const TEST_STYLE = {
  outlineWidth: '1px',
  outlineColor: '#000',
  outlineStyle: 'solid',
}

const Circle = ({ name, description, iconImage, coverImage }) => {
  return (
    <>
      <Link to={`${name}`}>
        <Card sx={{ maxWidth: 200, maxHeight: 250 }}>
          <CardActionArea sx={TEST_STYLE}>
            <CardMedia
              component="img"
              height="140"
              image={coverImage}
              alt="cover image"
              sx={{
                objectFit: 'cover',
                objectPosition: 'center',
                height: '100px',
              }}
            />
            <IconButton
              sx={[
                {
                  p: 0,
                  transform: 'translate(100%, -50%)',
                },
              ]}
              disableRipple
            >
              <Avatar
                alt={name}
                src={iconImage}
                sx={[
                  {
                    width: 70,
                    height: 70,
                  },
                ]}
              />
            </IconButton>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                flexDirection: 'column',
                transform: 'translate(0, -20%)',
              }}
            >
              <Typography gutterBottom variant="h6">
                {name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  textAlign: 'center',
                  pb: 2,
                  pl: 1,
                  pr: 1,
                }}
                gutterBottom
                width="100%"
              >
                {truncate(description)}
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      </Link>
    </>
  )
}

export default Circle
