import { useContext } from "react";
import { DarkModeContext } from "./DarkModeContext";

export function useDarkModeContext() {
  const contextValue = useContext(DarkModeContext);

  if (!contextValue)
    throw new Error(
      "You used DarkModeContext outside of DarkModeContext.Provider"
    );

  return contextValue;
}
