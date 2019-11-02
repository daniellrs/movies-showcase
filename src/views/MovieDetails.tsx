import React from 'react'
import { Grid, Container } from '@material-ui/core'
import { get, sqlToReadableDate } from '../common/utils'
import GeneralLoading from '../components/GeneralLoading'
import MovieDetailsTitle from '../components/MovieDetailsTitle'
import MovieDetailsOverview from '../components/MovieDetailsOverview'
import MovieDetailsHeader from '../components/MovieDetailsHeader'

interface MoviesDetailsProps {
  movieId?: number;
  path: string;  
  configurations: any;
  getGenresText(genreIds: number[]): string;
}

const MoviesDetails: React.FC<MoviesDetailsProps> = (props) => {
  const [details, setDetails] = React.useState()

  React.useEffect(() => {

    /**
     * Get details of a specific movie id
     * and pre-process url images, release date and the genre of the movie 
     */
    const getMovieDetails = async () => {
      const response = await get(`/movie/${props.movieId}`)
      const baseUrl = props.configurations.images.base_url
      const posterSize = 'w185'
      const backDropSize = 'w1280'
      
      response.backdropUrl = `${baseUrl}${backDropSize}${response.backdrop_path}`
      response.posterUrl = `${baseUrl}${posterSize}${response.poster_path}`
      response.genresText = (response.genres || []).map((genre: {name: string}) => genre.name).join(', ')
      response.readableDate = sqlToReadableDate(response.release_date)
  
      setDetails(response)
    }

    getMovieDetails()
  }, [props.movieId, props.configurations.images.base_url])

  return details ? (
    <Grid 
      container
    >
      <MovieDetailsHeader
        backdropUrl={details.backdropUrl}
      />

      <Container maxWidth='lg' fixed>
        <br />

        <Grid container>
          
          <MovieDetailsTitle 
            title={details.title}
            genresText={details.genresText}
            readableDate={details.readableDate}
          />

          <MovieDetailsOverview
            posterUrl={details.posterUrl}
            tagline={details.tagline}
            overview={details.overview}
          />

        </Grid>
      </Container>
    </Grid>
  )
    :
  <GeneralLoading /> 
}

export default MoviesDetails
