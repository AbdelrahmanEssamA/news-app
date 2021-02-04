import "./App.css";
import React from "react";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
} from "react-router-dom";
import Heading from "./Pages/Heading";
import Home from "./Pages/Home";
import Error from "./Pages/Error";
import SingleArticle from "./Pages/SingleArticle";
function App() {
   return (
      <div className='App'>
         <div className='innerApp'>
            <Router>
               <Switch>
                  <Redirect exact from='/' to='/home' />
                  <Route path='/home' exact component={Home} />
                  <Route path='/headings' component={Heading} />
                  <Route
                     path='/article/:articleName'
                     component={SingleArticle}
                  />
                  <Route path='/*' component={Error} />
               </Switch>
            </Router>
         </div>
      </div>
   );
}

export default App;
