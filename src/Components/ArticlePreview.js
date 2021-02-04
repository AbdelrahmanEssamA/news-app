import React from "react";
import ReactDom from "react-dom";
import { Grid, Divider, Chip, Avatar } from "@material-ui/core";
import { truncate } from "../constants";
import { Link } from "react-router-dom";
const ArticlePreview = ({ open, handleClose, data, location }) => {
   if (!open) return null;
   return ReactDom.createPortal(
      <div className='overlay'>
         <div className='modal'>
            <Grid
               container
               direction='row'
               className='inner-modal'
               spacing={2}
               justify='center'
            >
               <Grid item xs={12}>
                  <h1 className='modal-title'>{data.title}</h1>
                  <Divider variant='middle' />
               </Grid>

               <Grid item md={7}>
                  <img
                     src={data.urlToImage}
                     alt={data.title}
                     className='modal-img'
                  />
               </Grid>
               <Grid item md={5}>
                  <p className='modal-description'>{data.description}</p>
                  <Chip
                     className='chip'
                     variant='default'
                     color='default'
                     avatar={<Avatar>A</Avatar>}
                     label={truncate(data.author, 20)}
                  />
                  <p>
                     <strong>Source: </strong>
                     {truncate(data.source.name, 60)}
                  </p>
                  <Link
                     to={{
                        pathname: `article/${data.title}`,
                        state: { prev: location },
                     }}
                  >
                     Full article
                  </Link>
               </Grid>
               <button className='close-button' onClick={handleClose}>
                  Close
               </button>
            </Grid>
         </div>
      </div>,
      document.getElementById("portal")
   );
};
export default ArticlePreview;
