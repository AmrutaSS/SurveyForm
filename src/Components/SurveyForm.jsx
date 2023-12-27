import { useState,useEffect } from "react";
import CountryList from "country-list";
import validator from "validator";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";


import "./SurveyForm.css";

const SurveyForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    nationality: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const [nameError, setNameError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneTouched, setPhoneTouched] = useState(false);
  
  const countries = CountryList.getNames();
  const isAlphabetsOnly = (input) => /^[A-Za-z\s]+$/.test(input);


  useEffect(() => {
    const validateEmail = () => {
      const { email } = formData;
      if (emailTouched && (!email || !validator.isEmail(email))) {
        setFormData((prevData) => ({
          ...prevData,
          emailError: "Please enter a valid email address.",
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          emailError: "",
        }));
      }
    };
  
    validateEmail();
  }, [emailTouched, formData.email]); // Add emailTouched and formData.email as dependencies
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Validate based on the field name
    switch (name) {
      case "name":
        if (!isAlphabetsOnly(value)) {
          // Display an error message or take appropriate action
          // Clear the input field if validation fails
          setFormData({ ...formData, [name]: "" });
          setNameError("Please enter a valid name.");
          return;
        } else {
          setNameError(""); // Clear the name error if validation passes
        }
        break;

      case "gender":
        if (!value) {
          // Display an error message for gender
          setGenderError("* Please select the gender");
        } else {
          // Clear the gender error if a valid option is selected
          setGenderError("");
        }
        break;

      case "nationality":
        if (!value) {
          // Display an error message or take appropriate action
          setFormData({ ...formData, [name]: value, nationalityError: "Please select a nationality." });
        } else {
          setFormData({ ...formData, [name]: value, nationalityError: "" });
        }
        break;

      case "email":
        setEmailTouched(true); // Mark the email field as touched on input change
        break;

      // case "phone":
      //   setFormData(true); // Mark the phone field as touched on input change
      //   break;

      case "phone":
        setPhoneTouched(true); // Mark the phone field as touched on input change
        // If validation passes, update the form data
        setFormData({ ...formData, [name]: value });
        break;
    
      default:
        break;
    }

    // If validation passes, update the form data
    setFormData({ ...formData, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
  
    // Handle additional validation or actions on blur if needed
    switch (name) {
      case "nationality":
        if (!value) {
          // Display an error message or take appropriate action
          setFormData({ ...formData, nationalityError: "Please select a nationality." });
        }
        break;

      case "phone":
        setEmailTouched(true); // Fix: Mark the email field as touched on input change
        // Handle additional validation or actions for phone if needed
        break;

      // Add more cases for other fields if needed
  
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Validate the name before submitting the form
      if (!formData.name) {
        setNameError("Please enter your name.");
        return;
      } else {
        setNameError(""); // Clear the name error if validation passes
      }
  
      // Add your form submission logic here
      console.log("Form data submitted:", formData);
  
      // Simulate an asynchronous operation (replace with your actual logic)
      await new Promise((resolve) => setTimeout(resolve, 1000));
  
      // Redirect to the survey list page
      window.location.href = "/survey-list";
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle the error appropriately (e.g., display an error message)
    }
  };
  

  return (
    <div className="main-container">
      <h1 className="form-heading">Survey Form</h1>
      <form className="survey-form" onSubmit={handleSubmit}>
       
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            className={`input-field${nameError ? " error" : ""}`}
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={() => {
              if (!formData.name) {
                setNameError("Please enter your name.");
              } else {
                setNameError(""); // Clear the name error if validation passes
              }
            }}
          />
          {nameError && <div className="error-message">{nameError}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            className={`input-field${genderError ? " error" : ""}`}
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            onBlur={() => {
              if (!formData.gender) {
                setGenderError("* Please select the gender");
              }
            }}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {genderError && <div className="error-message">{genderError}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="nationality">Nationality:</label>
          <select
            id="nationality"
            className="input-field"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            onBlur={handleBlur} // Added onBlur event
          >
            <option value="">Select Nationality</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          {formData.nationalityError && <div className="error-message">{formData.nationalityError}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            className="input-field"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formData.emailError && <div className="error-message">{formData.emailError}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <PhoneInput
            inputProps={{
              name: "phone",
              required: true,
            }}
            country={"us"}
            value={formData.phone}
            onChange={(phone) => setFormData({ ...formData, phone })}
            onBlur={() => setPhoneTouched(true)} // Mark the phone field as touched on blur
          />
          {phoneTouched && !validator.isMobilePhone(formData.phone, "any", { strictMode: false }) && (
            <div className="error-message">Please enter a valid phone number.</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            className="input-field"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            className="input-field"
            name="message"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SurveyForm;






