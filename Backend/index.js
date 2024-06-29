const connectToMongo = require('./db');
var cors = require('cors')
connectToMongo();
const express = require('express')
const app = express()
const port = 5000;

app.use(cors())
// app.get('/', (req, res) => {
//   res.send('Hello World my name is mir murtaza i am from amirabad tral!')
// })
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));


app.listen(port, () => {
  console.log(`iNoteBook Backend listening on port ${port}`)
})