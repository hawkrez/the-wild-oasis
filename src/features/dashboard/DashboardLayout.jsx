import styled from "styled-components";
import { useGetBookingsAfterDate } from "./useGetBookingsAfterDate";
import { useGetStaysAfterDate } from "./useGetStaysAfterDate";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

export default function DashboardLayout() {
  const { data: BookingsAfterDate, isPending: isPending1 } =
    useGetBookingsAfterDate();

  const {
    arrivedStays,
    numDays,
    isPending: isPending2,
  } = useGetStaysAfterDate();

  const { data: Cabins, isPending: isPending3 } = useCabins();

  const isBusy = isPending1 || isPending2 || isPending3;
  if (isBusy) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        BookingsAfterDate={BookingsAfterDate}
        arrivedStays={arrivedStays}
        numDays={numDays}
        cabinCount={Cabins.length}
      />
      <TodayActivity />
      <DurationChart stays={arrivedStays} />
      <SalesChart bookings={BookingsAfterDate} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

const StyledDashboardLayout = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
