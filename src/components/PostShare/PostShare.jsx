import React, { useState, useRef, useContext } from 'react'
import ProfileImage from '../../assets/profileImg.jpg'
import './PostShare.css'
import { Modal, Button, Group } from '@mantine/core'
import {
  UilScenery,
  UilPlayCircle,
  UilSchedule,
  UilLocationPoint,
  UilTimes,
} from '@iconscout/react-unicons'

import AddPost from '../../pages/Post/AddPost'
import PostContext from '../../services/Post/PostContext'

function PostShare() {
  const [image, setImage] = useState(null)
  const imageRef = useRef()
  const onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0]
      setImage({
        image: URL.createObjectURL(img),
      })
    }
  }
  const { opened, setOpened } = useContext(PostContext)

  return (
    <div className="PostShare">
      <img src={ProfileImage} alt="ProfileImage" className="ProfileImage" />
      <div>
        <input type="text" placeholder="What's on your mind?" />

        <div className="postOptions">
          <div
            className="option"
            style={{ color: 'var(--photo)' }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery className="icon" />
            Photo
          </div>
          <div className="option" style={{ color: 'var(--video)' }}>
            <UilPlayCircle className="icon" />
            Video
          </div>
          <div className="option" style={{ color: 'var(--location)' }}>
            <UilLocationPoint className="icon" />
            Location
          </div>

          <div className="option" style={{ color: 'var(--shedule)' }}>
            <UilSchedule className="icon" />
            Shedule
          </div>
          {/* <button className="button ps-button">Share</button> */}
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Add Post"
          >
            <AddPost />
          </Modal>

          <Group
            position="right"
            style={{ marginRight: '1rem', marginBottom: '1rem' }}
          >
            <Button
              className="button ps-button"
              onClick={() => setOpened(true)}
            >
              Start Post
            </Button>
          </Group>
          <div style={{ display: 'none' }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes
              onClick={() => {
                setImage(null)
              }}
            />
            <img src={image.image} alt="preview" />
          </div>
        )}
      </div>
    </div>
  )
}

export default PostShare
