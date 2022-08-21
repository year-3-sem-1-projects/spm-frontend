import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Button from '@mui/material/Button'
import { TextField } from '@mui/material'
import { createTest, readTest } from '../../services/Test'
import imageUpload from '../../utils/imageUpload'

const IMG_PATH = `circle/`

const Circle = () => {
  const [data, setData] = useState()
  const [read, setRead] = useState()
  const [image, setImage] = useState(null)
  const [url, setUrl] = useState(null)

  useEffect(() => {}, [read])

  const handleClick = async () => {
    await createTest({ name: data })
  }
  const handleRead = async () => {
    const d = await readTest()
    setRead(d)
    console.log(read)
  }
  const handleImageUpload = async () => {
    const imageUrl = await imageUpload(image, IMG_PATH)
    setUrl(imageUrl)
  }
  return (
    <div>
      <Navbar />
      <TextField
        id="standard-basic"
        label="Standard"
        variant="standard"
        onInput={e => {
          setData(e.target.value)
        }}
      />
      <Button variant="outlined" onClick={() => handleClick()}>
        Click Me
      </Button>
      <Button variant="outlined" onClick={() => handleRead()}>
        Read Me
      </Button>
      <input
        type="file"
        name=""
        id=""
        onChange={e => {
          setImage(e.target.files[0])
        }}
      />
      <button onClick={handleImageUpload}>Upload Image</button>

      {read ? read.map(r => <p>{r.name}</p>) : <p>No Names</p>}
      {url ? <p>{url}</p> : 'no url'}
    </div>
  )
}

export default Circle
