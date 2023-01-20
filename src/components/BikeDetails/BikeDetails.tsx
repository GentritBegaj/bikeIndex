import {useParams} from "react-router-dom";
import {useGetBikeDetails} from "../../hooks/useGetBikeDetails";
import {Box, Container, Card, Typography, generateUtilityClasses, styled} from "@mui/material";
import {LoadingDetails} from "../LoadingDetails/LoadingDetails";

const classes = generateUtilityClasses("BikeDetails", ["wrapper", "imageCard", "textWrapper"]);

const StyledContainer = styled(Container)(() => ({
  [`&.${classes.wrapper}`]: {
    display: "flex",
    backgroundColor: "lightgray",
    padding: "20px",
    justifyContent: "space-evenly",
    marginTop: "30px"
  },
  [`& .${classes.imageCard}`]: {
    objectFit: "cover",
    marginRight: "20px"
  },
  [`& .${classes.textWrapper}`]: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  }
}));

export const BikeDetails = () => {
  const {id} = useParams();
  const {data, error, loading} = useGetBikeDetails(Number(id) ?? undefined);

  return error ? (
    <div>Error retrieving bike details!</div>
  ) : loading ? (
    <LoadingDetails />
  ) : (
    <StyledContainer className={classes.wrapper}>
      <Card
        component="img"
        src={data?.large_img !== null ? data?.large_img : "/assets/bike_img.png"}
        className={classes.imageCard}
        height={270}
        width={250}
      />
      <Box className={classes.textWrapper}>
        <Box sx={{flex: 1}}>
          <Typography variant="h6">{data?.title}</Typography>
          <Typography variant="body1">{data?.description}</Typography>
          <Typography variant="body1">
            Reported: {data?.registration_created_at && new Date(data?.registration_created_at * 1000).toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{marginLeft: "auto"}}>
          <Typography>Date Stolen: {data?.date_stolen && new Date(data?.date_stolen * 1000).toLocaleString()}</Typography>
          <Typography>Location stolen: {data?.stolen_location}</Typography>
        </Box>
      </Box>
    </StyledContainer>
  );
};
