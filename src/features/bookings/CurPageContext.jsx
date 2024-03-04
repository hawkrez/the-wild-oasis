/*eslint react/prop-types:0 */

import { createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const CurPageContext = createContext();

export function ContextProvider({ children }) {
  const [searchParams] = useSearchParams();
  const [curPage, setCurPage] = useState(
    () => Number(searchParams.get("pagination")) || 1
  );

  return (
    <CurPageContext.Provider value={{ curPage, setCurPage }}>
      {children}
    </CurPageContext.Provider>
  );
}
