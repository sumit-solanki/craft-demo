import "./App.css";
import AllInfo from "./Components/AllInfo";
import BuildList from './Components/BuildList';
import AddMeeting  from "./Components/AddMeeting";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<AllInfo />} />
        <Route path="add-a-meeting" element={<AddMeeting />} />
        <Route path="select-building" element={<BuildList /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
