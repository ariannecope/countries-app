import { useState, useEffect } from 'react';

function SavedCountries() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');
    // create a state variable to hold the new user info
  const [newUserName, setNewUserName] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      email,
      country,
      bio
    });
  };

  // write a function for getting and displaying the user name
  const getUserNewestInfo = async () => {
    const response = await fetch(
      "api/get-newest-user"
    );
    const data = await response.json();
    setNewUserName(data[0].name);
  };

  console.log('new user:', newUserName);

  useEffect(() => {
    getUserNewestInfo();
  }, []);


 return (
  <>
    <div className="page-wrapper">
      {newUserName && <h2 className="welcome">Welcome! {newUserName}</h2>}

      <div className="saved-container">
        <h1>Saved Countries</h1>

        <form className="saved-form" onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  </>
);
}

export default SavedCountries;