import React from 'react'
import { Grid, makeStyles, CircularProgress, Fade } from '@material-ui/core'

const GeneralLoading: React.FC = () => {
  const classes = useStyles()

  return (
    <Grid 
      container 
      justify='center' 
      alignItems='center'
      className={classes.container}
    >
      <Fade
        in
        style={{transitionDelay: '500ms'}}
        unmountOnExit
      >
        <CircularProgress 
          size={60}
          className={classes.spinner}
        />
      </Fade>
    </Grid>
  )
}

const useStyles = makeStyles({
  container: {
    height: '100vh'
  },
  spinner: {
    color: '#fff'
  },
})

export default GeneralLoading