import { useState } from "react";
import LoginScreen from "./LoginScreen";
import MapScreen from "./MapScreen";

export default () => {

    const [isLoggedIn, setLoggedIn] = useState(false);

    return <>
        <LoginScreen active={!isLoggedIn} onSuccess={() => {
            setLoggedIn(true);
        }}/>
        <MapScreen active={isLoggedIn} onLogout={() => {
            setLoggedIn(false);
        }}/>
    </>;
};