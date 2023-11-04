import "./App.css";
import { Typography } from "@mui/material";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <div className="App">
        <Typography variant="h1">Dynastorians</Typography>
        <Home />
      </div>
    </>
  );
}

export default App;
