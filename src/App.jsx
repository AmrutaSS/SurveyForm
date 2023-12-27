// Example of correct import
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import SurveyForm from "./Components/SurveyForm";
import SurveyList from "./Components/SurveyList";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SurveyForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/surveylist" element={<SurveyList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

