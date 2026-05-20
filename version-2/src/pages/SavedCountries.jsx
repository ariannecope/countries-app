import { useState, useEffect } from 'react';

function SavedCountries() {
  // state for newest saved user
  const [newUserName, setNewUserName] = useState(null);

  // form state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: '',
    bio: '',
  });

  // GET request
  const getUserNewestInfo = async () => {
    try {
      const response = await fetch(
        'https://backend-answer-keys.onrender.com/get-newest-user'
      );

      const data = await response.json();

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
  const storeUserData = async (data) => {
    try {
      const response = await fetch(
        'https://backend-answer-keys.onrender.com/add-one-user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: data.fullName,
            country_name: data.country,
            email: data.email,
            bio: data.bio,
          }),
        }
      );

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

  // run once on page load
  useEffect(() => {
    getUserNewestInfo();
  }, []);

  return (
    <div>
      <h1>Saved Countries</h1>

      {newUserName && (
        <h2>Welcome back, {newUserName}!</h2>
      )}

      <form onSubmit={handleSubmit}>
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
  );
}

export default SavedCountries;