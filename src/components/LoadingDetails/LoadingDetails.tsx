import {Container, Skeleton, generateUtilityClasses, styled} from "@mui/material";
const classes = generateUtilityClasses("LoadingDetails", ["wrapper"]);

const StyledContainer = styled(Container)(() => ({
  [`&.${classes.wrapper}`]: {
    display: "flex",
    justifyContent: "space-evenly",
    marginTop: "30px"
  }
}));

export function LoadingDetails() {
  return (
    <StyledContainer className={classes.wrapper}>
      <Skeleton variant="rounded" width="100%" height="50vh" />
    </StyledContainer>
  );
}
