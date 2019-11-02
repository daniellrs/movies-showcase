import React from 'react'
import { Grid, makeStyles, CircularProgress } from '@material-ui/core'

const SimpleLoading: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid 
      container 
      justify='center' 
      alignItems='center'
      className={classes.container}
    >
      <CircularProgress 
        className={classes.spinner}
      />
    </Grid>
  )
}

const useStyles = makeStyles({
  container: {
    padding: 35
  },
  spinner: {
    color: '#fff'
  },
})

export default SimpleLoading