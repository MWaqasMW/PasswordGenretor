import React, { useState, useCallback, useRef } from "react";

const App = () => {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordInputRef = useRef(null);

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const handleNumAllowedChange = () => {
    setNumAllowed(!numAllowed);
  };

  const handleSpecialCharAllowedChange = () => {
    setSpecialCharAllowed(!specialCharAllowed);
  };

  const generatePassword = useCallback(() => {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numAllowed) charset += "0123456789";
    if (specialCharAllowed) charset += "!@#$%^&*()_+";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset.charAt(randomIndex);
    }

    setPassword(newPassword);
  }, [length, numAllowed, specialCharAllowed]);

  const handleCopyClick = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 bg-gray-700 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4">Password Generator</h1>
        <div className="mb-4">
          <label htmlFor="passwordLength" className="block text-sm font-medium">
            Password Length:
          </label>
          <input
            type="number"
            id="passwordLength"
            value={length}
            onChange={handleLengthChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:border-blue-400 text-black "
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">
            <input
              type="checkbox"
              checked={numAllowed}
              onChange={handleNumAllowedChange}
              className="mr-2"
            />
            Include Numbers
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">
            <input
              type="checkbox"
              checked={specialCharAllowed}
              onChange={handleSpecialCharAllowedChange}
              className="mr-2"
            />
            Include Special Characters
          </label>
        </div>
        <button
          onClick={generatePassword}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Generate Password
        </button>
        <div className="mt-4 relative">
          <label className="block text-sm font-medium">Generated Password:</label>
          <input
            type="text"
            value={password}
            ref={passwordInputRef}
            className="w-full mt-1 p-2 border rounded bg-gray-800 text-gray-300 focus:outline-none"
            readOnly
          />
          <button
            onClick={handleCopyClick}
            className="absolute top-0 right-0 p-2 bg-gray-600 text-white rounded"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
