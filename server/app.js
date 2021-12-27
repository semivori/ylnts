const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors())

const members = require('./routes/members');
app.use('/members', members);


app.use(express.static(__dirname + '/../client/dist/'));
app.get('/', (req, res) => res.sendFile(__dirname + '/../client/dist/index.html'));

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
