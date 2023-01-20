import React from "react";
import {TBike, TStolenBike} from "../../types";
import {Box, Card, Typography, generateUtilityClasses, styled} from "@mui/material";
import {Link} from "react-router-dom";

const classes = generateUtilityClasses("BikeItem", ["wrapper", "imageCard"]);

const StyledCard = styled(Card)(() => ({
  [`&.${classes.wrapper}`]: {
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 0",
    padding: "10px",
    cursor: "pointer"
  },
  [`& .${classes.imageCard}`]: {
    objectFit: "cover",
    marginRight: "10px"
  }
}));

export const BikeItem: React.FC<Props> = ({bike}) => {
  return (
    <Link to={`/bikes/${bike.id}`} target="_blank" style={{textDecoration: "none"}}>
      <StyledCard className={classes.wrapper}>
        <Card
          component="img"
          src={bike.large_img !== null ? bike.large_img : "/assets/bike_img.png"}
          className={classes.imageCard}
          height={270}
          width={250}
        />
        <Box sx={{flex: 1, padding: "10px"}}>
          <Typography variant="h6">{bike.title}</Typography>
          <Typography variant="body1">{bike.description}</Typography>
        </Box>
        <Box>
          <Typography>{bike.date_stolen && new Date(bike.date_stolen * 1000).toLocaleString()}</Typography>
          <Typography>{bike.stolen_location}</Typography>
        </Box>
      </StyledCard>
    </Link>
  );
};

interface Props {
  bike: TStolenBike | TBike;
}
