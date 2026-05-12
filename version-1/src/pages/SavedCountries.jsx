import { useState } from 'react';

function SavedCountries() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      name,
      email,
      country,
      bio
    });
  };

  return (
    <div>
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

  );
}

export default SavedCountries;