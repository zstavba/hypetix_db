
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');
import path = require('path');
import * as multer from 'multer';
const express = require("express");
const bodyParser = require("body-parser");
import { Router } from 'express';

// Basics API 
import BankRouter from  './routes/BankRouter';
import UserRouter from './routes/UserRouter';

// Coders API 
import GroupTypeRouter from './routes/GroupTypeRouter';
import CodersRouter from './routes/CodersRouter';
import CustomTariffsRouter from './routes/CustomTariffsRouter';
import MeassurmentUnitsRouter from './routes/MeassurmentUnitsRouter';
import ClassificationsRouter from './routes/ClassificationsRouter';
import TaxRouter from './routes/TaxRouter';
import AticleTypeRouter from './routes/ArticleTypeRouter';
import AlternativesRouter from './routes/AlternativesRouter';
import PerformanceRouter from './routes/PerformanceRouter';
import WarehouseRouter from './routes/WarehouseRouter';

// Commercials API
import ShippingMethodRouter from './routes/ShippingMethodRouter';
import ExchangeRatesRouter  from './routes/ExchangeRatesRouter';
import PriceTypeRouter from './routes/PriceTypeRouter';
import CurrencieRouter from './routes/CurrencieRouter';
import TrafficTypeRouter from './routes/TrafficTypeRouter';
import CommercialStatesRouter from './routes/CommercialStatesRouter';

// Defaults API
import WorkCenterClassificationRouter from './routes/WorkCenterClassificationRouter';
import UnitsAboveStorageRouter from './routes/UnitAboveStorageRouter';
import LanguageRouter from './routes/LanguageRouter';
import LocationsRouter from './routes/LocationsRouter';
import AreaRouter from './routes/AreaRouter';
import OrganizationalUnitsRouter from './routes/OrganizationalUnitsRouter';
import CostCentersRouter from './routes/CostCentersRouter';
import UPNCodesRouter from './routes/UPNCodesRouter';

// Production API
import WorkProcedureRouter from './routes/WorkProcedureRouter';

const app = express();


// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));


const secretKey = crypto.randomBytes(32).toString('hex');
let sess = session({
  genid: function (req) {
    return uuidv4(); // use UUIDs for session IDs
  },
  token: secretKey,
  secret: secretKey,
  resave: false,
  saveUninitialized: true,
  proxy: true,
});

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sess.cookie.secure = true; // serve secure cookies
}
app.use(sess); // Session middleware
// Middleware for handling file uploads


// Set the destination folder for static file serving
app.use(express.static(path.join(__dirname, 'assets')));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
  next();
});
const PORT = 4000;


// Links to API 
const CodersRoutes: Router[] = [
  GroupTypeRouter,
  CodersRouter,
  CustomTariffsRouter,
  MeassurmentUnitsRouter,
  ClassificationsRouter,
  TaxRouter,
  AticleTypeRouter,
  AlternativesRouter,
  PerformanceRouter,
  WarehouseRouter
]


CodersRoutes.forEach((item: Router) => {
  app.use('/coders', item); 
});

const CommercialsRoutes: Router[] = [
  ShippingMethodRouter,
  ExchangeRatesRouter,
  PriceTypeRouter,
  CurrencieRouter,
  TrafficTypeRouter,
  CommercialStatesRouter
]

CommercialsRoutes.forEach((item: Router) => {
  app.use('/commercial', item);
});

const DefaultRoutes: Router[] = [
  WorkCenterClassificationRouter,
  UnitsAboveStorageRouter,
  LanguageRouter,
  LocationsRouter,
  AreaRouter,
  OrganizationalUnitsRouter,
  CostCentersRouter,
  UPNCodesRouter
]


DefaultRoutes.forEach((item: Router) => {
  app.use('/defaults',item);
});


const ProductionRoutes: Router[] = [
  WorkProcedureRouter
];


ProductionRoutes.forEach((item: Router) => {
  app.use('/production', item);
});

app.use('/bank', BankRouter);
app.use('/user',UserRouter);




app.listen(PORT, function () { return console.log(` VPRO Application woring on PORT: ${PORT} `); });

