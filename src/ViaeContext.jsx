import { createContext } from "react";

//this object becomes your shared state container.
export const viaeContext = createContext({
    rides: [],
    drivers: [],
    assignDriver: () => { throw new Error("assignDriver must be used inside ViaeProvider") },
})