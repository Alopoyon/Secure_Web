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
