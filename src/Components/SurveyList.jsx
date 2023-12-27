import { useState, useEffect } from "react";
import "./SurveyList.css"; // Import your CSS file

const SurveyList = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Fetch previous survey submissions from the backend
    const fetchSubmissions = async () => {
      try {
        const response = await fetch("/api/getSubmissions");
        if (response.ok) {
          const data = await response.json();
          setSubmissions(data);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
        // Handle error feedback to the user
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="survey-list-container">
      <h2 className="survey-list-heading">Previous Survey Submissions</h2>
      <ul className="submission-list">
        {submissions.map((submission, index) => (
          <li className="submission-item" key={index}>
            {/* Render submission data */}
            {submission.name} - {submission.email}
            {/* Display other submission fields similarly */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyList;


