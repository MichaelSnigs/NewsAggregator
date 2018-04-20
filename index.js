//index.js
//2018

import express from 'express';
import axios from 'axios';

const app = express();

const port = process.env.PORT || 3000;
app.listen(port , () => ('news-agg: listening on port ${port}'));

