const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


const app = express();
const port = 5000;

const corsOptions = {
  origin: 'http://localhost:5173', // Allow requests from this origin
  methods: 'GET,HEAD,POST',
  credentials: true, // Allow including cookies and HTTP authentication information in the request
};

const sleep = ms => new Promise(r => setTimeout(r, ms));

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ message: 'Hello from the server!' });
});


// CHECK EMAILS

const dummyEmails = [
  "john.doe@example.com",
  "jane.smith@example.com",
  "bob.jones@example.com",
  "alice.wonder@example.com",
  "charlie.brown@example.com",
  "emily.white@example.com",
  "david.green@example.com",
  "olivia.black@example.com",
  "michael.grey@example.com",
  "sophia.red@example.com",
  "alex.baker@example.com",
  "grace.parker@example.com",
  "ryan.taylor@example.com",
  "ella.carter@example.com",
  "nathan.hill@example.com",
  "lily.ross@example.com",
  "samuel.evans@example.com",
  "ava.cooper@example.com",
  "liam.murray@example.com",
  "zoey.ward@example.com"
];


app.get('/checkItem/:itemName', (req, res) => {
  const itemName = req.params.itemName;

  if (dummyEmails.includes(itemName)) {
    res.send(true);
  } else {
    res.send(false);
  }
});

app.post('/loginSubmit',async (req,res) => {
  const {email,password} = req.body;
  
  console.log('Response body: ',req.body)
  const hashedPassword = await bcrypt.hash(password,10);

  console.log('Received data:', { email, hashedPassword });
  await sleep(1000*10)
  res.json({message:'Recieved data'});
 
})

app.post('/createAccount',async (req,res) => {
  const {email,password} = req.body;
  
  console.log('Response body: ',req.body)
  const hashedPassword = await bcrypt.hash(password,10);

  console.log('Received data:', { email, hashedPassword });
  await sleep(1000*10)
  res.json({message:'Recieved data'});
 
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
