import { createContext, useState, useEffect } from 'react'

// Mantine imports
import { Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useModals } from '@mantine/modals'

import PostAPI from './PostAPI'

const PostContext = createContext()

export function PostProvider({ children }) {
  // posts
  const [posts, setPosts] = useState([])

  const [post, setPost] = useState({
    description: '',
    img: '',
    category: '',
  })

  // Get all posts
  useEffect(() => {
    PostAPI.getPostData().then(response => {
      setPosts(response.data)
    })
  }, [])

  const form = useForm({
    initialValues: {
      description: '',
      img: '',
      category: '',
    },
  })

  // Add new post
  const addPost = values => {
    const newPost = {
      description: values.description,
      img: values.img,
      category: values.category,
    }
    PostAPI.addPost(newPost).then(response => {
      setPosts([...posts, response.data])
      form.reset()
    })
  }

  // AddPost Modal
  const [opened, setOpened] = useState(false)

  // Delete post and update UI
  const deletePost = id => {
    PostAPI.deletePost(id).then(() => {
      setPosts(posts.filter(post => post._id !== id))
    })
  }

  // Delete confirmation modal
  const modals = useModals()
  const confirmDelete = id =>
    modals.openConfirmModal({
      title: 'Delete Post',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this post? This action is destructive
          and cannot be undone.
        </Text>
      ),
      labels: {
        confirm: 'Delete Post',
        cancel: "No don't delete it",
      },
      confirmProps: { color: 'red' },
      // eslint-disable-next-line no-console
      onCancel: () => console.log('Cancel'),
      onConfirm: () => deletePost(id),
    })

  // Edit post
  const editPost = values => {
    const newPost = {
      description: values.description,
      img: values.img,
      category: values.category,
    }
    PostAPI.editPost(values.id, newPost).then(response => {
      setPosts(
        posts.map(post => (post._id === values.id ? response.data : post)),
      )

      form.reset()
    })
  }

  // editPost Modal
  const [editOpened, setEditOpened] = useState(false)

  // View Count increment
  const incrementViewCount = id => {
    PostAPI.incrementViewCount(id).then(response => {
      setPosts(posts.map(post => (post._id === id ? response.data : post)))
    })
  }

  // Most popular posts
  // const [popularPosts, setPopularPosts] = useState([]);

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        confirmDelete,
        form,
        addPost,
        opened,
        setOpened,
        editPost,
        editOpened,
        setEditOpened,
        post,
        setPost,
        incrementViewCount,
        // popularWorkouts,
        // isLoading,
      }}
    >
      {children}
    </PostContext.Provider>
  )
}

export default PostContext
