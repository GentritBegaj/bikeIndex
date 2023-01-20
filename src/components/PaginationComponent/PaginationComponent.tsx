import * as React from "react";
import {Box, Pagination, Stack, generateUtilityClasses, styled} from "@mui/material";

const classes = generateUtilityClasses("Pagination", ["wrapper", "stack"]);

const StyledBox = styled(Box)(() => ({
  [`&.${classes.wrapper}`]: {
    display: "flex",
    margin: "auto 0 0 auto"
  },
  [`&.${classes.stack}`]: {
    display: "flex",
    justifyContent: "end"
  }
}));

export function PaginationComponent({count, page, totalCount, size, onChangeHandler}: Props) {
  return (
    <StyledBox className={classes.wrapper}>
      <Stack className={classes.stack} spacing={2}>
        <Pagination count={count} page={page} color="primary" onChange={onChangeHandler} />
        <p>
          Showing results {totalCount ? (totalCount <= page ? 0 : (page - 1) * size + 1) : 0} -{" "}
          {totalCount && totalCount < page * size ? totalCount : page * size} out of {totalCount}
        </p>
      </Stack>
    </StyledBox>
  );
}

interface Props {
  count: number | undefined;
  page: number;
  size: number;
  totalCount: number | undefined;
  onChangeHandler: (e: React.ChangeEvent<unknown>, page: number) => void;
}
