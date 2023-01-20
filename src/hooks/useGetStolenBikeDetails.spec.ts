import axios from "axios";
import {renderHook} from "@testing-library/react-hooks";
import {waitFor} from "@testing-library/react";
import {useGetBikeDetails} from "./useGetBikeDetails";
import {mockedStolenBikeData} from "../mockedValues";

//Mute error console since it's complaining about react 18
global.console = {
  ...console,
  error: jest.fn()
};

jest.mock("axios", () => {
  return {
    get: jest.fn()
  };
});

describe("useGetStolenBikeDetails test cases", () => {
  it("should call with correct url and param", async () => {
    expect(axios.get).not.toHaveBeenCalled();

    renderHook(() => useGetBikeDetails(1));

    expect(axios.get).toHaveBeenCalledWith("https://bikeindex.org:443/api/v3/bikes/1");
  });

  it("should check if data is returned correctly", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: {bike: mockedStolenBikeData}, status: 200});

    const {result, waitForNextUpdate} = renderHook(() => useGetBikeDetails(1));
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data?.id).toBe(1);
    expect(result.current.error).toBeUndefined();
    expect(result.current.loading).toBe(false);
  });

  it("should set loading to true when fetching data, and set it to false again", async () => {
    const {result, waitForNextUpdate} = renderHook(() => useGetBikeDetails(1));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
  });

  it("should return an error message if fetching data fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue("Error fetching data");

    const {result, waitForNextUpdate} = renderHook(() => useGetBikeDetails(1));

    expect(result.current.data).toBeUndefined();
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Error fetching data");
  });
});
