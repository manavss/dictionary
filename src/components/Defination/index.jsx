import {
  Stack,
  Typography,
  IconButton,
  Divider,
  CircularProgress,
  useTheme,
  Button,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  BookmarkBorder as BookmarkIcon,
  Bookmark as BookmarkedIcon,
  VolumeUp as VolumeUp,
} from "@mui/icons-material";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import { Box } from "@mui/system";

const Defination = ({ bookmarks, addBookmark, removeBookmark }) => {
  const { word } = useParams();
  const theme = useTheme();
  const navigate = useNavigate();
  const [definations, setDefinations] = useState([]);
  const [audio, setAudio] = useState(null);
  const [exist, setExist] = useState(true);

  const isBookmarked = Object.keys(bookmarks).includes(word);

  const updateState = (data) => {
    setDefinations(data);
    const phonetics = data[0].phonetics;
    if (!phonetics.length) return;
    const url = phonetics[0].audio.replace("//ssl", "https://ssl");
    setAudio(new Audio(url));
  };

  useEffect(() => {
    const fetchDefination = async () => {
      try {
        const res = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        updateState(res.data);
      } catch (err) {
        setExist(false);
      }
    };
    if (!isBookmarked) fetchDefination();
    else updateState(bookmarks[word]);
  }, []);

  if (!exist)
    return (
      <Box
        sx={{
          ...theme.mixins.alignInTheCenter,
        }}
      >
        <Typography variant="h5" sx={{ mb: 1 }}>
          Word not found
        </Typography>
        <Button
          variant="contained"
          sx={{ textTransform: "capitalize" }}
          onClick={() => navigate(-1)}
        >
          Go back
        </Button>
      </Box>
    );

  if (!definations.length)
    return (
      <Box
        sx={{
          ...theme.mixins.alignInTheCenter,
        }}
      >
        <CircularProgress />;
      </Box>
    );

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <IconButton onClick={() => navigate(-1)}>
          <BackIcon sx={{ color: "black" }} />
        </IconButton>
        <IconButton
          onClick={() =>
            isBookmarked ? removeBookmark(word) : addBookmark(word, definations)
          }
        >
          {isBookmarked ? (
            <BookmarkedIcon sx={{ color: "black" }} />
          ) : (
            <BookmarkIcon sx={{ color: "black" }} />
          )}
        </IconButton>
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          mt: 3,
          background:
            "linear-gradient(90.17deg, #191E5D 0.14%, #0F133A 98.58%)",
          boxShadow: "0px 10px 20px rgba(19, 23, 71, 0.25)",
          px: 4,
          py: 5,
          color: "white",
          borderRadius: 2,
        }}
      >
        <Typography sx={{ textTransform: "capitalize" }} variant="h4">
          {word}
        </Typography>
        {audio && (
          <IconButton
            onClick={() => audio.play()}
            sx={{
              borderRadius: 2,
              p: 1,
              color: "#fff",
              background: (theme) => theme.palette.pink,
            }}
          >
            <VolumeUp />
          </IconButton>
        )}
      </Stack>
      {definations.map((def, idx) => (
        <Fragment key={idx}>
          <Divider
            sx={{
              display: idx === 0 ? "none" : "block",
              my: 3,
            }}
          />
          {def.meanings.map((meaning) => (
            <Box
              key={Math.random()}
              sx={{
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                backgroundColor: "#fff",
                p: 2,
                borderRadius: 2,
                mt: 3,
              }}
            >
              <Typography
                sx={{
                  textTransform: "capitalize",
                }}
                color="GrayText"
                variant="subtitle1"
              >
                {meaning.partOfSpeech}
              </Typography>
              {meaning.definitions.map((definition, idx) => (
                <Typography
                  sx={{ my: 1 }}
                  variant="body2"
                  color="GrayText"
                  key={definition.definition}
                >
                  {meaning.definitions.length > 1 && `${idx + 1}.`}
                  {definition.definition}
                </Typography>
              ))}
            </Box>
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default Defination;
