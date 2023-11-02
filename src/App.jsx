import React, { useState, useEffect } from "react";

function App() {
  const [lengthNumber, setCharCount] = useState(0);
  const maxCharCount = 20;

  const sliderValue = (lengthNumber / maxCharCount) * 100;

  const backgroundStyle = {
    background: `linear-gradient(to right, var(--Neon-Green, #a4ffaf) ${sliderValue}%, black ${sliderValue}%)`,
  };

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [backgroundColor1, setBackgroundColor1] = useState("transparent");
  const [backgroundColor2, setBackgroundColor2] = useState("transparent");
  const [backgroundColor3, setBackgroundColor3] = useState("transparent");
  const [backgroundColor4, setBackgroundColor4] = useState("transparent");

  const [display1, setDisplay1] = useState("none");
  const [display2, setDisplay2] = useState("none");
  const [display3, setDisplay3] = useState("none");
  const [display4, setDisplay4] = useState("none");

  const calculateStrength = () => {
    const numberOfSelected = selectedCheckboxes.length;

    if (numberOfSelected === 1) {
      setBackgroundColor1("red");
      setBackgroundColor2("transparent");
      setBackgroundColor3("transparent");
      setBackgroundColor4("transparent");
      setDisplay1("block");
      setDisplay2("none");
      setDisplay3("none");
      setDisplay4("none");
    } else if (numberOfSelected === 2) {
      setBackgroundColor1("var(--2---Orange, #FB7C58)");
      setBackgroundColor2("var(--2---Orange, #FB7C58)");
      setBackgroundColor3("transparent");
      setBackgroundColor4("transparent");
      setDisplay2("block");
      setDisplay1("none");
      setDisplay3("none");
      setDisplay4("none");
    } else if (numberOfSelected === 3) {
      setBackgroundColor1("var(--3---Yellow, #F8CD65)");
      setBackgroundColor2("var(--3---Yellow, #F8CD65)");
      setBackgroundColor3("var(--3---Yellow, #F8CD65)");
      setBackgroundColor4("transparent");
      setDisplay3("block");
      setDisplay1("none");
      setDisplay2("none");
      setDisplay4("none");
    } else if (numberOfSelected === 4) {
      setBackgroundColor1("var(--Neon-Green, #A4FFAF)");
      setBackgroundColor2("var(--Neon-Green, #A4FFAF)");
      setBackgroundColor3("var(--Neon-Green, #A4FFAF)");
      setBackgroundColor4("var(--Neon-Green, #A4FFAF)");
      setDisplay4("block");
      setDisplay1("none");
      setDisplay3("none");
      setDisplay2("none");
    } else {
      setBackgroundColor1("transparent");
      setBackgroundColor2("transparent");
      setBackgroundColor3("transparent");
      setBackgroundColor4("transparent");
      setDisplay1("none");
      setDisplay2("none");
      setDisplay3("none");
      setDisplay4("none");
    }
  };

  useEffect(() => {
    // Call calculateStrength whenever selectedCheckboxes change
    calculateStrength();
  }, [selectedCheckboxes]);

  const handleCheckboxClick = (buttonId) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) => {
      const updatedCheckboxes = prevSelectedCheckboxes.includes(buttonId)
        ? prevSelectedCheckboxes.filter((item) => item !== buttonId)
        : [...prevSelectedCheckboxes, buttonId];

      return updatedCheckboxes;
    });
  };

  const [opacity1, setOpacity1] = useState();

  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = () => {
    let charset = "";

    if (selectedCheckboxes.includes("label1")) {
      // Include uppercase letters
      charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (selectedCheckboxes.includes("label2")) {
      // Include lowercase letters
      charset += "abcdefghijklmnopqrstuvwxyz";
    }
    if (selectedCheckboxes.includes("label3")) {
      // Include numbers
      charset += "0123456789";
    }
    if (selectedCheckboxes.includes("label4")) {
      // Include symbols
      charset += "!@#$%^&*()_+-=[]{}|;:'\"<>,.?/~";
    }

    let password = "";
    const charsetLength = charset.length;

    for (let i = 0; i < lengthNumber; i++) {
      const randomIndex = Math.floor(Math.random() * charsetLength);
      password += charset.charAt(randomIndex);
    }

    setGeneratedPassword(password);
    setOpacity1(1);
  };

  const handleGenerateClick = () => {
    generatePassword();
  };

  const [opacity2, setOpacity2] = useState(0);

  const handleCopyClick = () => {
    if (generatedPassword) {
      // Create a temporary textarea element to copy the password and copied-word set to opacity 1
      setOpacity2(1);
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = generatedPassword;
      document.body.appendChild(tempTextArea);

      // Select and copy the password
      tempTextArea.select();
      document.execCommand("copy");

      // Remove the temporary textarea element
      document.body.removeChild(tempTextArea);
    }
  };

  return (
    <div className="main">
      <p className="app-name">Password Generator</p>
      <div className="generated-password-div">
        <p className="generated-password" style={{ opacity: opacity1 }}>
          {generatedPassword}
        </p>
        <div className="copy-div">
          <p className="copied-word" style={{ opacity: opacity2 }}>
            COPIED
          </p>
          <img
            className="copy-icon"
            src="icon-copy.svg"
            alt="copy-icon"
            onClick={handleCopyClick}
          />
        </div>
      </div>
      <div className="content">
        <div className="lengths">
          <p className="length-word">Character Length</p>
          <p className="length-number">{lengthNumber}</p>
        </div>
        <input
          className="range-input"
          type="range"
          min="0"
          max={maxCharCount}
          value={lengthNumber}
          onChange={(e) => setCharCount(parseInt(e.target.value, 10))}
          style={backgroundStyle}
        />
        <div className="checkboxes">
          <div className="checkbox-div">
            <button
              className={`checkbox ${
                selectedCheckboxes.includes("label1") ? "checked" : ""
              }`}
              onClick={() => handleCheckboxClick("label1")}
            >
              {selectedCheckboxes.includes("label1") && (
                <img
                  className="check-icon"
                  src="icon-check.svg"
                  alt="Check Icon"
                />
              )}
            </button>
            <label className="checkbox-label label1" htmlFor="uppercase">
              Include Uppercase Letters
            </label>
          </div>
          <div className="checkbox-div">
            <button
              className={`checkbox ${
                selectedCheckboxes.includes("label2") ? "checked" : ""
              }`}
              onClick={() => handleCheckboxClick("label2")}
            >
              {selectedCheckboxes.includes("label2") && (
                <img
                  className="check-icon"
                  src="icon-check.svg"
                  alt="Check Icon"
                />
              )}
            </button>
            <label className="checkbox-label label2" htmlFor="lowercase">
              Include Lowercase Letters
            </label>
          </div>
          <div className="checkbox-div">
            <button
              className={`checkbox ${
                selectedCheckboxes.includes("label3") ? "checked" : ""
              }`}
              onClick={() => handleCheckboxClick("label3")}
            >
              {selectedCheckboxes.includes("label3") && (
                <img
                  className="check-icon"
                  src="icon-check.svg"
                  alt="Check Icon"
                />
              )}
            </button>
            <label className="checkbox-label label3" htmlFor="numbers">
              Include numbers
            </label>
          </div>
          <div className="checkbox-div">
            <button
              className={`checkbox ${
                selectedCheckboxes.includes("label4") ? "checked" : ""
              }`}
              onClick={() => handleCheckboxClick("label4")}
            >
              {selectedCheckboxes.includes("label4") && (
                <img
                  className="check-icon"
                  src="icon-check.svg"
                  alt="Check Icon"
                />
              )}
            </button>
            <label className="checkbox-label label4" htmlFor="symbols">
              Include symbols
            </label>
          </div>
        </div>
        <div className="strength-div">
          <p className="strength-word">STRENGTH</p>
          <div className="strengthLevel-and-bloxes">
            <p
              className="strength-level too-weak"
              style={{ display: display1 }}
            >
              TOO WEAK{" "}
            </p>
            <p className="strength-level weak" style={{ display: display2 }}>
              WEAK
            </p>
            <p className="strength-level medium" style={{ display: display3 }}>
              MEDIUM
            </p>
            <p className="strength-level strong" style={{ display: display4 }}>
              STRONG
            </p>
            <div className="bloxes">
              <div
                className="blox first-blox"
                style={{
                  backgroundColor: backgroundColor1,
                  backgroundColor2,
                  backgroundColor3,
                  backgroundColor4,
                }}
              ></div>
              <div
                className="blox second-blox"
                style={{
                  backgroundColor: backgroundColor2,
                  backgroundColor3,
                  backgroundColor4,
                }}
              ></div>
              <div
                className="blox third-blox"
                style={{ backgroundColor: backgroundColor3, backgroundColor4 }}
              ></div>
              <div
                className="blox fourth-blox"
                style={{ backgroundColor: backgroundColor4 }}
              ></div>
            </div>
          </div>
        </div>
        <button className="generate-button" onClick={handleGenerateClick}>
          <div className="generate-and-arrowIcon">
            GENERATE
            <img
              className="arrowIcon"
              src="icon-arrow-right.svg"
              alt="Arrow Icon"
            />
          </div>
        </button>
      </div>
    </div>
  );
}

export default App;
