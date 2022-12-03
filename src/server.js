require('dotenv').config();

const app = require('./app');

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
