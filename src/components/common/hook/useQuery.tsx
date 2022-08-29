import React from "react";
import { useLocation } from "react-router-dom";

const useQuery = (key: string) => {
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  return query.get(key);
};

export default useQuery;
