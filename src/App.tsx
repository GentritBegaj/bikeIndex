import {Home} from "./components/Home/Home";
import {Container, generateUtilityClasses, styled, Box} from "@mui/material";
import {Routes, Route} from "react-router-dom";
import {BikeDetails} from "./components/BikeDetails/BikeDetails";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const classes = generateUtilityClasses("AppComponent", ["container", "parent", "navbar"]);

const Root = styled(Box)(() => ({
  [`&.${classes.parent}`]: {
    height: "100vh",
    maxHeight: "100vh",
    width: "100%",
    overflow: "hidden"
  },

  [`& .${classes.container}`]: {
    height: "calc(100% - 80px)"
  },
  [`& .${classes.navbar}`]: {
    background: "gray",
    color: "white",
    padding: "10px 20px",
    height: "50px",
    display: "flex",
    alignItems: "center"
  }
}));

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Root className={classes.parent}>
        <Box className={classes.navbar}>StolenBikeIndex</Box>
        <Container className={classes.container}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bikes/:id" element={<BikeDetails />} />
          </Routes>
        </Container>
      </Root>
    </LocalizationProvider>
  );
}

export default App;
