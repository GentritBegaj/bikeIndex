import axios from "axios";
import {useState, useMemo} from "react";
import {BIKES_API_URL} from "../globals";
import {TStolenBike, TStolenBikesCount} from "../types";

export const useGetStolenBikes = (
  page: number,
  size: number,
  query: string | undefined,
  startDateUnix: number | undefined,
  endDateUnix: number | undefined
) => {
  const totalCountUrl = `${BIKES_API_URL}/search/count?location=Munich&distance=10&stolenness=proximity${query ? `&query=${query}` : ""}`;
  const perPageUrl = `${BIKES_API_URL}/search?page=${page}&per_page=${size}&location=Munich&distance=10&stolenness=proximity${
    query ? `&query=${query}` : ""
  }`;

  const [data, setData] = useState<TStolenBike[] | undefined>();
  const [totalCount, setTotalCount] = useState<number | undefined>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  useMemo(() => {
    (async function () {
      try {
        setLoading(true);
        const totalCountResponse = await axios.get<TStolenBikesCount>(totalCountUrl);
        const perPageResponse = await axios.get(perPageUrl);
        setData(perPageResponse.data.bikes);
        setTotalCount(totalCountResponse.data.proximity);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [perPageUrl, totalCountUrl]);

  // Adding this to have filtering by date range only for the already fetched data, since the API doesn't support date filtering
  const dateFilteredData =
    startDateUnix || endDateUnix
      ? data?.filter((item) => {
          let filterPass = true;
          if (item.date_stolen) {
            if (startDateUnix) {
              filterPass = filterPass && item.date_stolen > startDateUnix;
            }
            if (endDateUnix) {
              filterPass = filterPass && item.date_stolen < endDateUnix;
            }
          }
          return filterPass;
        })
      : undefined;

  return {data: dateFilteredData ?? data, totalCount, loading, error};
};
