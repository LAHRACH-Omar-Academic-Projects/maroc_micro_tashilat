import React, { useState, useEffect } from 'react';

import { RiShieldUserFill as RoleIcon } from "react-icons/ri";

import './CustomDropdown.css';

const Icon = (props) => {
    const color = props.color;
    const size = 20;

    return (
        <RoleIcon size={size} color={color} />
    )
}

const CustomDropdown = (props) => {
    const onChange = props.onChange;
    const validity = props.validity;

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
    });

    return (
        <div className={"CustomDropdown"}>
            <div className={"Dropdown"}>
                <div className="CustomDropdownIcon">
                    <Icon color={color}/>
                </div>
                <select
                    className={"DefaultDropdown"}
                    onChange={(value) => onChange(value)}
                >
                    <option value="">Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            {validity !== null && showWarning && (
                <div className="Warning">
                    {validity.message}
                </div>
            )}
        </div>
    )
}

export default CustomDropdown;