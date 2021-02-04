import React from "react";
import Navbar from "../Components/Navbar";
import { ArticlesContext } from "../context/context";
import NewsContainer from "../Components/NewsContainer";
import { LinearProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
const Heading = (match) => {
   const {
      TopInitialFetch,
      loading,
      currentSource,
      setCurrentSource,
      country,
      setCountry,
   } = React.useContext(ArticlesContext);

   //handling alert
   const [open, setOpen] = React.useState(true);

   // reset drop down values
   const resetDropDown = () => {
      if (currentSource !== "*") setCurrentSource("*");
      if (country !== "*") setCountry("*");
   };

   //initial data for articles and dropdown menus
   React.useEffect(TopInitialFetch, []);
   React.useEffect(resetDropDown, []);

   //check loading status to render loading animation
   if (loading) {
      return (
         <React.Fragment>
            <Navbar location={match.location.pathname} />
            <LinearProgress color='secondary' />
         </React.Fragment>
      );
   }

   return (
      <React.Fragment>
         <Navbar location={match.location.pathname} />
         <Collapse in={open}>
            <Alert
               severity='info'
               action={
                  <IconButton
                     aria-label='close'
                     color='inherit'
                     size='small'
                     onClick={() => {
                        setOpen(false);
                     }}
                  >
                     X
                  </IconButton>
               }
            >
               You can not filter with both country and source
            </Alert>
         </Collapse>
         <NewsContainer location={match.location.pathname} />
      </React.Fragment>
   );
};

export default Heading;
