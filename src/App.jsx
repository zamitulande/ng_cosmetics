import './App.css'
import { Box, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material'
import Routes from './components/routes/Routes'
import getTheme from './components/configs/Theme'


function App() {
  let theme = createTheme(getTheme("pink"));
  theme = responsiveFontSizes(theme);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box>
          <Routes />
        </Box>
      </ThemeProvider>
    </>
  )

}

export default App
