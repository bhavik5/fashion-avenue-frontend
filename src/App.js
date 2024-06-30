import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import TitleAndHandle from './components/TitleAndHandle';
import TextEdit from './components/TextEdit';
import ControlRoom from './components/ControlRoom';
import Content from './components/Content';
import Dashboard from "./components/Dashboard";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/controlroom' element={<ControlRoom />} />
          <Route path='/textedit/:title'  element={<TextEdit />} />
          <Route path='/content/:title' element={<Content />} />
          <Route path='/titleandhandle' element={<TitleAndHandle />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/forgetpassword' element={<ForgetPassword />} />
          <Route path='/resetpassword/:id' element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
