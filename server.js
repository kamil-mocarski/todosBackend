const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Define Routes
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/contacts', require('./routes/contacts'));
app.use('/todos', require('./routes/todos'));

app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`)
});