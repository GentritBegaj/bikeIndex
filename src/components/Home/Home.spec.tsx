import {render, screen} from "@testing-library/react";
import {useGetStolenBikes} from "../../hooks/useGetStolenBikes";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {mockedStolenBikesData} from "../../mockedValues";
import {Home} from "./Home";

jest.mock("../../hooks/useGetStolenBikes", () => ({
  useGetStolenBikes: jest.fn()
}));

jest.mock("../BikeList/BikeList", () => {
  return {
    BikeList: () => <>BikeList test</>
  };
});

jest.mock("../LoadingList/LoadingList", () => {
  return {
    LoadingList: () => <>LoadingList test</>
  };
});

jest.mock("../../ErrorList/ErrorList", () => {
  return {
    ErrorList: () => <>ErrorList test</>
  };
});

jest.mock("../PaginationComponent/PaginationComponent", () => {
  return {
    PaginationComponent: () => <div>Pagination test</div>
  };
});

jest.mock("@mui/x-date-pickers/DesktopDatePicker", () => {
  return {
    DesktopDatePicker: () => <div>DatePicker test</div>
  };
});

it("should render the list of stolen bikes, if data is available", () => {
  (useGetStolenBikes as jest.Mock).mockReturnValue({data: mockedStolenBikesData});
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Home />
    </LocalizationProvider>
  );
  expect(screen.getByText("BikeList test")).toBeTruthy();
  expect(screen.queryByText("LoadingList test")).toBeFalsy();
  expect(screen.queryByText("ErrorList test")).toBeFalsy();
});

it("should render no results found, if no data is available", () => {
  (useGetStolenBikes as jest.Mock).mockReturnValue({data: []});
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Home />
    </LocalizationProvider>
  );
  expect(screen.getByText("No results found")).toBeTruthy();
  expect(screen.queryByText("LoadingList test")).toBeFalsy();
  expect(screen.queryByText("ErrorList test")).toBeFalsy();
});

it("should render loading skeletons, if loading is true", () => {
  (useGetStolenBikes as jest.Mock).mockReturnValue({loading: true});
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Home />
    </LocalizationProvider>
  );
  expect(screen.getByText("LoadingList test")).toBeTruthy();
  expect(screen.queryByText("BikeList test")).toBeFalsy();
  expect(screen.queryByText("ErrorList test")).toBeFalsy();
});

it("should render error component, if error occurs", () => {
  (useGetStolenBikes as jest.Mock).mockReturnValue({error: "Error"});
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Home />
    </LocalizationProvider>
  );
  expect(screen.queryByText("BikeList test")).toBeFalsy();
  expect(screen.queryByText("LoadingList test")).toBeFalsy();
  expect(screen.getByText("ErrorList test")).toBeTruthy();
});

it("should render pagination component", () => {
  (useGetStolenBikes as jest.Mock).mockReturnValue({data: mockedStolenBikesData});
  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Home />
    </LocalizationProvider>
  );
  expect(screen.getByText("Pagination test")).toBeTruthy();
});

it("should render the date picker component", () => {
  (useGetStolenBikes as jest.Mock).mockReturnValue({data: mockedStolenBikesData});

  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Home />
    </LocalizationProvider>
  );
  expect(screen.getAllByText("DatePicker test")).toBeTruthy();
});
