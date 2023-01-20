import {useMemo, useState} from "react";
import axios from "axios";
import {BIKES_API_URL} from "../globals";
import {TBike} from "../types";

export const useGetBikeDetails = (id: number | undefined) => {
  const [data, setData] = useState<TBike | undefined>();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const url = `${BIKES_API_URL}/bikes/${id}`;

  useMemo(() => {
    (async function () {
      try {
        setLoading(true);
        const bikeDetails = await axios.get(url);
        setData(bikeDetails.data.bike);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return {data, error, loading, setLoading};
};
