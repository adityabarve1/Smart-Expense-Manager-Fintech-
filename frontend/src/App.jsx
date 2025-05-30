import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import SignIn from './components/SignIn';
import Dashboard from "./components/DashboardComponents/Dashboard";
import Features from './components/features';
function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>}></Route>
        <Route path="/features" element={<Features />} />
        <Route path='/signin' element={<SignIn/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
