import React, { useContext } from 'react'
import { TextInput, Button, Group, Box } from '@mantine/core'
import { useForm } from '@mantine/form'

import PostContext from '../../services/Post/PostContext'
import PostAPI from '../../services/Post/PostAPI'

function Search() {
  const { setPosts } = useContext(PostContext)

  const form = useForm({
    initialValues: {
      search: '',
    },
  })

  const handleSearch = values => {
    PostAPI.searchPost(values.search).then(response => {
      setPosts(response.data)
    })
  }

  const handleResetSearch = () => {
    form.reset()
    PostAPI.getPostData().then(response => {
      setPosts(response.data)
    })
  }

  return (
    <Box sx={{ maxWidth: 300 }} mx="auto">
      <form onSubmit={form.onSubmit(values => handleSearch(values))}>
        <TextInput
          required
          label="Search"
          placeholder="Bench Press"
          {...form.getInputProps('search')}
        />

        <Group position="right" mt="md">
          <Button type="submit">Search</Button>
          <Button type="reset" onClick={handleResetSearch}>
            Reset
          </Button>
        </Group>
      </form>
    </Box>
  )
}

export default Search
