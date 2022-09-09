import React, { useContext, useState } from 'react'
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  useMantineTheme,
  Modal,
  ScrollArea,
  Spoiler,
  Avatar,
} from '@mantine/core'
import PostContext from '../../services/Post/PostContext'

import { Edit, Trash, Eye } from 'tabler-icons-react'
import EditPost from './EditPost'
import View from './View'

function PostList() {
  const {
    posts,
    confirmDelete,
    editOpened,
    setEditOpened,
    setPost,
    incrementViewCount,
  } = useContext(PostContext)
  const theme = useMantineTheme()

  const secondaryColor =
    theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7]

  // View Modal
  const [opened, setOpened] = useState(false)

  return (
    <div>
      {/* Edit Modal */}
      <Modal
        opened={editOpened}
        onClose={() => setEditOpened(false)}
        title="Edit Post "
      >
        <EditPost />
      </Modal>
      {/* View Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        overflow="inside"
        size="5"
      >
        <View />
      </Modal>

      {posts.map(item => (
        <div
          key={item._id}
          style={{
            width: 1200,
            margin: 'auto',
          }}
        >
          <Card shadow="sm" p="lg">
            <Group mt="lg">
              <Avatar
                src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                radius="xl"
              />
              <div>
                <Text color="dimmed">R.Lakshika De Zoysa</Text>
                <Group>
                  <Text color="dimmed">
                    created At:{Date(item.created_at).toString().slice(3, 15)}
                  </Text>

                  <Text color="dimmed">
                    {' '}
                    - updated At:{Date(item.edited_at).toString().slice(3, 15)}
                  </Text>
                </Group>
              </div>
            </Group>

            <hr style={{ border: `1px solid ${secondaryColor}` }} />

            <Group
              position="apart"
              style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
            >
              <Spoiler
                maxHeight={50}
                showLabel="Show more"
                hideLabel="Hide"
                transitionDuration={0}
              >
                <Text weight={500}>{item.description}</Text>
              </Spoiler>
            </Group>
            <Card.Section>
              <Image src={item.img} height={300} alt="Norway" />
            </Card.Section>

            <hr style={{ border: `1px solid ${secondaryColor}` }} />

            <ScrollArea
              style={{ height: 80 }}
              scrollbarSize={5}
              scrollHideDelay={100}
            >
              <Badge color="red" size="lg">
                <i>#</i> {item.category}
              </Badge>
              <br />
              <br />
              <Badge
                sx={{ paddingLeft: 5, paddingRight: 5 }}
                color="green"
                variant="light"
                size="lg"
              >
                <Group position="center" spacing="xs">
                  <Eye />
                  {item.viewCount == 0 ? '0' : item.viewCount}
                </Group>
              </Badge>
            </ScrollArea>

            {/* On click open modal */}

            <Button
              variant="light"
              color="blue"
              fullWidth
              style={{ marginTop: 14 }}
              onClick={() => {
                incrementViewCount(item._id)
                setPost(item)
                setOpened(true)
              }}
            >
              View
            </Button>

            <Group position="apart" mt="md" spacing="md">
              <Button
                onClick={() => {
                  setPost(item)
                  setEditOpened(true)
                }}
                variant="light"
                color="blue"
                compact
                leftIcon={<Edit size={16} />}
              >
                Edit
              </Button>
              <Button
                onClick={() => confirmDelete(item._id)}
                color="red"
                compact
                leftIcon={<Trash size={16} />}
              >
                Delete
              </Button>
            </Group>
          </Card>
          <br />
        </div>
      ))}
    </div>
  )
}

export default PostList
