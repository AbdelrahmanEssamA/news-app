import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { ArticlesContext } from "../context/context";
export default function Navbar({ location }) {
   const { searchHome, searchHeadings } = React.useContext(ArticlesContext);
   const [search, setSearch] = useState("");
   const handleSearch = (e) => {
      setSearch(e.target.value);
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      if (search !== "") {
         if (location === "/home") searchHome(search);
         else if (location === "/headings") searchHeadings(search);
      }
   };
   return (
      <div>
         <Grid container className='navigation' direction='row'>
            <img src={logo} alt='logo' className='logo' />

            <Grid item xs={9} sm={5} md={4} lg={3} className='search-container'>
               <form onSubmit={handleSubmit} className='search'>
                  <input
                     required
                     value={search}
                     onChange={handleSearch}
                     placeholder='Search'
                  />

                  <button className='search-button' type='submit'>
                     search
                  </button>
               </form>
            </Grid>

            <Grid item xs={12} sm={5} md={5} lg={5} className='navbar'>
               <Link to='/' className='link'>
                  Home
               </Link>
               <Link to='/headings' className='link'>
                  Headings
               </Link>
            </Grid>
         </Grid>
      </div>
   );
}
