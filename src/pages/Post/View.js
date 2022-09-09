import React, { useContext } from 'react'

import PostContext from '../../services/Post/PostContext'
import {
  createStyles,
  Card,
  Image,
  ActionIcon,
  Group,
  Text,
  Avatar,
  Badge,
} from '@mantine/core'
import { Heart, Bookmark, Share } from 'tabler-icons-react'

const useStyles = createStyles(theme => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
}))

const View = () => {
  const { classes, theme } = useStyles()
  const { post } = useContext(PostContext)
  return (
    <div>
      <Card
        withBorder
        p="lg"
        radius="md"
        className={classes.card}
        style={{ maxWidth: 500 }}
      >
        <Card.Section mb="sm">
          <Image src={post.img} height={250} />
        </Card.Section>

        <Badge># {post.category}</Badge>

        <Text weight={700} className={classes.title} mt="xs">
          {post.description}
        </Text>

        <Group mt="lg">
          <Avatar
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            radius="sm"
          />
          <div>
            <Text size="xs" color="dimmed">
              R.Lakshika De Zoysa
            </Text>
            <Group>
              <Text size="xs" color="dimmed">
                created At:{Date(post.created_at).toString().slice(3, 15)}
              </Text>

              <Text size="xs" color="dimmed">
                {' '}
                - updated At:{Date(post.edited_at).toString().slice(3, 15)}
              </Text>
            </Group>
          </div>
        </Group>

        <Card.Section className={classes.footer}>
          <Group position="apart">
            <Text size="xs" color="dimmed">
              {classes.footer}
            </Text>
            <Group spacing={0}>
              <ActionIcon>
                <Heart size={18} color={theme.colors.red[6]} />
              </ActionIcon>
              <ActionIcon>
                <Bookmark size={18} color={theme.colors.yellow[6]} />
              </ActionIcon>
              <ActionIcon>
                <Share size={16} color={theme.colors.blue[6]} />
              </ActionIcon>
            </Group>
          </Group>
        </Card.Section>
      </Card>
    </div>
  )
}

export default View
