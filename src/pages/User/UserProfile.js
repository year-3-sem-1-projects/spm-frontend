import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PostPanel from '../../components/PostPanel/PostPanel'
import ProgressPanel from '../../components/ProgressPanel/ProgressPanel'
import Avatar from '@mui/material/Avatar'
import PostComponent from '../../components/Post/PostComponent'
import { readPost } from '../../services/Post'
import { getUser } from '../../services/User'
import GetCurrentUser from '../../hooks/getCurrentUser'
import jwt_decode from 'jwt-decode'
import EditUserDialog from './EditUserDialog'
import { useNavigate } from 'react-router-dom'

const UserProfile = () => {
  const userdata = jwt_decode(localStorage.getItem('token')).data
  const navigate = useNavigate()

  const [postData, setPostData] = useState([])
  const [user, setUser] = useState(userdata)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [profilePic, setProfilePic] = useState(user.photo_url)
  const [coverPic, setCoverPic] = useState(user.cover_photo_url)
  const [username, setUsername] = useState(user.username)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  // getUser({email: user.email}).then((res) => {
  //   setUSER(res.data.data)
  // })
  useEffect(() => {
    getUser({email: user.email}).then((res) => {
      setProfilePic(res.data.data.photo_url)
      setUsername(res.data.data.username)
      setCoverPic(res.data.data.cover_photo_url)
      setUser(res.data.data)
    })
    readPost()
      .then(res => {
        setPostData(res)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setError(true)
        setLoading(false)
        setPostData([])
      })
      navigate('/user')
  }, [])

  return (
    <div>
      <Navbar />
      <div className="flex flex-col px-28">
        <div className=" relative flex">
          {coverPic ? (
            <img
              src={coverPic}
              alt="Cover"
              className="h-[20rem] w-[85rem]"
            />
          ) : (
            <div className="h-[20rem] w-[85rem] bg-slate-600">
              {/* <img
              src="https://images.unsplash.com/photo-1521117184087-0bf82f2385ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
              alt="Cover image"
              className="h-[20rem] w-[85rem]"
            /> */}
            </div>
          )}
          <div className="absolute h-24 w-24 bg-blue-400 -bottom-5 left-8">
            {profilePic ? (
              <Avatar
                alt="Profile Picture"
                src={profilePic}
                sx={{ width: 100, height: 100 }}
                variant="square"
              />
            ) : (
              <Avatar
                alt="Profile Picture"
                src="https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
                sx={{ width: 100, height: 100 }}
                variant="square"
              />
            )}
          </div>
        </div>
        <div className="h-7 w-full mt-10 flex justify-between">
          <span className="text-2xl font-inter font-bold">
            @{username}
          </span>
          <button
            className="bg-[#1976D2] text-white p-2 flex text-center items-center rounded-sm"
            onClick={() => handleOpen()}
          >
            Edit Profile
          </button>
          <EditUserDialog
            isDialogOpened={isOpen}
            handleCloseDialog={() => setIsOpen(false)}
            user={user}
            // setProfilePic={setProfilePic}
            // setCoverPic={setCoverPic}
            // setUsername={setUsername}
          />
        </div>
      </div>
      <br></br>
      <hr className="bg-black h-1" />
      <div className=" flex px-28 mt-7">
        <div className=" flex">
          <div className="">
            <ProgressPanel />
          </div>
          <div className="flex-[2] ml-10">
            <PostPanel />
          </div>
        </div>
      </div>
      <div className="h-[595px] w-[595px] ml-[450px]">
        {postData?.map(post => (
          <PostComponent data={post} />
        ))}
      </div>
    </div>
  )
}

export default UserProfile
