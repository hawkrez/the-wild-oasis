import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getBookings } from "../../services/apiBookings";
import { bookmarksPerPage } from "../../utils/constants";

function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("checked-status") || "all";
  const filter =
    filterValue === "all" ? null : { field: "status", value: filterValue };

  const sortValue = searchParams.get("sort-bookings-by") || "startDate-desc";
  const sort = {
    column: sortValue.split("-")[0],
    method: sortValue.split("-")[1],
  };

  const curPage = Number(searchParams.get("pagination")) || 1;
  const pagination = {
    start: (curPage - 1) * bookmarksPerPage + 1,
    end: curPage * bookmarksPerPage,
  };

  const { data: { data, count } = {}, isPending } = useQuery({
    queryKey: ["Bookings", filterValue, sortValue, curPage],
    queryFn: () => getBookings({ filter, sort, pagination }),
  });

  const maxPage = Math.ceil(count / bookmarksPerPage);

  if (curPage < maxPage)
    queryClient.prefetchQuery({
      queryKey: ["Bookings", filterValue, sortValue, curPage + 1],
      queryFn: () =>
        getBookings({
          filter,
          sort,
          pagination: {
            start: curPage * bookmarksPerPage + 1,
            end: (curPage + 1) * bookmarksPerPage,
          },
        }),
    });

  if (curPage > 1)
    queryClient.prefetchQuery({
      queryKey: ["Bookings", filterValue, sortValue, curPage - 1],
      queryFn: () =>
        getBookings({
          filter,
          sort,
          pagination: {
            start: (curPage - 2) * bookmarksPerPage + 1,
            end: (curPage - 1) * bookmarksPerPage,
          },
        }),
    });

  return { data, count, isPending };
}

export default useBookings;
