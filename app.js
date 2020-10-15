const express = require('express')

const app = express()

app.get('/', (req, res) => res.send('All OK'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is Running : http:localhost:${PORT}`))