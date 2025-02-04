import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { INSTRUCTION_QUERY_KEY } from "../const";

export const useInstructionResults = () => {
  // @NOTE - Good to have typing
  const { data, isLoading } = useQuery({ queryKey: [INSTRUCTION_QUERY_KEY], queryFn: () => ({ billboards: [] }) });

  useEffect(() => {
    console.log(data, isLoading);
  }, [data, isLoading]);

  return { data, isLoading };
};
