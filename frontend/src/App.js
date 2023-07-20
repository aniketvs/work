
import './App.css';
import { BrowserRouter, Form, Route, Routes } from "react-router-dom";
import FormData from './components/FormData';
import 'bootstrap/dist/css/bootstrap.min.css'
import Page from './components/Page';
function App() {
  return (
  <>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<FormData/>}/>
      <Route path="/page" element={<Page/>}/>
    </Routes>
   </BrowserRouter>
    
  </>
  );
}

export default App;
