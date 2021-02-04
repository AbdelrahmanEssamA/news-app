import React from "react";
import { ArticlesContext } from "../context/context";
import Error from "./Error";
import { Grid, Divider, Chip, Avatar } from "@material-ui/core";
import { truncate, getDate } from "../constants";
import { Link } from "react-router-dom";

const SingleArticle = (match) => {
   const { article } = React.useContext(ArticlesContext);
   if (
      match.location.pathname === `/article/${article.title}` &&
      article !== {}
   ) {
      const prevPath = match.location.state.prev;
      return (
         <div className='single-article'>
            <Grid
               container
               direction='row'
               className='inner-modal single-article-container'
               spacing={2}
               justify='center'
            >
               <Grid item xs={12}>
                  <h1 className='modal-title'>{article.title}</h1>
                  <Divider variant='middle' />
               </Grid>

               <Grid item sm={12} md={5}>
                  <img
                     src={article.urlToImage}
                     alt={article.title}
                     className='modal-img'
                  />
               </Grid>
               <Grid item md={7}>
                  <p className='modal-description'>{article.description}</p>
                  <Chip
                     className='chip'
                     variant='default'
                     color='default'
                     avatar={<Avatar>A</Avatar>}
                     label={truncate(article.author, 40)}
                  />
                  <p>
                     <strong className='tag'>Source: </strong>
                     {article.source.name}
                  </p>
                  <p>
                     <strong className='tag'>Published: </strong>
                     {getDate(article.publishedAt)}
                  </p>
                  <a href={article.url} target='_blank' rel='noreferrer'>
                     View Details
                  </a>
               </Grid>

               <Grid item xs={12}>
                  <Divider variant='middle' />
                  <p className='modal-description'>{article.content}</p>
               </Grid>

               <Link className='link-color' to={prevPath}>
                  <button className='close-button'> Back</button>
               </Link>
            </Grid>
         </div>
      );
   } else {
      return <Error />;
   }
};

export default SingleArticle;
