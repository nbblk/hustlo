import React from "react";
import ReactDOM from "react-dom";

import Header from "../components/Header";
import InputBox from "../components/InputBox";
import Button from "../components/Button";

class Landing extends React.Component {
    // change header color from transparent into white when user scrolls down the screen
    render () {
        return <div className="h-screen w-screen">
            <Header color="transparent" />
        <div className="w-2/3 mt-48 m-4">
            <h1 className="my-4 font-krona text-3xl">Hustlo helps your side hustle move forward.</h1>
            <p className="my-8 w-3/4 font-nunito">Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique—accomplish it all with Hustlo.</p>
            <InputBox type="text" width="2/5" height="10" placeholder="Email"/>
            <Button width="1/4" height="10" color="blue" value="Sign up — it’s free!" />
        </div>
        </div>   
    }
}

export default Landing;