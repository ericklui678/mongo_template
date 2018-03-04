const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = 8000;

app.use(bodyParser.json());
app.set('view engine', 'ejs');
mongoose.connect('mongodb://localhost/ninjas');

const NinjaSchema = new mongoose.Schema({
  name: String,
  age: Number
}, { timestamps: true });
const Ninja = mongoose.model('Ninja', NinjaSchema);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/ninjas', (req, res) => {
  Ninja.find({}, (err, ninjas) => {
    if (err) {
      console.log('Error', err);
      res.json({ message: 'Error', error: err });
    } else {
      res.json({ message: 'Success', data: ninjas });
    }
  })
});

app.post('/ninjas', (req, res) => {
  Ninja.create(req.body, (err, data) => {
    if (err) { console.log(err); }
    console.log(data);
    res.redirect('/');
  })
});

app.listen(PORT, () => console.log(`running on ${PORT}`));
