import React from 'react'
import Navbar from '../../components/ui/Navbar'
import Button from '@mui/material/Button'
import SnackBar from '../../components/ui/SnackBar'
import axios from '../../lib/axios'

const index = () => {
  const handleClick = async () => {
    await axios
      .post('/api/test/add', {
        name: 'All Might',
      })
      .then(res => console.log(res))
      .catch(e => console.error(e))
  }
  return (
    <div>
      <Navbar />
      {/* <Button variant="outlined" onClick={() => handleClick()}>
        Primary
      </Button> */}
      {/* <Button /> */}
      {/* <SnackBar message={'Testing...'} /> */}
    </div>
  )
}

export default index
