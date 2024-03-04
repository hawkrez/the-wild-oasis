/*eslint react/prop-types:0 */

import { HiOutlineBriefcase, HiOutlineChartBar } from "react-icons/hi";
import Stat from "./Stat";
import { HiOutlineBanknotes, HiOutlineCalendarDays } from "react-icons/hi2";
import { formatCurrency } from "../../utils/helpers";

export default function Stats({
  BookingsAfterDate,
  arrivedStays,
  numDays,
  cabinCount,
}) {
  // 1.
  const numBookings = BookingsAfterDate.length;
  // 2.
  const sales = BookingsAfterDate.reduce((acc, cur) => acc + cur.totalPrice, 0);
  // 3.
  const checkins = arrivedStays.length;
  // 4.
  const occupation =
    arrivedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount);

  console.log(numBookings, sales, checkins, occupation);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checkins}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupation * 100) + "%"}
      />
    </>
  );
}
