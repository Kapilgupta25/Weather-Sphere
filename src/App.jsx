import { Routes, Route } from "react-router-dom";
import GettingStarted from "./pages/GettingStarted";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
        <Route path="/" element={<GettingStarted />} />
        <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
