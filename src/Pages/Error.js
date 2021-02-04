import React from "react";
import { Grid, Divider } from "@material-ui/core";

function Error() {
   return (
      <div className='modal'>
         <Grid
            container
            direction='row'
            className='inner-modal'
            spacing={2}
            justify='center'
            style={{ textAlign: "center" }}
         >
            <Grid item xs={12}>
               <h1>404</h1>
               <Divider variant='middle' />
            </Grid>
            <Grid item xs={12}>
               <h3>Sorry, Page can not be Found</h3>
            </Grid>
         </Grid>
      </div>
   );
}

export default Error;
