import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(input);
      const apiResponse = await axios.post('https://<your-netlify-site-url>/api/bfhl', parsedInput);
      setResponse(apiResponse.data);
      setShowDropdown(true);
    } catch (err) {
      setError('Invalid JSON format. Please correct it and try again.');
    }
  };

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_alphabet } = response;
    const selectedData = {};

    if (selectedOptions.includes('Numbers')) {
      selectedData.numbers = numbers;
    }
    if (selectedOptions.includes('Alphabets')) {
      selectedData.alphabets = alphabets;
    }
    if (selectedOptions.includes('Highest alphabet')) {
      selectedData.highest_alphabet = highest_alphabet;
    }

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(selectedData, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>ABCD123</h1> {/* Replace with your roll number */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder='Enter JSON here, e.g., {"data": ["A", "C", "z"]}'
          rows="4"
          cols="50"
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {showDropdown && (
        <div>
          <label>Select Response Options:</label>
          <select multiple onChange={handleSelectChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest alphabet">Highest alphabet</option>
          </select>
        </div>
      )}
      {renderResponse()}
    </div>
  );
};

export default App;
