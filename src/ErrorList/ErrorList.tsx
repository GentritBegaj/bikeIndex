import React from "react";
import {Box, generateUtilityClasses, styled} from "@mui/material";

const classes = generateUtilityClasses("ErrorList", ["wrapper"]);

const StyledBox = styled(Box)(() => ({
  [`&.${classes.wrapper}`]: {
    maxHeight: "80%",
    overflowY: "scroll"
  }
}));

export function ErrorList() {
  return (
    <StyledBox className={classes.wrapper}>
      <p>Error</p>
    </StyledBox>
  );
}
