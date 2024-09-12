import { useState, useEffect } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

const fetchJobItem = async (Id: number | null): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${Id}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.description);
  }
  const data = await response.json();
  return data;
};

export function useJobItem(Id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", Id],
    () => (Id ? fetchJobItem(Id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(Id),
      onError: (error) => {
        console.error("An error occurred while fetching job item", error);
      },
    }
  );
  const isLoading = isInitialLoading;
  return { jobItem: data?.jobItem, isLoading } as const;
}

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!searchText) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
      const { jobItems } = await response.json();
      setIsLoading(false);
      setJobItems(jobItems);
    };

    fetchData();
  }, [searchText]);

  return { jobItems, isLoading } as const;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return activeId;
}

export function useDebounce<T>(value: T, delay = 500): T {
  const [debounchedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [value, delay]);

  return debounchedValue;
}
