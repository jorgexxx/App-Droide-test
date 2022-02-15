"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const Radar_1 = require("./Radar");
const inG_PORT = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.listen(inG_PORT, () => console.log("I'm listening on Port: " + inG_PORT));
app.post('/radar', function (req, res) {
    var obL_Json = (0, Radar_1.Protocols_AttachCoordinate_Job)(req.body);
    console.log(obL_Json);
    res.json(obL_Json);
});
