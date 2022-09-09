import React, { useContext } from 'react'
import { Button, TextInput, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'

import PostContext from '../../services/Post/PostContext'

const EditPost = () => {
  const { editPost, setEditOpened, post } = useContext(PostContext)

  // Form initial state
  let form = useForm({
    initialValues: {
      id: post._id,
      description: post.description,
      category: post.category,
      img: post.img,
    },
  })

  return (
    <>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit(values => {
            editPost(values)
            setEditOpened(false)
          })}
        >
          <TextInput
            required
            name="description"
            label="Description"
            {...form.getInputProps('description')}
          />
          <TextInput
            required
            name="category"
            label="Category"
            {...form.getInputProps('category')}
          />

          <TextInput
            required
            name="img"
            label=" Image"
            {...form.getInputProps('img')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Update</Button>
            <Button onClick={() => setEditOpened(false)} color="red">
              Cancel
            </Button>
          </Group>
        </form>
      </Box>
    </>
  )
}

export default EditPost
