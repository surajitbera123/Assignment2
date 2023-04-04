const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
app.use(bodyParser.json());
app.post('/api/replaceText', (req, res) => {
  
  const requestData = req.body;

  const htmlTemplate1 = '<h1>Welcome, {{name}}!</h1>';
  const htmlTemplate2 = '<p>Your order for {{quantity}} {{product}} has been confirmed.</p>';
  const htmlTemplate3 = '<p>The weather is currently {{condition}} with a temperature of {{temperature}} degrees Celsius.</p>';
  const htmlTemplate4 = '<p>Your appointment with {{doctor}} is scheduled for {{date}} at {{time}}.</p>';
  const htmlTemplate5 = '<h2>Thank you for signing up for our newsletter, {{email}}!</h2>';

  const replacePlaceholders = (htmlString, data) => {
    let newHtml = htmlString;
    Object.keys(data).forEach((key) => {
      newHtml = newHtml.replace(`{{${key}}}`, data[key]);
    });
    return newHtml;
  };

  const html1 = replacePlaceholders(htmlTemplate1, requestData);
  const html2 = replacePlaceholders(htmlTemplate2, requestData);
  const html3 = replacePlaceholders(htmlTemplate3, requestData);
  const html4 = replacePlaceholders(htmlTemplate4, requestData);
  const html5 = replacePlaceholders(htmlTemplate5, requestData);

  mongoose.connect('mongodb+srv://mahesh:TCPzsJRtO6OQ5HD9@cluster0.obfk2as.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });


  const responseSchema = new mongoose.Schema({
    html1: String,
    html2: String,
    html3: String,
    html4: String,
    html5: String,
  });

  const Response = mongoose.model('Response', responseSchema);

  const response = new Response({
    html1,
    html2,
    html3,
    html4,
    html5,
  });
  
  response.save((err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


app.listen(3000, () => {
  console.log('Server started on port 3000');
});