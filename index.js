// Importing the Express module
const express = require("express");

// Creating a new instance of the Express application
const app = express();

// Parsing incoming JSON payloads
app.use(express.json());

// HTML template to be used in responses
const htmlTemplate = `
<html>
  <head>
    <title>Calculator Result</title>
    <style>
      body {
        font-family: Arial, sans-serif;
      }
      h1 {
        color: #008080;
      }
      .result {
        font-size: 24px;
        font-weight: bold;
        color: #008080;
      }
    </style>
  </head>
  <body>
    <h1>{{operation}} Result</h1>
    <p>The {{operation}} of <span class="num">{{num1}}</span> and <span class="num">{{num2}}</span> is <span class="result">{{result}}</span></p>
  </body>
</html>
`;

// Function to perform addition
function add(num1, num2) {
  try {
    // Check if the input parameters are numbers
    if (isNaN(num1) || isNaN(num2)) {
      throw new Error("Invalid input: both parameters must be numbers");
    } else if (!num1 || !num2) {
      // Check if the input parameters are not empty
      throw new Error("Invalid input: both parameters are required");
    } else {
      // Perform addition
      return num1 + num2;
    }
  } catch (error) {
    // Log any errors and return the error message
    console.error(error.message);
    return error.message;
  }
}

// Function to perform subtraction
function subtract(num1, num2) {
  try {
    // Check if the input parameters are numbers
    if (isNaN(num1) || isNaN(num2)) {
      throw new Error("Invalid input: both parameters must be numbers");
    } else if (!num1 || !num2) {
      // Check if the input parameters are not empty
      throw new Error("Invalid input: both parameters are required");
    } else {
      // Perform subtraction
      return Math.abs(num1 - num2);
    }
  } catch (error) {
    // Log any errors and return the error message
    console.error(error.message);
    return error.message;
  }
}

// Function to perform multiplication
function multiply(num1, num2) {
  try {
    // Check if the input parameters are numbers
    if (isNaN(num1) || isNaN(num2)) {
      throw new Error("Invalid input: both parameters must be numbers");
    } else if (!num1 || !num2) {
      // Check if the input parameters are not empty
      throw new Error("Invalid input: both parameters are required");
    } else {
      // Perform multiplication
      return num1 * num2;
    }
  } catch (error) {
    // Log any errors and return the error message
    console.error(error.message);
    return error.message;
  }
}

// Define function to perform division operation with error handling
function divide(num1, num2) {
  try {
    // Check if both parameters are numbers
    if (isNaN(num1) || isNaN(num2)) {
      throw new Error("Invalid input: both parameters must be numbers");
      // Check if both parameters are not empty
    } else if (!num1 || !num2) {
      throw new Error("Invalid input: both parameters are required");
      // Check if num2 is not zero
    } else if (num2 === 0) {
      throw new Error("Invalid input: cannot divide by zero");
    } else {
      // Perform division operation and return result
      return num1 / num2;
    }
  } catch (error) {
    // Log error to console and return error message
    console.error(error.message);
    return error.message;
  }
}

// Handle GET request to /add endpoint
app.get("/add", (req, res) => {
  // Parse query parameters as floats
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  // Define variables to hold result and error message
  let result;
  let errorMessage = null;

  try {
    // Call add function with parsed parameters
    result = add(num1, num2);
  } catch (err) {
    // Catch error and assign error message to errorMessage variable
    errorMessage = err.message;
  }

  // Replace placeholders in HTML template with values and send response
  const htmlResponse = htmlTemplate
    .replace("{{operation}}", "Addition")
    .replace("{{operation}}", "Addition")
    .replace("{{num1}}", num1)
    .replace("{{num2}}", num2)
    .replace("{{result}}", errorMessage ? errorMessage : result);

  res.send(htmlResponse);
});

// Handle GET request to /subtract endpoint
app.get("/subtract", (req, res) => {
  // Parse query parameters as floats
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  // Define variables to hold result and error message
  let result;
  let errorMessage = null;

  try {
    // Call subtract function with parsed parameters
    result = subtract(num1, num2);
  } catch (err) {
    // Catch error and assign error message to errorMessage variable
    errorMessage = err.message;
  }

  // Replace placeholders in HTML template with values and send response
  const htmlResponse = htmlTemplate
    .replace("{{operation}}", "Subtraction")
    .replace("{{operation}}", "Subtraction")
    .replace("{{num1}}", num1)
    .replace("{{num2}}", num2)
    .replace("{{result}}", errorMessage ? errorMessage : result);

  res.send(htmlResponse);
});

// Route handler for multiplication endpoint
app.get("/multiply", (req, res) => {
  // Extracting values of num1 and num2 from request query parameters
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  // Initializing result and errorMessage variables
  let result;
  let errorMessage = null;

  // Trying to perform multiplication and catching any errors
  try {
    result = multiply(num1, num2);
  } catch (err) {
    errorMessage = err.message;
  }

  // Generating HTML response using template and replacing placeholders with actual values
  const htmlResponse = htmlTemplate
    .replace("{{operation}}", "Multiplication")
    .replace("{{operation}}", "Multiplication")
    .replace("{{num1}}", num1)
    .replace("{{num2}}", num2)
    .replace("{{result}}", errorMessage ? errorMessage : result);

  // Sending HTML response to client
  res.send(htmlResponse);
});

// Route handler for division endpoint
app.get("/divide", (req, res) => {
  // Extracting values of num1 and num2 from request query parameters
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  // Initializing result and errorMessage variables
  let result;
  let errorMessage = null;

  // Trying to perform division and catching any errors
  try {
    result = divide(num1, num2);
  } catch (err) {
    errorMessage = err.message;
  }

  // Generating HTML response using template and replacing placeholders with actual values
  const htmlResponse = htmlTemplate
    .replace("{{operation}}", "Division")
    .replace("{{operation}}", "Division")
    .replace("{{num1}}", num1)
    .replace("{{num2}}", num2)
    .replace("{{result}}", errorMessage ? errorMessage : result);

  // Sending HTML response to client
  res.send(htmlResponse);
});

// Route handler for root endpoint
app.get("/", (req, res) => {
  // HTML template for root endpoint
  const html = `
    <html>
      <head>
        <title>Calculator Microservice</title>
        <style>
          body {
            font-family: sans-serif;
          }
          h1 {
            color: #009688;
          }
          p {
            font-size: 1.2em;
          }
        </style>
      </head>
      <body>
        <h1>Welcome to Calculator Microservice</h1>
        <p>Usage:</p>
        <ul>
          <li>To add two numbers: /add?num1=5&num2=3</li>
          <li>To subtract two numbers: /subtract?num1=5&num2=3</li>
          <li>To multiply two numbers: /multiply?num1=5&num2=3</li>
          <li>To divide two numbers: /divide?num1=5&num2=3</li>
        </ul>
        <p>By Rohit Bajaj</p>
        <p>StudentID - 221036191</p>
      </body>
    </html>
  `;
  // Sending HTML response to client
  res.send(html);
});

// Starting the server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log('Calculator microservice listening at http://localhost: 3000');
});
