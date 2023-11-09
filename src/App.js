// App.js
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

  
import Home from './pages/Home';
import RecommendationPage from './pages/RecommendationPage';
import Charts from './pages/Charts';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import TopNavbar from './components/TopNavBar'; 

function App() {
  return (
    <Router>
      <div className="App wrap">
        <TopNavbar/>  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommendation" element={<RecommendationPage />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> 
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
