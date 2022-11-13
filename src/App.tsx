import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './App.css'
import SignIn from './components/SignIn'
import SignUp from "./components/SignUp";

const App = ()  => {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp /> }/>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
