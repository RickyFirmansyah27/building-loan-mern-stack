import express from "express";
import cors from "cors";
import session from "express-session";
import FileUpload from "express-fileupload";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import EkskulRoute from "./routes/EkskulRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import GedungRoute from "./routes/GedungRoute.js";
import BookingRoute from "./routes/bookingRoutes.js";
import EkstrakurikulerRoute from "./routes/EkstrakurikulerRoute.js";
import rekBookingRoute from "./routes/RekBookingRoutes.js";
import ReportRouter from "./routes/ReportRouter.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}))

app.use(cors({
    credentials: true,
    origin:'http://localhost:3000'
}));

app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));
app.use(UserRoute);
app.use(EkskulRoute);
app.use(AuthRoute);
app.use(GedungRoute);
app.use(BookingRoute);
app.use(EkstrakurikulerRoute);
app.use(rekBookingRoute);
app.use(ReportRouter);

// store.sync();

app.listen(process.env.APP_PORT,()=>{
    console.log('server up running..');
});

