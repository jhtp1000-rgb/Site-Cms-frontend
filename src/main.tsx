import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme, CssBaseline, StyledEngineProvider } from '@mui/material'
import { ConfigProvider, theme as antdTheme } from 'antd'
import 'antd/dist/reset.css'
import App from './App'
import { colors } from './theme/colors'
import './index.css';

const muiTheme = createTheme({
  palette: { 
    mode: 'light', 
    primary: { 
      main: colors.secondary,
      light: '#6ee7b7',
      dark: colors.hover.secondary,
      contrastText: colors.text.onSecondary,
    },
    secondary: { 
      main: colors.primary,
      light: '#FFFFFF',
      dark: '#E0E0E0',
      contrastText: colors.text.onPrimary,
    },
    background: {
      default: colors.background.default,
      paper: colors.background.paper,
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)',
          },
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <ConfigProvider
          theme={{
            algorithm: antdTheme.defaultAlgorithm,
            token: { 
              colorPrimary: colors.secondary,
              colorLink: colors.secondary,
              colorLinkHover: colors.hover.secondary,
              borderRadius: 8,
              colorBgContainer: colors.background.paper,
            },
          }}
        >
          <App />
        </ConfigProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
