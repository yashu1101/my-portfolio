import dotenv from 'dotenv'
dotenv.config()
import express, { urlencoded } from 'express'
import cors from 'cors'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import { DB } from './src/db/db.js'
import { projectRoute } from './src/routes/project.route.js'
import { loginRoute } from './src/routes/auth.route.js'
import path from 'path'
import { dashboardRoute } from './src/routes/dashboard.route.js'
import { skillRoute } from './src/routes/skill.route.js'
import { analyticsRoute } from './src/routes/analytics.route.js'

const app = express()

app.set('trust proxy', 1);
app.use(cors({
    origin: [
        'https://iamyashdev.vercel.app',
        'http://localhost:5500',
        'http://127.0.0.1:5500'
    ]
}))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URL
    }),
    cookie: {

        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));



app.use(urlencoded({ extended: true }))
app.use(express.json())


// Routes



app.use(loginRoute)
app.use(dashboardRoute)
app.use(projectRoute)
app.use(skillRoute)
app.use(analyticsRoute)



app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// variables
const PORT = process.env.PORT || 1101
const DB_URL = process.env.DB_URL


// create server


DB(DB_URL).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}).catch((error) => {
    console.log(error.message)
})