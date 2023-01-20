import {renderHook} from "@testing-library/react-hooks";
import {useGetStolenBikes} from "./useGetStolenBikes";
import {mockedStolenBikesData} from "../mockedValues";
import axios from "axios";
import {waitFor} from "@testing-library/react";

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

describe("useGetStolenBikes test cases", () => {
  it("should call with correct url", async () => {
    expect(axios.get).not.toHaveBeenCalled();

    renderHook(() => useGetStolenBikes(1, 2, undefined, undefined, undefined));

    expect(axios.get).toHaveBeenCalledWith("https://bikeindex.org:443/api/v3/search/count?location=Munich&distance=10&stolenness=proximity");
  });

  it("should check if totalCount and data is returned correctly", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: {proximity: 2}, status: 200}).mockResolvedValue({
      data: {
        bikes: mockedStolenBikesData
      }
    });

    const {result} = renderHook(() => useGetStolenBikes(1, 2, undefined, undefined, undefined));

    await waitFor(() => {
      expect(result.current.totalCount).toBe(2);
    });
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0].id).toBe(1);
    expect(result.current.data?.[1].id).toBe(2);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(undefined);
  });

  it("should set loading to true when fetching data, and set it to false again", async () => {
    const {result, waitForNextUpdate} = renderHook(() => useGetStolenBikes(1, 2, undefined, undefined, undefined));

    expect(result.current.data).toBe(undefined);
    expect(result.current.totalCount).toBe(undefined);
    expect(result.current.error).toBeUndefined();
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
  });

  it("should return an error message if fetching data fails", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({data: {proximity: 2}, status: 200}).mockRejectedValue("Error fetching data");

    const {result, waitForNextUpdate} = renderHook(() => useGetStolenBikes(1, 2, undefined, undefined, undefined));

    expect(result.current.data).toBe(undefined);
    expect(result.current.totalCount).toBe(undefined);
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("Error fetching data");
  });
});
