import "./App.css";
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { router } from "./router.tsx";


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
