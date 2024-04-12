import express from 'express';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';
import connectMongoDBSession from 'connect-mongodb-session';

const MongoDBStore = connectMongoDBSession(session);
const app = express();  

dotenv.config();

const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
  });

// Tạo đường dẫn tuyệt đối của thư mục gốc
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

import Route from "../src/routes/index.js";
import Connect from "../src/config/db/config.js"

Connect();

app.use(session({
  secret: `${process.env.SESSION_SECRET}`,
  resave: false,
  saveUninitialized: false,
  store: store
  })
)

//
app.use(express.static('./src/resources/public'));

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));    

app.use(bodyParser.json());


// Thiết lập template engine EJS
app.engine("ejs", ejs.renderFile);

app.set('view engine', 'ejs');

app.set('views', path.join(__dirName, 'resources/views'));

Route(app);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});