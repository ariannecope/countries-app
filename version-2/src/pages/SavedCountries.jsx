import { useState, useEffect } from 'react';

function SavedCountries() {
  // state for newest saved user, wth null for default value since data will be an object but hasn't loaded yet
  const [newUserName, setNewUserName] = useState(null);

  // form state--initialized state with an object that matches the structure of the form fields
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    bio: '',
  });

  // GET request--async function with try ... await ... catch pattern
  const getUserNewestInfo = async () => {
    try {
      const response = await fetch(
        'https://backend-answer-keys.onrender.com/get-newest-user'
      );

      const data = await response.json();
// grab the first user in the response array and save their name in the NewUserName state
      setNewUserName(data[0].name);
    } catch (error) {
      console.log('Error fetching newest user:', error);
    }
  };

  // update state as user types
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // POST request
  // async function sends new user data to the backend API
  const storeUserData = async (data) => {
    try {
      // send POST request to backend endpoint
      const response = await fetch(
        'https://backend-answer-keys.onrender.com/add-one-user',
        {
          // tell fetch this is a POST request
          method: 'POST',
          // headers describe information about the request
          headers: {
            // tell the backend we are sending JSON data
            'Content-Type': 'application/json',
          },
       // body contains the data being sent to the server
        // JSON.stringify converts the JavaScript object into JSON text
          body: JSON.stringify({
            // match frontend form fields to backend database field names
            name: data.fullName,
            country_name: data.country,
            email: data.email,
            bio: data.bio,
          }),
        }
      );

      // convert server response from JSON text into a JavaScript object
      const result = await response.json();

      console.log('User saved:', result);

      // refresh newest user after saving
      getUserNewestInfo();

    } catch (error) {
      console.log('Error saving user:', error);
    }
  };

  // form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    storeUserData(formData);

    // clear form
    setFormData({
      fullName: '',
      email: '',
      country: '',
      bio: '',
    });
  };

  // run once on page load using the empty dependency array
  useEffect(() => {
    getUserNewestInfo();
  }, []);

 return (
  <div className="page-wrapper">
    <div className="saved-container">
      <h1>Saved Countries</h1>

      {newUserName && (
        <h2 className="welcome">
          Welcome back, {newUserName}!
        </h2>
      )}

      <form className="saved-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Name"
          value={formData.fullName}
          onChange={handleInputChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleInputChange}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleInputChange}
        />

        <button type="submit">Save User</button>
      </form>
    </div>
  </div>
);
}
export default SavedCountries;