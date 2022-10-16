import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { register } from '../../services/User'

const Login = () => {
  const navigate = useNavigate()

  const handleForm = async e => {
    e.preventDefault()
    const userEmail = e.target.email.value
    await register({
      email: e.target.email.value,
      username: e.target.username.value,
      password: e.target.password.value,
    })
      .then(res => {
        navigate({
          pathname: '/verify',
          search: createSearchParams({
            email:userEmail
          }).toString()
        })
      })
      .catch(err => console.error(err))
  }
  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-col flex-1 bg-black justify-center h-screen">
        <form onSubmit={handleForm} className="flex flex-col items-center">
          <span className="font-medium text-3xl text-white ">Sign Up</span>
          <input
            className="bg-transparent border-2 my-4 border-input-border rounded-[5px] h-16 w-1/2 p-4 text-gray-100"
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            className="bg-transparent border-2 my-4 border-input-border rounded-[5px] h-16 w-1/2 p-4 text-gray-100"
            name="username"
            type="text"
            placeholder="Username"
          />
          <input
            className="bg-transparent border-2 my-4 border-input-border rounded-[5px] h-16 w-1/2 p-4 text-gray-100"
            name="password"
            type="password"
            placeholder="Password"
          />
          <input
            className="bg-transparent border-2 my-4 border-input-border rounded-[5px] h-16 w-1/2 p-4 text-gray-100"
            type="password"
            placeholder="Re-enter Password"
          />
          <button className="bg-[#ffbb00] mt-10 font-bold w-1/4 h-10 rounded-[5px] flex justify-center items-center text-base">
            Register
          </button>
        </form>
      </div>
      <img
        src="Register.svg"
        alt="Register"
        className="flex-1 h-[500px] w-[500px]"
      />
    </div>
  )
}

export default Login
