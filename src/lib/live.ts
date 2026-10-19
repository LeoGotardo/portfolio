import { createContext } from "react";

/** False while a project panel is covered or off-screen: its mock pauses timers and looping animations. */
export const LiveContext = createContext(true);
