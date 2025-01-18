import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function useCharacters(searchQuery) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${searchQuery
            .trim()
            .toLowerCase()}`,
          { signal }
        );
        setCharacters(data.results);
      } catch (err) {
        setCharacters([]);
        if (!axios.isCancel())
          toast.error(
            err.response
              ? `${err.response.data.error} (${err.response.status})`
              : err.message
          );
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  return { isLoading, characters };
}
export default useCharacters;
