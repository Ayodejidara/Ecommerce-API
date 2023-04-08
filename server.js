const http = require('http');

const app = require('./app');
const connectDB = require('./config/db');

const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

const startServer = async() =>{
    await connectDB(process.env.MONGO_URI);

    server.listen(PORT, async() =>{
        console.log(`Server is listening on port ${PORT}`);
    });
};

startServer();

