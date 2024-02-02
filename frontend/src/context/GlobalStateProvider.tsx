import { useState } from "react";
import GlobalStateContext from "./GlobalStateContext";
import { GlobalState } from "../types";

type props = {
    children: React.ReactNode
}

const GlobalStateProvider = ({ children }: props) => {
    const [globalState, setGlobalState] = useState<GlobalState>({ isLoggedIn: false });

    return (
        <GlobalStateContext.Provider value={{globalState, setGlobalState}}>
            {children}
        </GlobalStateContext.Provider>
    )
}

export default GlobalStateProvider;