import { useSearchParams } from "react-router-dom";

import CabinRow from "./CabinRow";
import Spinner from "../../ui/Spinner";
import Menus from "../../ui/Menus";
import Table from "../../ui/Table";
import CabinsFilterAndSort from "./CabinsFilterAndSort";
import EmptyPage from "../../ui/EmptyPage";
import { useCabins } from "./useCabins";

function CabinTable() {
  const { data: cabins, isPending: isFetching } = useCabins();

  const [searchParams] = useSearchParams();

  // filter based on discount
  const filterMethod = searchParams.get("discount-status") || "all";
  let filteredCabins =
    filterMethod === "all"
      ? cabins
      : filterMethod === "with-discount"
      ? cabins?.filter((cabin) => cabin.discount > 0)
      : filterMethod === "without-discount"
      ? cabins?.filter((cabin) => cabin.discount < 1)
      : {};

  // sort
  const [sortBy, sortMethod] = searchParams
    .get("sort-cabins-by")
    ?.split("-") || ["name", "asc"];
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[sortBy] - b[sortBy]) * (sortMethod === "asc" ? 1 : -1)
  );

  if (isFetching) return <Spinner />;
  if (!sortedCabins[0]) return <EmptyPage name="cabins" />;
  return (
    <>
      <CabinsFilterAndSort />
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <p>cabin</p>
          <p>Img</p>
          <p>capacity</p>
          <p>Price</p>
          <p>Discount</p>
        </Table.Header>
        <Menus>
          <Table.Body
            data={sortedCabins}
            render={(cabin) => <CabinRow cabinInfo={cabin} key={cabin.id} />}
          />
        </Menus>
      </Table>
    </>
  );
}

export default CabinTable;
