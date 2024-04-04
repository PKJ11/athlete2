import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './News.css'; // Import CSS file for additional styles

const APIKEY = "7eff93514de941098f7e202fa3a74a7c";
const url = "https://newsapi.org/v2/everything?q=";

const News = () => {
  const [newsData, setNewsData] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${url}sports&apiKey=${APIKEY}`);
        setNewsData(response.data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="news-container">
      {newsData && (
        <div>
          <h2>Latest News</h2>
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={1}
            infiniteLoop={true}
            showStatus={false}
            showIndicators={false}
          >
            {newsData.articles.map((article, index) => (
              // Check if urlToImage is not null or empty before rendering the carousel item
              article.urlToImage && (
                <div
                  key={index}
                  style={{
                    height: '60vh',
                  }}
                >
                  <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', height: '100%' }}>
                    <div
                      style={{
                        position: 'relative',
                        height: '100%',
                        backgroundImage: `url(${article.urlToImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="overlay">
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <p>Published at: {new Date(article.publishedAt).toLocaleString()}</p>
                        <p>Source: {article.source.name}</p>
                        <p>Author: {article.author}</p>
                      </div>
                    </div>
                  </a>
                </div>
              )
            ))}
          </Carousel>
          <div><h2>New Feeds</h2></div>
          <div className="card-container">
            
            {newsData.articles.map((article, index) => (
              <div className="card" key={index}>
                <img src={article.urlToImage} alt={article.title} />
                <div className="card-content">
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <p>Published at: {new Date(article.publishedAt).toLocaleString()}</p>
                  <p>Source: {article.source.name}</p>
                  <p>Author: {article.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default News;
