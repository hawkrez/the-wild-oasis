import BookingTable from "../features/bookings/BookingTable";
import BookmarsFilterAndSort from "../features/bookings/BookmarsFilterAndSort";
import { ContextProvider } from "../features/bookings/CurPageContext";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Bookings() {
  return (
    <ContextProvider>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookmarsFilterAndSort />
      </Row>
      <BookingTable />
    </ContextProvider>
  );
}

export default Bookings;
