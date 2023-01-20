import React from "react";
import {Box, Stack, Skeleton, generateUtilityClasses, styled} from "@mui/material";

const classes = generateUtilityClasses("LoadingList", ["wrapper"]);

const StyledBox = styled(Box)(() => ({
  [`&.${classes.wrapper}`]: {
    maxHeight: "80%",
    overflowY: "scroll",
    marginBottom: "20px"
  }
}));

export function LoadingList({pageSize}: Props) {
  return (
    <StyledBox className={classes.wrapper}>
      <Stack spacing={1}>
        <>
          {[...Array(pageSize)].map((item, idx) => (
            <Skeleton key={idx} variant="rounded" width="100%" height="20vh" />
          ))}
        </>
      </Stack>
    </StyledBox>
  );
}

interface Props {
  pageSize: number;
}
