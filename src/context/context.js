import React, { useState } from "react";
import mockupArticles from "./mockupData";
import axios from "axios";

const topHeadingsUrl = "https://newsapi.org/v2/top-headlines";
const everythingUrl = "https://newsapi.org/v2/everything";
const sourcesUrl =
   "https://newsapi.org/v2/sources?apiKey=206839c715c04d68b6aa038f484a6f8d";
const apiKey = "apiKey=206839c715c04d68b6aa038f484a6f8d";

export const ArticlesContext = React.createContext();
export const ArticleProvider = ({ children }) => {
   const [articles, setArticles] = useState(mockupArticles);
   const [article, setArticle] = useState({});
   const [loading, setLoading] = useState(false);
   const [sources, setSources] = useState("");
   const [currentSource, setCurrentSource] = useState(" ");
   const [country, setCountry] = useState(" ");
   const [searchQuery, setSearchQuery] = useState();

   //fetch sources
   const getSources = async () => {
      const request = await axios.get(sourcesUrl).catch((err) => {
         setSources([]);
         return;
      });
      if (request) {
         const {
            data: { sources },
         } = request;
         setSources(sources);
      }
   };
   //initial fetch for home page
   const initialFetch = async () => {
      const request = await axios
         .get(`${everythingUrl}?q=ps5&sortBy=popularity&${apiKey}`)
         .catch((err) => {
            setArticles([]);
            alert("something wrong happened");
            setLoading(false);
            return;
         });
      if (request) {
         const {
            data: { articles },
         } = request;
         setArticles(articles);
      }
   };

   //initial fetch for top headings page
   const TopInitialFetch = async () => {
      setLoading(true);
      const request = await axios
         .get(`${topHeadingsUrl}?q=ps5&sortBy=popularity&${apiKey}`)
         .catch((err) => {
            setArticles([]);
            alert("something wrong happened");
            setLoading(false);
            return;
         });
      if (request) {
         const {
            data: { articles },
         } = request;
         setArticles(articles);
         setLoading(false);
      }
   };

   //search in everything
   const searchHome = async (query) => {
      setLoading(true);
      setSearchQuery(query);
      const request = await axios
         .get(`${everythingUrl}?q=${query}&sortBy=popularity&${apiKey}`)
         .catch((err) => {
            setArticles([]);
            alert("No data");
            setLoading(false);
            return;
         });
      if (request) {
         const {
            data: { articles },
         } = request;
         setArticles(articles);
         setLoading(false);
      }
   };

   //search in top headings ability
   const searchHeadings = async (query) => {
      setSearchQuery(query);
      setLoading(true);
      const request = await axios
         .get(`${topHeadingsUrl}?q=${query}&sortBy=popularity&${apiKey}`)
         .catch((err) => {
            setArticles([]);
            alert("No data");
            setLoading(false);
            return;
         });
      if (request) {
         const {
            data: { articles },
         } = request;
         setArticles(articles);
         setLoading(false);
      }
   };

   // get data for certain source
   const getAllForSource = async (s, location) => {
      setCurrentSource(s);
      if (location === "/home") {
         setLoading(true);
         const request = await axios
            .get(`${everythingUrl}?sources=${s}&sortBy=popularity&${apiKey}`)
            .catch((err) => {
               setArticles([]);
               alert("something wrong happened");
               setLoading(false);
               return;
            });
         if (request) {
            const {
               data: { articles },
            } = request;
            setArticles(articles);
            setLoading(false);
         }
      } else if (location === "/headings") {
         setLoading(true);
         const request = await axios
            .get(`${topHeadingsUrl}?sources=${s}&sortBy=popularity&${apiKey}`)
            .catch((err) => {
               setArticles([]);
               alert("something wrong happened");
               return;
            });
         if (request) {
            const {
               data: { articles },
            } = request;
            setArticles(articles);
            setLoading(false);
         }
      }
   };

   // get data from certain country
   const getAllForCountry = async (c) => {
      setCountry(c);
      setLoading(true);
      const request = await axios
         .get(`${topHeadingsUrl}?country=${c}&sortBy=popularity&${apiKey}`)
         .catch((err) => {
            setArticles([]);
            alert("something wrong happened");
            setLoading(false);
            return;
         });
      if (request) {
         const {
            data: { articles },
         } = request;
         setArticles(articles);
         setLoading(false);
      }
   };

   // save amd retrieve the selected article in local store to avoid loss on refresh
   React.useEffect(() => {
      getSources();
      localStorage.setItem("article", JSON.stringify(article));
   }, [article]);

   React.useEffect(() => {
      const data = localStorage.getItem("article");
      try {
         if (data) setArticle(JSON.parse(data));
      } catch (e) {
         setArticle({});
      }
   }, []);

   // values to be passed in the article provider context
   const value = {
      articles,
      article,
      setArticle,
      sources,
      initialFetch,
      TopInitialFetch,
      searchHome,
      searchHeadings,
      loading,
      setLoading,
      getSources,
      currentSource,
      getAllForSource,
      setCurrentSource,
      getAllForCountry,
      country,
      setCountry,
      searchQuery,
   };

   return (
      <ArticlesContext.Provider value={value}>
         {children}
      </ArticlesContext.Provider>
   );
};
