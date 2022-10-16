import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import PostPanel from '../../components/PostPanel/PostPanel'
import ProgressPanel from '../../components/ProgressPanel/ProgressPanel'
import Avatar from '@mui/material/Avatar'
import jwt_decode from 'jwt-decode'
import PostComponent from '../../components/Post/PostComponent'
import { readPost } from '../../services/Post'
import Grid from '@mui/material/Grid'

const UserProfile = () => {
  const decodedToken = jwt_decode(localStorage.getItem('token')).data
  const [postData, setPostData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
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
  }, [])

  return (
    <div>
      <Navbar />
      <div className="flex flex-col px-28">
        <div className=" relative flex">
          {decodedToken.cover_photo_url ? (
            <img
              src={decodedToken.cover_photo_url}
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
            {decodedToken.photo_url ? (
              <Avatar
                alt="Profile Picture"
                src={decodedToken.photo_url}
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
            @{decodedToken.username}
          </span>
          <button className="bg-[#1976D2] text-white p-2 flex text-center items-center rounded-sm">
            Edit Profile
          </button>
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
      <div className='h-[595px] w-[595px] ml-[450px]'>
        {postData?.map(post => (
          <PostComponent data={post} />
        ))}
      </div>
    </div>
  )
}

export default UserProfile
