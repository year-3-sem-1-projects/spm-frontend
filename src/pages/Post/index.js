import React from 'react'

// Page components
import PostList from './PostList'
import PostShare from '../../components/PostShare/PostShare'
// import SideBar from '../../components/sidebar/Sidebar'
import ProfileSide from '../../components/ProfileSide/ProfileSide'
import Navbar from '../../components/Navbar/Navbar'

import AddPostModal from './AddPostModal'
import Search from './Search'

import './Post.css'
import '../../App.css'

// PostProvider
import { PostProvider } from '../../services/Post/PostContext'

const Post = () => {
  return (
    <div className="App">
      <div className="blur" style={{ top: '-18%', right: '0' }}></div>
      <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>
      <Navbar />
      <div className="Post">
        <div className="ProfileSide">
          <br />

          <PostProvider>
            <ProfileSide />
            {/* <LeftSideBar /> */}
            <AddPostModal />
          </PostProvider>
        </div>
        <div className="PostSide">
          <PostProvider>
            <br />
            <PostShare />
            <Search />
            <br />
            {/* <PostList /> */}
          </PostProvider>
        </div>

        <div className="RightSide"></div>
      </div>
    </div>
  )
}

export default Post

// import React from 'react'

// // Page components
// import PostList from './PostList'
// import AddPostModal from './AddPostModal'
// import Search from './Search'

// // PostProvider
// import { PostProvider } from '../../services/Post/PostContext'

// import { SimpleGrid } from '@mantine/core'

// const Post = () => {
//   return (
//     <div>
//       <PostProvider>
//         <br />
//         <h1 style={{ textAlign: 'center' }}>Posts</h1>
//         <Search />
//         <AddPostModal />

//         <SimpleGrid
//           cols={4}
//           spacing="lg"
//           breakpoints={[
//             { maxWidth: 1350, cols: 3, spacing: 'md' },
//             { maxWidth: 1020, cols: 2, spacing: 'sm' },
//             { maxWidth: 675, cols: 1, spacing: 'sm' },
//           ]}
//         >
//           {/* <PostList /> */}
//         </SimpleGrid>
//       </PostProvider>
//     </div>
//   )
// }

// export default Post
