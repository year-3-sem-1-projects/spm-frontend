import React from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/User'

const Login = () => {
  const navigate = useNavigate()

  const handleForm = async e => {
    e.preventDefault()
    await login({
      email: e.target.email.value,
      password: e.target.password.value,
    })
      .then(res => {
        localStorage.setItem('token', res.data.data.access_token)
        navigate('/')
      })
      .catch((err) => {
        alert(err.response.statusText)
      })
  }
  const onRegisterClick = () => {
    navigate('/register')
  }
  return (
    <div className="flex justify-center items-center ">
      <img src="Login.svg" alt="Login" className="flex-1 h-[500px] w-[500px]" />
      <div className="flex flex-col flex-1 bg-black justify-center h-screen">
        <form onSubmit={handleForm} className="flex flex-col items-center">
          <span className="font-medium text-3xl text-white ">Login</span>
          <input
            className="bg-transparent border-2 my-4 border-input-border rounded-[5px] h-16 w-1/2 p-4 text-gray-100"
            name="email"
            type="email"
            placeholder="Email"
          />
          <input
            className="bg-transparent border-2 border-input-border rounded-[5px] h-16 w-1/2 p-4 text-gray-100"
            name="password"
            type="password"
            placeholder="Password"
          />
          <button className="bg-[#222AB9] mt-10 text-white w-1/4 h-10 rounded-[5px] flex justify-center items-center text-base font-normal">
            Login
          </button>
          <button className="bg-[#535ada] mt-10 text-white w-1/4 h-10 rounded-[5px] flex justify-center items-center text-base font-normal" onClick={onRegisterClick}>
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
