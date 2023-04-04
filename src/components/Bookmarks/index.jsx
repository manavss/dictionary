import { Stack, Typography, IconButton } from "@mui/material";
import { ArrowBack as BackIcon } from "@mui/icons-material";
import { Box } from "@mui/system";
import { useNavigate, Link } from "react-router-dom";
const Bookmarks = ({ bookmarks }) => {
  const navigate = useNavigate();
  return (
    <>
      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ color: "black,mr:1" }}>
          <BackIcon />
        </IconButton>
        <Typography variant="h6">Bookmarks</Typography>
      </Stack>
      {!!Object.keys(bookmarks).length ? (
        Object.keys(bookmarks).map((b) => (
          <Box
            to={`/search/${b}`}
            component={Link}
            key={b}
            sx={{
              p: 2,
              cursor: "pointer",
              backgroundColor: "white",
              borderRadius: 1,
              textTransform: "capitalize",
              mb: 2,
              fontWeight: 800,
              display: "block",
              color: "black",
              textDecoration: "none",
            }}
          >
            {b}
          </Box>
        ))
      ) : (
        <Typography sx={{ mt: 5 }} align="center">
          No Bookmarks
        </Typography>
      )}
    </>
  );
};

export default Bookmarks;
