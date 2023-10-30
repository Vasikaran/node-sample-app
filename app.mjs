import express from 'express';
import routes from './src/routes.mjs';
// import db from './src/db.mjs';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

routes(app);

app.use((err, req, res, next) => {
    if (err) {
        console.error(err);
        res.sendStatus(500);
        return;
    }
    return next();
  });
// db(app);

app.listen(9090, (err)=>{
    if (err) throw err;
    console.log('Listening at http://localhost:9090');
});

process.on("unhandledRejection", (err)=>{
    console.error(err);
})