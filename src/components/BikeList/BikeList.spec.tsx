import {screen, render} from "@testing-library/react";
import {mockedStolenBikesData} from "../../mockedValues";
import {BikeList} from "./BikeList";

jest.mock("../BikeItem/BikeItem", () => {
  return {
    BikeItem: () => <div>BikeItem test</div>
  };
});

it("should render BikeItem as many times as the length of mocked data", () => {
  render(<BikeList data={mockedStolenBikesData} />);
  expect(screen.getAllByText("BikeItem test")).toHaveLength(2);
});
