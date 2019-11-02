import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'

interface MovieDetailsOverviewProps {
  posterUrl: string;  
  tagline: string;  
  overview: string;  
}

const MovieDetailsOverview: React.FC<MovieDetailsOverviewProps> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <img
        src={props.posterUrl} 
        className={classes.post}
        alt='post'
      />
      <div className={classes.overviewContainer}>
        <Typography
          variant='h6'
          paragraph
        >
          {props.tagline}
        </Typography>
        <Typography
          variant='subtitle1'
        >
          {props.overview}
        </Typography>
      </div>
    </div>
  )
}

const useStyles = makeStyles({
  post: {
    width: 185,
    height: 278,
    minWidth: 185,
    minHeight: 278
  },
  container: {
    marginTop: 10,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row'
  },
  overviewContainer: {
    paddingLeft: 15,
    '& *': {
      fontWeight: 300,
    }
  },
})

export default MovieDetailsOverview