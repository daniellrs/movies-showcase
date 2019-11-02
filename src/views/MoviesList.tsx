import React from 'react'
import { Container } from '@material-ui/core'
import InfiniteScroll from 'react-infinite-scroller'
import { get, sqlToReadableDate } from '../common/utils'
import MovieItem from '../components/MovieItem'
import SimpleLoading from '../components/SimpleLoading'
import SearchInput from '../components/SearchInput'

interface MoviesListProps {
  path: string;
  configurations: any;
  getGenresText(genreIds: number[]): string;
}

let searchTimeout: NodeJS.Timeout

const MoviesList: React.FC<MoviesListProps> = (props) => {
  const mounted = React.useRef(false)
  const [currentPage, setCurrentPage] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(1)
  const [movies, setMovies] = React.useState([])
  const [searchValue, setSearchValue] = React.useState('')

  /**
   * Reset movies array and do the request again when search value changes 
   * It will wait 800ms to make the request to prevent useless requets
   */
  React.useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      setCurrentPage(0)
      setTotalPages(1)
      setMovies([])
    }, 800)
  }, [searchValue])

  const loadSearchedMovies = async () => {
    const response = await get('/search/movie', {query: searchValue, page: currentPage+1})
    processMoviesData(response)
  }

  const loadUpcomingMovies = async () => {
    const response = await get('/movie/upcoming', {page: currentPage+1})
    processMoviesData(response)
  }

  /**
   * Pre-process url images, release date and the genre of the movies
   * and set data in the state
   */
  const processMoviesData = (response: any) => {

    const { results=[], total_pages, page } = response
    
    results.forEach((result: any) => {
      const baseUrl = props.configurations.images.base_url
      const posterSize = 'w185'
      const backDropSize = 'w1280'
      
      result.backdropUrl = `${baseUrl}${backDropSize}${result.backdrop_path}`
      result.posterUrl = `${baseUrl}${posterSize}${result.poster_path}`
      result.genresText = props.getGenresText(result.genre_ids)
      result.readableDate = sqlToReadableDate(result.release_date)
    })
    
    setMovies(([...movies, ...results] as any))
    setTotalPages(total_pages)
    setCurrentPage(page)
  }
  
  return (
    <Container maxWidth='lg' fixed>
      <SearchInput 
        value={searchValue}
        setValue={setSearchValue}
      />

      <InfiniteScroll
        loadMore={searchValue ? loadSearchedMovies : loadUpcomingMovies}
        hasMore={currentPage <= totalPages}
        threshold={1000}
        loader={<SimpleLoading key='0' />}
      >
        {movies.map((movie: {id: number}) => <MovieItem key={movie.id} {...movie} />)}
      </InfiniteScroll>
    </Container>
  )
}

export default MoviesList
