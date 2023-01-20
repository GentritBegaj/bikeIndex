import {screen, render} from "@testing-library/react";
import {useGetBikeDetails} from "../../hooks/useGetBikeDetails";
import {mockedStolenBikeData} from "../../mockedValues";
import {BikeDetails} from "./BikeDetails";

jest.mock("../../hooks/useGetBikeDetails", () => {
  return {
    useGetBikeDetails: jest.fn()
  };
});

jest.mock("../LoadingDetails/LoadingDetails", () => {
  return {
    LoadingDetails: () => <div>Loading details test</div>
  };
});

it("should render bike details, if data is returned", () => {
  (useGetBikeDetails as jest.Mock).mockReturnValue({data: mockedStolenBikeData});
  render(<BikeDetails />);
  expect(screen.getByText("1997 Specialized Rock hopper")).toBeTruthy();
  expect(screen.queryByText("Loading details test")).toBeFalsy();
  expect(screen.queryByText("Error retrieving bike details!")).toBeFalsy();
});

it("should render loading skeleton, if loading true", () => {
  (useGetBikeDetails as jest.Mock).mockReturnValue({loading: true});
  render(<BikeDetails />);
  expect(screen.queryByText("1997 Specialized Rock hopper")).toBeFalsy();
  expect(screen.getByText("Loading details test")).toBeTruthy();
  expect(screen.queryByText("Error retrieving bike details!")).toBeFalsy();
});

it("should render error message, if error returned", () => {
  (useGetBikeDetails as jest.Mock).mockReturnValue({error: "Error"});
  render(<BikeDetails />);
  expect(screen.queryByText("1997 Specialized Rock hopper")).toBeFalsy();
  expect(screen.queryByText("Loading details test")).toBeFalsy();
  expect(screen.getByText("Error retrieving bike details!")).toBeTruthy();
});
