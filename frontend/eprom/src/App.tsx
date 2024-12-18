import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import Signup from "./components/Signup";

const App = () => {
  return(
    <Routes>
      <Route path="/" element = {<LoginForm/>}/>
      <Route path="/dashboard" element = {<Dashboard/>}/>
      <Route path="/signup" element = {<Signup/>}/>
    </Routes>
  )
}

export default App;