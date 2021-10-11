const express = require('express');
const cors = require('cors')
const app = express();

// Middlewares
app.use(express.json())
app.use(cors())

// Import routes
const coursesRoute = require("./routes/courses")
const trainersRoute = require("./routes/trainers")

app.use("/courses", coursesRoute)
app.use("/trainers", trainersRoute)

const trainerRoute = require('./routes/quiz')

app.use('/quiz', trainerRoute)

app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});
