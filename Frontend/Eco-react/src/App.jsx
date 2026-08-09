import { Routes, Route } from "react-router-dom";
import Chatbot from "../src/pages/Chatbot/Chatbot";
import Home from "../src/pages/Home/Home";
import Quiz from "../src/pages/Quiz/Quiz";
import Navbar from "../src/Component/Navbar/Navbar";
import ClimatePage from "../src/pages/gridpages/Climate";
import Deforestation from "./pages/gridpages/Deforestation";
import  Plastic  from "./pages/gridpages/plastic";
import Register from "../src/pages/Register/Register"
import Login from "../src/pages/Login/Login"
import Dashboard from "../src/pages/Dashboard/Dashboard"
const App = () => {
  return (
    <div>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/climate" element={<ClimatePage />} />
          <Route path="/deforestation" element={<Deforestation />} />
          <Route path="/plastic" element={<Plastic />} />
          <Route path="/register" element = {<Register/>} />
          <Route path="/login" element = {<Login/>} />
          <Route path="/dashboard" element = {<Dashboard />} />
        </Routes>
      </>
    </div>
  );
};

export default App;
