import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verify } from '../../services/User'

const Login = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const handleForm = async e => {
    e.preventDefault()
    await verify({
      email: searchParams.get('email'),
      verificationCode: e.target.verificationCode.value,
    })
      .then(res => {
        navigate('/login')
      })
      .catch(e => console.error(e))
  }
  return (
    <div className="flex justify-center items-center ">
      <img src="Verify.svg" alt="Verify" className="flex-1 h-[500px] w-[500px]" />
      <div className="flex flex-col flex-1 bg-black justify-center h-screen">
        <form onSubmit={handleForm} className="flex flex-col items-center">
          <span className="font-medium text-3xl text-white ">Enter Verification Code</span>
          <input
            className="bg-transparent border-2 my-4 border-input-border rounded-[5px] h-16 w-1/2 p-4 text-gray-100"
            name="verificationCode"
            type="number"
            placeholder="Verification Code"
          />
          <button className="bg-[#ffbb00] font-bold mt-10 w-1/4 h-10 rounded-[5px] flex justify-center items-center text-base font-normal">
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
