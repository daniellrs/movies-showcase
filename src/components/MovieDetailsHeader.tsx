import React from 'react'
import { makeStyles } from '@material-ui/core'

interface MovieDetailsHeaderProps {
  backdropUrl: string;  
}

const MovieDetailsHeader: React.FC<MovieDetailsHeaderProps> = (props) => {
  const classes = useStyles()

  return (
    <div 
      style={{backgroundImage: `url(${props.backdropUrl})`}}        
      className={classes.backdrop}
    />
  )
}

const useStyles = makeStyles({
  backdrop: {
    boxShadow: 'inset 0 120px 90px -50px #000',
    width: '100%',
    height: 500,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
})

export default MovieDetailsHeader