import { useState, useEffect } from "react";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(
        `https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
      );
      const { jobItems } = await response.json();
      setIsLoading(false);
      setJobItems(jobItems);
    };

    fetchData();
  }, [searchText]);

  return { jobItems, isLoading };
}
