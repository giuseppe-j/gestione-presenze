import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './App.css'
import ForgotPassword from "./components/ForgotPassword";
import Login from './components/Login'
import Register from "./components/Register";

const App = ()  => {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register /> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
