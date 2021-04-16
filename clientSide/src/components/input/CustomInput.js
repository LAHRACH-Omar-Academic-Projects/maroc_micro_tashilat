import React, { useState, useEffect } from 'react';

import { TiUser as UsernameIcon } from "react-icons/ti";
import { MdEmail as EmailIcon } from 'react-icons/md'
import { RiLockPasswordFill as PasswordIcon } from "react-icons/ri";
import { GiConfirmed as ConfirmPasswordIcon } from "react-icons/gi";
import { RiBankFill as AgencyNameIcon } from "react-icons/ri";
import { AiOutlineNumber as AgencyIdIcon } from "react-icons/ai";
import { MdPhone as PhoneIcon } from "react-icons/md";
import { GiTakeMyMoney as Money } from "react-icons/gi";

import './CustomInput.css';

const Icon = (props) => {
    const color = props.color;
    const size = 20;
    const style = props.style;

    switch (style) {
        case "username":
            return (
                <UsernameIcon size={size} color={color} />
            )
        case "email":
            return (
                <EmailIcon size={size} color={color} />
            )
        case "password":
            return (
                <PasswordIcon size={size} color={color} />
            )
        case "confirmPassword":
            return (
                <ConfirmPasswordIcon size={size} color={color} />
            )
        case "agencyName":
            return (
                <AgencyNameIcon size={size} color={color} />
            )
        case "agencyId":
            return (
                <AgencyIdIcon size={size} color={color} />
            )
        case "phone":
            return (
                <PhoneIcon size={size} color={color} />
            )
        case "cin":
            return (
                <AgencyIdIcon size={size} color={color} />
            )
        case "paymentCode":
            return (
                <AgencyIdIcon size={size} color={color} />
            )
        case "money":
            return (
                <Money size={size} color={color} />
            )
        default:
            break;
    }
}

const CustomInput = (props) => {
    const style = props.inputStyle;
    const type = props.type;
    const placeholder = props.placeholder;
    const onChange = props.onChange;
    const validity = props.validity;
    const readOnly = props.readOnly;
    const [value, setValue] = useState(props.value !== "" ? props.value : "");

    const [showWarning, setShowWarning] = useState(true);
    const [color, setColor] = useState("")

    useEffect(() => {
        if (validity !== null) {
            if (validity.isValid) {
                setColor("rgb(0, 199, 83)");
                setShowWarning(false);
            }
            else if (!validity.isValid) {
                setColor("orange");
                setShowWarning(true);
            }
        }
        else {
            setColor("rgb(98, 111, 133)");
            setShowWarning(true);
        }
    }, [color, validity]);

    return (
        <div className={"CustomInput"}>
            <div className={"Field"}>
                <div className="CustomInputIcon">
                    <Icon color={color} style={style} />
                </div>
                <input
                    type={type}
                    className={"DefaultInput"}
                    placeholder={placeholder}
                    value={value}
                    readOnly={readOnly}
                    onChange={(text) => {onChange(text); setValue(text.target.value)}}
                />
            </div>
            {validity !== null && showWarning && (
                <div className="Warning">
                    {validity.message}
                </div>
            )}
        </div>
    )
}

export default CustomInput;