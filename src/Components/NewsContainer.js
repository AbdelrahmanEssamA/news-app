import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { ArticlesContext } from "../context/context";
import ArticlePreview from "./ArticlePreview";
import countries, { truncate } from "../constants";
const NewsContainer = ({ location }) => {
   const {
      articles,
      setArticle,
      sources,
      getAllForSource,
      currentSource,
      initialFetch,
      TopInitialFetch,
      getAllForCountry,
      country,
      searchQuery,
   } = React.useContext(ArticlesContext);
   const [open, setOpen] = useState(false);
   const [modalData, setModalData] = useState({});

   //get data by source
   const handleSource = (e) => {
      if (e.target.value === " ") {
         return;
      } else if (e.target.value === "*") {
         if (location === "/home") {
            initialFetch();
         } else if (location === "/headings") {
            TopInitialFetch();
         }
      } else {
         getAllForSource(e.target.value, location);
      }
   };

   //get data by country
   const handleCountry = (e) => {
      if (e.target.value === " ") {
         return;
      } else if (e.target.value === "*") {
         if (location === "/home") {
            initialFetch();
         } else if (location === "/headings") {
            TopInitialFetch();
         }
      } else {
         getAllForCountry(e.target.value);
      }
   };

   const handleModal = (article) => {
      if (article !== {}) {
         setOpen(true);
         setModalData(article);
         setArticle(article);
      } else {
         console.log("error");
      }
   };
   const handleCloseModal = () => {
      setOpen(false);
      setModalData({});
      setArticle({});
   };

   const getArticles = () => {
      return articles.map((article) => (
         <div key={article.title} onClick={() => handleModal(article)}>
            <Grid container className='news-box' direction='row'>
               <Grid item sm={12} md={4} lg={3}>
                  <img
                     className='article-img-mini'
                     src={article.urlToImage}
                     alt={article.title}
                  />
               </Grid>
               <Grid item sm={12} md={8} lg={9}>
                  <h3 className='title'>{truncate(article.title, 110)}</h3>
                  <Typography className='description' variant='body2'>
                     {`"${truncate(article.description, 300)}"`}
                  </Typography>
               </Grid>
            </Grid>
         </div>
      ));
   };

   return (
      <React.Fragment>
         <ArticlePreview
            open={open}
            data={modalData}
            handleClose={handleCloseModal}
            location={location}
         />
         <Grid
            container
            spacing={2}
            direction='column'
            alignItems='center'
            justify='center'
         >
            <Grid item xs={12}>
               <select
                  className='select-menu'
                  value={currentSource}
                  onChange={handleSource}
               >
                  <option value='*'>All Sources</option>
                  {sources &&
                     sources.map((s, index) => {
                        return (
                           <option key={index} value={s.id}>
                              {s.name}
                           </option>
                        );
                     })}
               </select>
               <select
                  className='select-menu'
                  id='country'
                  name='country'
                  value={country}
                  onChange={handleCountry}
               >
                  <option value='*' hidden>
                     All Countries
                  </option>
                  {countries.map((country, index) => {
                     return (
                        <option key={index} value={country.code}>
                           {country.country}
                        </option>
                     );
                  })}
               </select>
            </Grid>
            <Grid item xs={12} className='news-container'>
               {getArticles()}
            </Grid>
         </Grid>
      </React.Fragment>
   );
};

export default NewsContainer;
