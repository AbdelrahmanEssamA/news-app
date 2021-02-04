import React from "react";
import { ArticlesContext } from "../context/context";
import Navbar from "../Components/Navbar";
import NewsContainer from "../Components/NewsContainer";
import { LinearProgress } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";

export default function Home(match) {
   const {
      initialFetch,
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
   React.useEffect(initialFetch, []);

   //check loading status to render loading animation
   React.useEffect(resetDropDown, []);
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
}
