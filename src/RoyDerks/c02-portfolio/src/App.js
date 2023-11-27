import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './assets/logo.svg';
import Header from './components/Header';
import Profile from './pages/Profile';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header logo={logo} />
        
        <Routes>
          <Route 
            path='/'
            element={<Profile username='octocat' />}
          />
          <Route 
            path='/projects'
            element={<Projects username='octocat' />}
          />
          <Route 
            path='/projects/:name'
            element={<ProjectDetail username='octocat' />}
          />
          <Route 
            path='*'
            element={<div>Page Not Found</div>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
