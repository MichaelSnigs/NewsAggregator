//index.js
//2018

import express from "express";
import newsApi from "newsapi";

const app = express();

const newsapi = new newsApi("07b9ad5ecc104ad3a1645ad017d1ca26");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/get-news", (req, res) => {
  newsapi.v2
    .sources({
      language: "en"
    })
    .then(response => {
      const sources = response.sources.map(source => source.id);
      const sourcesString = sources.join(", ");
      newsapi.v2.topHeadlines({ sources: sourcesString }).then(response => {
        console.log(response);
  

        const articles = response.articles.map(article => ({
          source: article.source.name,
          author: article.author,
          title: article.title,
          description: article.description,
          articleUrl: article.url,
          embedlyUrl: `http://api.embed.ly/1/extract?url=${encodeURIComponent(article.url)}`,
          image: article.urlToImage,
          published: article.published
        }));

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ news: articles }));
      });
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`news-agg: listening on port ${port}`));
