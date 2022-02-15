//Droide
//Lib - General
    import express, {Application, Response, Request, NextFunction} from 'express';
    import bodyParser from 'body-parser';
    import fs from 'fs';
    import path from 'path';

//Modules
    import {Protocols_AttachCoordinate_Job} from './Radar'

//VARIABLES
    const inG_PORT = 3000;// Port
    const app = express();
    
//common setup
    app.use(express.static(path.join(__dirname, 'public')));//Make files Public from folder
    app.use(express.urlencoded({extended: true}));//Make url post request visible here in server - req.Body= { srT_Title: 'sdfsdf', sr
    app.use(bodyParser.urlencoded({ extended: false}));//Body parser:parse application/x-www-form-urlencoded
    app.use(bodyParser.json());

//Listen server
    app.listen(inG_PORT, () => console.log("I'm listening on Port: " + inG_PORT));

//Requests handlers
    app.post('/radar', function (req, res) {
        var obL_Json = Protocols_AttachCoordinate_Job(req.body);
        console.log(obL_Json);
        res.json(obL_Json);
    })
