import React from 'react';
import './Home.css';

import IamLogo from "../../../images/iam.png";
import OrangeLogo from "../../../images/orange.png";
import InwiLogo from "../../../images/inwi.png";

import RadeejLogo from "../../../images/radeej.png";
import LydecLogo from "../../../images/lydec.png";

import MoneyTransferLogo from "../../../images/moneyTransfer.png";

import { TiChevronRight as Right } from "react-icons/ti";

const Home = (props) => {
    return (
        <div className="Home">
            <div className="Service">
                <h2>Recharge</h2>
                <div className="Card" onClick={() => {props.activateItem(1); props.setSubItemSelected("Iam")}}>
                    <div className="Left-side">
                        <img src={IamLogo} alt="IAM Logo"/>
                    </div>
                    <div className="Body">
                        IAM Recharge
                    </div>
                    <div className="Right-side">
                        <Right color={"blue"} size={25}/>
                    </div>
                </div>
                <div className="Card" onClick={() => {props.activateItem(1); props.setSubItemSelected("Orange")}}>
                    <div className="Left-side">
                        <img src={OrangeLogo} alt="ORANGE Logo"/>
                    </div>
                    <div className="Body">
                        ORANGE Recharge
                    </div>
                    <div className="Right-side">
                        <Right color={"orangered"} size={25}/>
                    </div>
                </div>
                <div className="Card" onClick={() => {props.activateItem(1); props.setSubItemSelected("Inwi")}}>
                    <div className="Left-side">
                        <img src={InwiLogo} alt="INWI Logo"/>
                    </div>
                    <div className="Body">
                        INWI Recharge
                    </div>
                    <div className="Right-side">
                        <Right color={"purple"} size={25}/>
                    </div>
                </div>
            </div>

            <div className="Service">
                <h2>Bill Payment</h2>
                <div className="Card" onClick={() => {props.activateItem(1); props.setSubItemSelected("Radeej")}}>
                    <div className="Left-side">
                        <img src={RadeejLogo} alt="RADEEJ Logo"/>
                    </div>
                    <div className="Body">
                        RADEEJ Bill payment
                    </div>
                    <div className="Right-side">
                        <Right color={"green"} size={25}/>
                    </div>
                </div>
                <div className="Card" onClick={() => {props.activateItem(1); props.setSubItemSelected("Lydec")}}>
                    <div className="Left-side">
                        <img src={LydecLogo} alt="Lydec Logo"/>
                    </div>
                    <div className="Body">
                        Lydec Bill payment
                    </div>
                    <div className="Right-side">
                        <Right color={"grey"} size={25}/>
                    </div>
                </div>
            </div>

            <div className="Service">
                <h2>Money transfer</h2>
                <div className="Card" onClick={() => {props.activateItem(1); props.setSubItemSelected("Money Transfer")}}>
                    <div className="Left-side">
                        <img src={MoneyTransferLogo} alt="Money transfer Logo"/>
                    </div>
                    <div className="Body">
                        Money transfer
                    </div>
                    <div className="Right-side">
                        <Right color={"orange"} size={25}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;