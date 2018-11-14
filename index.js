const EXPRESS = require('express');
const APP = EXPRESS();
const PORT = 3000;

APP.listen(PORT, () =>{
    console.log('App is running on Port 3000');
});

APP.get('/', (req, res)=>{
    res.json({message: 'HELLO!'});
});

APP.get('/happy', (req, res)=>{
    res.send(':)!');
});