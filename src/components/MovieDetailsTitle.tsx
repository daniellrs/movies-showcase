import React from 'react'
import { Grid, makeStyles, Typography, colors, Button, Icon } from '@material-ui/core'
import { navigate } from '@reach/router'

interface MovieDetailsTitleProps {
  title: string;  
  genresText: string;  
  readableDate: string;  
}

const MovieDetailsTitle: React.FC<MovieDetailsTitleProps> = (props) => {
  const classes = useStyles()

  const goToHomepage = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        
        <Button 
          className={classes.backButton}
          href='/'
          onClick={goToHomepage}
        >
          <Icon>keyboard_arrow_left</Icon>
          Homepage
        </Button>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12} className={classes.relative}>
        
        <Typography
          variant='body2'
          className={classes.releaseDate}
        >
            Release date {props.readableDate}
        </Typography>
        <Typography
          variant='h5'
          paragraph
          className={classes.title}
        >
          {props.title}
        </Typography>
        <Typography
          variant='caption'
          className={classes.genres}
          paragraph
        >
          {props.genresText}
        </Typography>
      </Grid>
    </>
  )
}

const useStyles = makeStyles({
  relative: {
    position: 'relative'
  },
  title: {
    paddingRight: 165,
  },
  genres: {
    color: colors.orange['400'],
    fontWeight: 500,
    textTransform: 'uppercase'
  },
  releaseDate: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: colors.grey['500'],
  },
  backButton: {
    marginBottom: 10,
    paddingLeft: 0,
  },
})

export default MovieDetailsTitle