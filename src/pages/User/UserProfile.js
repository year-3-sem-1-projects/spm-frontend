import Navbar from '../../components/Navbar/Navbar'
import PostPanel from '../../components/PostPanel/PostPanel'
import ProgressPanel from '../../components/ProgressPanel/ProgressPanel'
import jwt_decode from 'jwt-decode'

const UserProfile = () => {
    const decodedToken = jwt_decode(localStorage.getItem('token')).data
    console.log(decodedToken)
  return (
    <div>
        <Navbar />
        <div className='flex flex-col px-28'>
            <div className=' relative flex'>
                <img src="https://images.unsplash.com/photo-1521117184087-0bf82f2385ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" alt="Cover image" className='h-[20rem] w-[85rem]'/>
                <div className='absolute h-24 w-24 bg-blue-400 -bottom-5 left-8'>
                    <img src='https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png' alt='profileImage' className='w-full h-full object-cover' />
                </div>
            </div>  
            <div className='h-7 w-full mt-10 flex justify-between'>
                <span className='text-2xl font-inter font-bold'>@{decodedToken.username}</span>
                <button className='bg-[#1976D2] text-white p-2 flex text-center items-center rounded-sm'>
                    Edit Profile
                </button>
            </div>
        </div>
        <br></br>
        <hr></hr>
        <div className=' flex px-28 mt-7'>
            <div className='w-[80rem] h-96 flex'>
                <div className='flex-1'>
                    <ProgressPanel />
                </div>
                <div className='flex-[3] p-4'>
                    <PostPanel />
                </div>

            </div>
        </div>
    </div>
  )
}

export default UserProfile