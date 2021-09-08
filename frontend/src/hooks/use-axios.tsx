import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

const useAxios = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetch = async (props: Partial<AxiosRequestConfig>) => {
    setLoading(true);
    try {
      let res = await axios(props);
      if (res.status === (200 || 201)) {
        setResponse(res.data);
      }
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data);
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return { response, error, loading, fetch };
};

export default useAxios;
