const express = require('express')
const cors = require('cors')
const { apiRouter } = require('./routes')
const { connectDB } = require('./config/db')
const cookieParser = require('cookie-parser')

const app = express()
const port = 3000
connectDB()

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
    credentials: true // Allow cookies and authorization headers
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, (err) => {
    if (err) {
        console.log('err :>> ', err);
    } else {
        console.log('Server running at port', port)
    }
})

app.use((req, res, next) => {
    console.log('\nreq.method :>> ', req.method);
    console.log('req.path :>> ', req.path);
    next()
})

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello World' })
})

app.get('/test/:hotelId/:foodId', (req, res, next) => {
    try {
        console.log('Routes: test')

        console.log('req.query :>> ', req.query);
        console.log('req.params :>> ', req.params);

    } catch (err) {
        next(err)
    }
})

// API
app.use('/api', apiRouter)

app.use((err, req, res, next) => {
    if (err) {
        console.log('err.message :>> ', err.message);
        return res.status(err.statusCode || 500).json({ message: err.message || 'Internal server error' })
    }
})

app.all('*', (req, res) => {
    res.status(404).json({ message: 'End point does not exist' })
})