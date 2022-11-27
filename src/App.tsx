import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './App.css'
import ForgotPassword from "./components/ForgotPassword";
import Login from './components/Login'
import Register from "./components/Register";

import {Amplify} from 'aws-amplify';

/** Amplify config */
import awsconfig from './aws-exports';
import Confirm from "./components/Confirm";

/** Configure amplify */
Amplify.configure(awsconfig);

const App = ()  => {

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register /> }/>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
