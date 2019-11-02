import React from 'react'
import { CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { Router } from '@reach/router'
import MoviesList from './views/MoviesList'
import MovieDetails from './views/MovieDetails'
import GeneralLoading from './components/GeneralLoading'
import { get } from './common/utils'

const App: React.FC = () => {
  const [configurations, setConfigurations] = React.useState()
  const [genres, setGenres] = React.useState()

  React.useEffect(() => {
    loadConfigurations()
    loadGenres()
  }, [])

  const loadConfigurations = async () => {
    const response = await get('/configuration')
    setConfigurations(response)
  }

  const loadGenres = async () => {
    const response = await get('/genre/movie/list')
    setGenres(response.genres)
  }

  /**
   * Given a list of genre ids, return a string 
   * with the name of genres separeted with commas
   */
  const getGenresText = (genreIds: number[] = []): string => {
    if(!genres) return ''

    const genreNames: string[] = []
    
    genreIds.forEach((id: number) => {
      const genreMatch = genres.filter((genre: {id: number}) => genre.id === id)
      if(!genreMatch || !genreMatch[0]) return

      genreNames.push(genreMatch[0].name)
    })
    
    return genreNames.join(', ')
  }
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {configurations && genres ?
        <Router>
          <MoviesList 
            path='/' 
            configurations={configurations}
            getGenresText={getGenresText}
          />
          <MovieDetails 
            path=':movieId'
            configurations={configurations}
            getGenresText={getGenresText} 
          />
        </Router>
          :
        <GeneralLoading />
      }

    </ThemeProvider>
  )
}

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

export default App