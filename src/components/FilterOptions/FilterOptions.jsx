import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from '@mui/material'
import React from 'react'
import Categories from '../../constants/Categories'

const FilterOptions = ({ handleClick }) => {
  return (
    <>
      <Paper className={`p-5`} elevation={3}>
        <Typography
          variant="h5"
          className={`pb-3`}
          sx={{
            fontWeight: 'bold',
          }}
        >
          Categories
        </Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={`All Categories`}
            onChange={e => handleClick(`ALL`, e.target.checked)}
            sx={{
              color: 'black',
            }}
          />
          {Categories.map(category => (
            <FormControlLabel
              control={<Checkbox />}
              label={category}
              onChange={e => handleClick(category, e.target.checked)}
              sx={{
                color: 'black',
              }}
            />
          ))}
        </FormGroup>
      </Paper>
    </>
  )
}

export default FilterOptions
