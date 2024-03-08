import { useCallback, useEffect, useState } from "react"
import toast from 'react-hot-toast';

export const useMutation = () => {
  const [data, setData] = useState({
    data: null,
    isLoading: true,
    isError: false
  });

  const mutate = useCallback(async ({ prefixUrl = "", method = 'POST', payload = {} } = {}) => {
    try {
      const response = await fetch(prefixUrl, {
        method, 
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const result = await response.json();
      setData({
        ...data,
        data: result,
        isLoading: false,
      });
      toast.success("berhasil menambahkan notes")
      return { result };
    } catch (error) {
      setData({
        ...data,
        isError: true,
        isLoading: false
      })
      return error;
    }
  }, [])

  return {
    ...data, mutate
  };
}