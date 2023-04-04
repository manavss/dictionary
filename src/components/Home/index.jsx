import React, { useState } from "react";
import Box from "@mui/material/Box";
import { FilledInput, IconButton, Typography, useTheme } from "@mui/material";
import {
  Search as SearchIcon,
  Bookmark as BookmarkIcon,
} from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

const Home = () => {
  const theme = useTheme();
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedWord = word.trim().toLowerCase();
    if (!trimmedWord || trimmedWord.split(" ").length > 1) return;
    navigate(`/search/${trimmedWord}`);
    console.log("hi");
  };

  return (
    <Box
      sx={{
        ...theme.mixins.alignInTheCenter,
      }}
    >
      {/* <img src="src\assets\img.png" alt="book" /> */}
      <Typography
        color="primary"
        sx={{
          mt: 3,
          mb: 1,
        }}
        variant="h4"
      >
        Dictionary
      </Typography>
      <Typography color="GrayText">
        Find meanings and save for quick reference
      </Typography>
      <Box
        sx={{
          width: "360px",
        }}
      >
        <form onSubmit={handleSubmit}>
          <FilledInput
            value={word}
            onChange={(event) => setWord(event.target.value)}
            disableUnderline
            placeholder="Search word"
            sx={{
              my: 4,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
              "& .MuiFilledInput-input": {
                p: "16px",
              },
            }}
            startAdornment={<SearchIcon color="disabled" />}
            fullWidth
          />
        </form>
      </Box>

      <IconButton
        to="/bookmarks"
        component={Link}
        sx={{
          backgroundColor: "red",
          borderRadius: 2,
          p: 2,
          color: "#fff",
          background: (theme) => theme.palette.pink,
          boxShadow: "0 10px 10px rgba(221,114,133,0.2)",
        }}
      >
        <BookmarkIcon />
      </IconButton>
    </Box>
  );
};

export default Home;
