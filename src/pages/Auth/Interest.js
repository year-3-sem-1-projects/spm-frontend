import React from 'react'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

const Interest = () => {
  const [formats, setFormats] = React.useState(() => ['bold', 'italic'])

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats)
  }

  console.log(formats)
  return (
    <ToggleButtonGroup
      value={formats}
      onChange={handleFormat}
    >
      <div>
      <ToggleButton value="Science">
        <p>Science</p>
      </ToggleButton>
      <ToggleButton value="Business">
        <p>Business</p>
      </ToggleButton>
      <ToggleButton value="Arts & Design">
        <p>Arts & Design</p>
      </ToggleButton>
      </div>
      <div>
      <ToggleButton value="Crypto">
        <p>Crypto</p>
      </ToggleButton>
      <ToggleButton value="Health">
        <p>Health</p>
      </ToggleButton>
      <ToggleButton value="Music">
        <p>Music</p>
      </ToggleButton>
      </div>
      <ToggleButton value="Technology">
        <p>Technology</p>
      </ToggleButton>
      <ToggleButton value="Nature">
        <p>Nature</p>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default Interest
