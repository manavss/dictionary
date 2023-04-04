import React, { useEffect, useState } from "react";

import theme from "./theme";
import Grid from "@mui/material/Unstable_Grid2";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Bookmarks from "./components/Bookmarks";
import Defination from "./components/Defination";

const App = () => {
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem("bookmarks")) || {}
  );

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (word, definitions) =>
    setBookmarks((oldBookmarks) => ({ ...oldBookmarks, [word]: definitions }));

  const removeBookmark = (word) =>
    setBookmarks((oldBookmarks) => {
      const temp = { ...oldBookmarks };
      delete temp[word];
      return temp;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid
        container
        sx={{ p: 2, mt: { xs: 0, sm: 2 } }}
        justifyContent="center"
      >
        <Grid item xs={12} sm={8} md={5} lg={3}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/bookmarks"
                element={<Bookmarks bookmarks={bookmarks} />}
              />
              <Route
                path="/search/:word"
                element={
                  <Defination
                    bookmarks={bookmarks}
                    addBookmark={addBookmark}
                    removeBookmark={removeBookmark}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default App;
