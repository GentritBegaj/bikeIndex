import {screen, render} from "@testing-library/react";
import App from "./App";

jest.mock("@mui/x-date-pickers/LocalizationProvider", () => {
  return {
    LocalizationProvider: () => <div>First Test</div>
  };
});

it("should render the App component", () => {
  render(<App />);
  expect(screen.getByText("First Test")).toBeTruthy();
});
