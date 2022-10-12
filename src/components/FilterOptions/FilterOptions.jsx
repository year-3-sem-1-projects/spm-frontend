import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Paper,
  Typography,
} from '@mui/material'
import React from 'react'
import Categories from '../../constants/categories'

const FilterOptions = ({ handleClick, isDefaultChecked=false }) => {
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
            control={isDefaultChecked? <Checkbox defaultChecked /> : <Checkbox />}
            label="All Categories"
            onChange={e => handleClick(`ALL`, e.target.checked)}
            sx={{
              color: 'black',
            }}
          />
          {Categories.map(category => (
            <FormControlLabel
              control={<Checkbox />}
              label={`${category.label}`}
              onChange={e => handleClick(category.value, e.target.checked)}
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
