import Home from "./pages/Home";
import { Routes, Route } from 'react-router-dom'
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
    <Routes>
    <Route path="/register" element={<Signup/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/" element={<Home/>} />
    </Routes>
    </div>
  );
}

export default App;
