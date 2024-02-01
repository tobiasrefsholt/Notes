import { createContext } from "react";
import { GlobalStateProps } from "../types";

const GlobalStateContext = createContext<GlobalStateProps | undefined>(undefined);

export default GlobalStateContext;