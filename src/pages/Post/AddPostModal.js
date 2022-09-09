import { useContext } from 'react'
import { Modal, Button, Group } from '@mantine/core'

// Page Components
import AddPost from './AddPost'

import PostContext from '../../services/Post/PostContext'

function AddPostModal() {
  const { opened, setOpened } = useContext(PostContext)

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Add Post">
        <AddPost />
      </Modal>

      <Group
        position="right"
        style={{ marginRight: '1rem', marginBottom: '1rem' }}
      >
        <Button onClick={() => setOpened(true)}>Add Post</Button>
      </Group>
    </>
  )
}

export default AddPostModal
