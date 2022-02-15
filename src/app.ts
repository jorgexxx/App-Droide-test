//Droide
/**----DESCRIPTION:                 [TASK_47]
*        Endpoint /radar created to support attack coordina
*        te requests. (target test droide only)
*
*        CREATED: 2022-02-15 12:30:39, BY: GEN57.com, USER_001
*
*    INPUT:
*
*    OUTPUT:
**/

//Lib - General
    import express, {Application, Response, Request, NextFunction} from 'express';
    import bodyParser from 'body-parser';
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

//Requests handlers: End point droide
    app.post('/radar', function (req, res) {
        var obL_Json = Protocols_AttachCoordinate_Job(req.body);//decide which cordXY to attack.
        console.log(obL_Json);
        res.json(obL_Json);//Output: {"x":0,"y":40}
    })
