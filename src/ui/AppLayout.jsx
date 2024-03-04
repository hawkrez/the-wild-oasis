import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import SideBar from "./SideBar";

const StyledAppLayout = styled.div`
  height: 100dvh;
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;
const StyledOutlet = styled.div`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  overflow: auto;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <SideBar />
      <Header />
      <StyledOutlet>
        <Outlet />
      </StyledOutlet>
    </StyledAppLayout>
  );
}

export default AppLayout;
