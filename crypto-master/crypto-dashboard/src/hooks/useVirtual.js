import { useState } from "react";

export function useVirtual(data, itemsPerPage = 20) {
  const [page, setPage] = useState(0);

  const visible = data.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return { visible, setPage };
}
