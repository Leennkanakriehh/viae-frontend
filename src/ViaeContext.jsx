import { createContext } from "react";

export const viaeContext = createContext({
    rides: [],
    drivers: [],
    assignDriver: () => { throw new Error("assignDriver must be used inside ViaeProvider") }
})