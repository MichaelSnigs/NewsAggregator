//index.js
//2018

import express from 'express';
import axios from 'axios';

const app = express();

const port = process.env.PORT || 3000;
app.listen(port , () => console.log(`news-agg: listening on port ${port}`));

