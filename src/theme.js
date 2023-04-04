import { createTheme } from "@mui/material/styles";
export default createTheme({
  palette: {
    background: {
      default: "#f1f3f4",
    },
    primary: {
      main: "#14194c",
    },
    pink: "linear-gradient(138.72deg, #DC8295 0%, #DC687C 95.83%)",
  },
  typography: {
    fontFamily: "Mulish,sans-serif",
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 800,
    },
    h6: {
      fontWeight: 800,
    },
    subtitle1: {
      fontWeight: 800,
    },
  },
  mixins: {
    alignInTheCenter: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "90vh",
    },
  },
});
