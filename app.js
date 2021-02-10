const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session')
const db = require("./api/models");
const http = require('http');
const path = require('path');


const SPResponse = require('./api/models/SP_Response')

// Connect to  mysql db 
db.sequelize.sync({ alter: true });


require('dotenv').config();

// App initialization
const app = express();
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

const server = http.createServer(app);

app.use(morgan('dev'))
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Type, Accept, Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

// Routes
const authRoutes = require('./api/routes/authRoutes');
const stateRoutes = require('./api/routes/statesRoutes');
const kpisRoutes = require('./api/routes/kpisRoutes');
const questionnaireRoutes = require('./api/routes/surveyProtocolRoutes');
const spResponsesRoutes = require('./api/routes/spResponseRoutes');
const orgsRoutes = require('./api/routes/orgsRoutes');

/* App Routes */
app.use('/api/auth', authRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/kpis', kpisRoutes);
app.use('/api/questionnaire', questionnaireRoutes);
app.use('/api/response', spResponsesRoutes);
app.use('/api/organisations', orgsRoutes);

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


// Start the app
server.listen(process.env.PORT || 5000, function() {
    console.log("Server started on PORT")
})