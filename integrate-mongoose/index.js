const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const app = express();
const port = 5000;


app.use(express.json())



const uri =
  'mongodb+srv://MongooseIntegrate:EzQ6xEBo8PZ4wFKV@cluster0.tekyyoa.mongodb.net/mongooseInt?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri);

async function run() {
 try {
   


// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
//   kitty.save().then(() => console.log('meow'));
  
  const Role = mongoose.model('Role', {
   name: {
    type: String,
   },
   role: {
    type: String,
   }
  })

  const User = mongoose.model('User', {
   name: {
    type: String,
    required: true,
   },
   password: {
    type: String,
    required:true,
   }
  })

  app.post('/register',async (req, res) => {
 try {
  const data = req.body;
  const items = await User.insertMany(data);
  // Role.save();
  res.status(201).send({ message: 'Successfully done', items });


 } catch (error) {
      res.status(500).send({ message: 'Failed to insert data', error });
 }
})

  app.post('/login', async (req, res) => {
 try {
  const { name, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ name, password });
  if (!user) {
   return res.status(400).send({ message: 'Invalid username or password' });
   } 
   const privatekey = 'secrect'
   
   const token = jwt.sign({ name }, privatekey, {
     expiresIn: '1d'
   })
    res.status(200).send({ message: 'Login successful', token });


 } catch (error) {
  console.log(error)
 }
})

  // app.post('/role', async (req, res) => {
  //  const item = req.body;
  //  const items = await Role.insertMany(item);
  //  res.status(201).send({message: 'succefully done'}, items)
  // })

  app.post('/role', async (req, res) => {
    try {
      const item = req.body;
     const items = await Role.insertMany(item);
     // Role.save();
      res.status(201).send({ message: 'Successfully done', items });
    } catch (error) {
      res.status(500).send({ message: 'Failed to insert data', error });
    }
  });


  app.get('/role', async (req, res) => {
   const item = await Role.find()
   res.send(item)
  })


//   app.get('/cats', async (req, res) => {
//    const item = await Cat.find();
//    res.send(item);
// })




    // Connect the client to the server	(optional starting in v4.7)
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
   );
   


  } finally {
  }
}
run().catch(console.dir);









app.get('/', async (req, res) => {
 res.send('Run on going')
});

app.listen(port, () => {
 console.log(`http://localhost:${port}`);
})