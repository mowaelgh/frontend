const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for requests from http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
// Your other routes and middleware...

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
