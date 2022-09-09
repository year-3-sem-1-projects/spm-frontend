import React, { useContext } from 'react'
import { Button, TextInput, Group, Box } from '@mantine/core'

import PostContext from '../../services/Post/PostContext'

const AddPost = () => {
  const { addPost, form, setOpened } = useContext(PostContext)

  return (
    <>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form
          onSubmit={form.onSubmit(values => {
            addPost(values)
            setOpened(false)
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
            label="Starting Position Image"
            {...form.getInputProps('img')}
          />

          <Group position="right" mt="md">
            <Button type="submit">Create</Button>
            <Button
              onClick={() => {
                setOpened(false)
                form.reset()
              }}
              color="red"
            >
              Cancel
            </Button>
          </Group>
        </form>
      </Box>
    </>
  )
}

export default AddPost
