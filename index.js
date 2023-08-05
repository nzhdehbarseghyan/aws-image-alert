import app from './app.js';

const port = process.env.PORT || 8055;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})
