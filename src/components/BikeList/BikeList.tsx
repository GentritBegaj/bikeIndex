import React from "react";
import {TStolenBike} from "../../types";
import {BikeItem} from "../BikeItem/BikeItem";
import {Box, generateUtilityClasses, styled} from "@mui/material";

const classes = generateUtilityClasses("BikeList", ["wrapper"]);

const StyledBox = styled(Box)(() => ({
  [`&.${classes.wrapper}`]: {
    maxHeight: "80%",
    overflowY: "scroll",
    marginBottom: "20px",
    padding: "10px"
  }
}));

export const BikeList: React.FC<Props> = ({data}) => {
  return (
    <StyledBox className={classes.wrapper}>
      {data?.map((bike) => (
        <BikeItem bike={bike} key={bike.id} />
      ))}
    </StyledBox>
  );
};

interface Props {
  data: TStolenBike[] | undefined;
}
