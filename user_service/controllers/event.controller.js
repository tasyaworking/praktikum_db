const axios = require('axios');

exports.event = async(req, res) => {
    try {
        const events = req.body;
        console.log('User', events);
        
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};