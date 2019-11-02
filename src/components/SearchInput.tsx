import React from 'react'
import { makeStyles, FormControl, OutlinedInput, InputAdornment, Icon } from '@material-ui/core'

interface SearchInputProps {
  value: string;  
  setValue(value: string): void;  
}

const SearchInput: React.FC<SearchInputProps> = (props) => {
  const classes = useStyles()

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.setValue(e.target.value)
  }

  return (
    <FormControl className={classes.container} variant='outlined' fullWidth>
      <OutlinedInput
        value={props.value}
        onChange={changeValue}
        labelWidth={0}
        placeholder='Search movies...'
        className={classes.input}
        startAdornment={
          <InputAdornment position="start">
            <Icon>search</Icon>
          </InputAdornment>
        }
      />
    </FormControl>
  )
}

const useStyles = makeStyles({
  container: {
    padding: 35,
  },
  input: {
    background: '#252525',
    borderRadius: 4,
    '&.Mui-focused fieldset': {
      borderColor: '#fff !important'
    }
  }
})

export default SearchInput