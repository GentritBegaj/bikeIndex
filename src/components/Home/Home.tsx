import React, {useCallback, useState} from "react";
import {useGetStolenBikes} from "../../hooks/useGetStolenBikes";
import {BikeList} from "../BikeList/BikeList";
import {PaginationComponent} from "../PaginationComponent/PaginationComponent";
import {Box, Stack, TextField, generateUtilityClasses, styled} from "@mui/material";
import {DesktopDatePicker} from "@mui/x-date-pickers/DesktopDatePicker";
import {LoadingList} from "../LoadingList/LoadingList";
import {ErrorList} from "../../ErrorList/ErrorList";

const classes = generateUtilityClasses("HomeComponent", ["parent", "headerWrapper"]);

const StyledBox = styled(Box)(() => ({
  [`&.${classes.parent}`]: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  },
  [`& .${classes.headerWrapper}`]: {
    width: "100%",
    display: "flex",
    justifyContent: "end",
    margin: "30px 0"
  }
}));

export const Home = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [input, setInput] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const startDateUnix = startDate ? Math.floor(new Date(startDate).getTime() / 1000) : undefined;
  const endDateUnix = endDate ? Math.floor(new Date(endDate).getTime() / 1000) : undefined;

  const {data, totalCount, loading, error} = useGetStolenBikes(pageNumber, pageSize, input, startDateUnix, endDateUnix);

  const handleChange = useCallback((e: React.ChangeEvent<unknown>, page: number) => {
    setPageNumber(page);
  }, []);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput(e.target.value.toLocaleLowerCase());
  };

  const handleStartDateChange = (value: Date | null | undefined, keyboardInputValue?: string | undefined) => {
    if (value) setStartDate(value);
  };
  const handleEndDateChange = (value: Date | null | undefined, keyboardInputValue?: string | undefined) => {
    if (value) setEndDate(value);
  };

  const totalPages =
    startDateUnix || endDateUnix ? data?.length && Math.ceil(data?.length / pageSize) : totalCount && Math.ceil(totalCount / pageSize);

  return (
    <StyledBox className={classes.parent}>
      <Box className={classes.headerWrapper}>
        <Stack spacing={2} direction="row">
          <DesktopDatePicker
            label="From"
            inputFormat="DD/MM/YYYY"
            value={startDate}
            onChange={handleStartDateChange}
            maxDate={endDate && new Date(endDate)}
            renderInput={(params: JSX.IntrinsicAttributes) => <TextField {...params} />}
          />
          <DesktopDatePicker
            label="Until"
            inputFormat="DD/MM/YYYY"
            value={endDate}
            onChange={handleEndDateChange}
            maxDate={new Date()}
            minDate={startDate && new Date(startDate)}
            renderInput={(params: JSX.IntrinsicAttributes) => <TextField {...params} />}
          />
          <TextField label="Filter by title" type="text" value={input} onChange={handleQueryChange} />
        </Stack>
      </Box>
      {error ? (
        <ErrorList />
      ) : loading ? (
        <LoadingList pageSize={pageSize} />
      ) : (
        <>{data?.length && data?.length > 0 ? <BikeList data={data} /> : "No results found"}</>
      )}
      <PaginationComponent
        count={totalPages}
        totalCount={startDateUnix || endDateUnix ? data?.length : totalCount}
        page={pageNumber}
        size={pageSize}
        onChangeHandler={handleChange}
      />
    </StyledBox>
  );
};
