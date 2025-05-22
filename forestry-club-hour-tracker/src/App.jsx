import './App.css'
import { ThemeProvider } from "@mui/material/styles"
import theme from './Theme'
import AppRouter from './router/AppRouter'
import Container from 'react-bootstrap/Container'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppRouter />
      </Container>
    </ThemeProvider>
  )
}

export default App