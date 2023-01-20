import {screen, render} from "@testing-library/react";
import {mockedStolenBikeData} from "../../mockedValues";
import {BikeItem} from "./BikeItem";

jest.mock("react-router-dom", () => {
  return {
    Link: ({children}: any) => (
      <div>
        <div>React Link</div>
        <div>{children}</div>
      </div>
    )
  };
});

jest.mock("@mui/material", () => {
  return {
    ...(jest.requireActual("@mui/material") as NodeModule),
    Card: ({children}: HTMLElement) => <>{children}</>
  };
});

it("should render react-router-dom Link", () => {
  render(<BikeItem bike={mockedStolenBikeData} />);
  expect(screen.getByText("React Link")).toBeTruthy();
});

it("should render Card with bike data", () => {
  render(<BikeItem bike={mockedStolenBikeData} />);
  expect(screen.getByText("1997 Specialized Rock hopper")).toBeTruthy();
});
