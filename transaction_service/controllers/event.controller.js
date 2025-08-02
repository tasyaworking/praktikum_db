const db = require('../models');
const User = db.User;
const Product = db.Product;

exports.event = async (req, res) => {
    try {
        const events = req.body;

        if (!events.type) {
            throw new Error("Event type is required");
        }

        console.log('Event received:', events);
        
        if (events.type) {
            if (events.type === 'UserCreated') {
                console.log('Processing UserCreated event:', events.data);
                const {id, name, email, password } = events.data;
                await User.create({id, name, email, password });
            }

            if (events.type === 'UserUpdated') {
                console.log('Processing UserUpdated event:', events.data);
                const { id, name, email, password } = events.data;
                await User.update(
                    { name, email, password },
                    { where: { id } }
                );
            }

            if (events.type === 'UserDeleted') {
                console.log('Processing UserDeleted event:', events.data);
                const { id } = events.data;
                await User.destroy({ where: { id } });
            }

            if (events.type === 'ProductCreated') {
                console.log('Processing ProductCreated event:', events.data);
                const {id, name, price, stock } = events.data;
                await Product.create({id, name, price, stock });
            }

            if (events.type === 'ProductUpdated') {
                console.log('Processing ProductUpdated event:', events.data);
                const { id, name, price, stock } = events.data;
                await Product.update(
                    { name, price, stock },
                    { where: { id } }
                );
            }

            if (events.type === 'ProductDeleted') {
                console.log('Processing ProductDeleted event:', events.data);
                const { id } = events.data;
                await Product.destroy({ where: { id } });
            }

        }


        res.status(200).json({ message: 'Event processed successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to process event', message: error.message });
    }   
}