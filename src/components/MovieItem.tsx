import React from 'react'
import { makeStyles, Grid, Typography, colors } from '@material-ui/core'
import { navigate } from '@reach/router'

const MovieItem: React.FC = (props: any) => {
  const classes = useStyles()
  
  const goToMovieDetails = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(`/${props.id}`)
  }

  return (
    <a 
      href={`/${props.id}`} 
      onClick={goToMovieDetails}
    >
    <Grid 
      container
      className={classes.container}
      style={{backgroundImage: `url(${props.backdropUrl})`}}
      justify='flex-end'
      direction='column'
    >

      <div className={classes.movie_header}>
        <Typography
          variant='body2'
        >
          Release date {props.readableDate}
        </Typography>
      </div>
      
      <img 
        src={props.posterUrl} 
        className={classes.poster}  
        alt='poster'
      />

      <div 
        className={classes.contentArea}
      >
        <Typography
          variant='caption'
          className={classes.genres}
          paragraph
        >
          {props.genresText}
        </Typography>
        <Typography
          variant='h5'
          paragraph
        >
          {props.title}
        </Typography>
        <Typography
          variant='subtitle1'
          className={classes.overview}
        >
          {props.overview}
        </Typography>
      </div>
    </Grid>
    </a>
  )
}

const useStyles = makeStyles({
  container: {
    marginBottom: 35,
    padding: 20,
    height: '290px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    boxShadow: 'inset 0 -80px 300px 100px #000',
    cursor: 'pointer',
    overflow: 'hidden',
    position: 'relative',
    '&:hover img': {
      width: 149.73,
      height: 225,
    }
  },
  poster: {
    width: 123.1,
    height: 185,
    boxShadow: '0 0 18px -10px #000',
    transition: 'all 200ms',
  },
  contentArea: {
    paddingLeft: 15,
    maxWidth: '0%',
    minWidth: 'calc(100% - 149.73px)',
    height: 185,
  },
  genres: {
    color: colors.orange['400'],
    fontWeight: 500,
    textTransform: 'uppercase'
  },
  overview: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: 300,
    maxHeight: 105,
  },
  movie_header: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: 20,
    textAlign: 'right',
    color: colors.grey['500'],
  }
})

export default MovieItem
