import React from "react";
import { FaUserCircle as Avatar } from "react-icons/fa";
import { MdClose as Close } from "react-icons/md";
import "./Notification.css";

const Notification = (props) => {
    if (props.popup) {
        props.setShowNotifications(false);
        const notification = props.notifications[0];
        return (
            <div className="Notification-popup">
                <div className="Avatar">
                    <Avatar color="rgba(40, 130, 150, 0.5)" size={55} />
                </div>
                <div className="Desc">
                    <p>
                        <span>{notification.user.role === "admin" ? "The administrator " : "The user "}</span>
                        <strong>{notification.user.username + " from "}</strong>
                        <strong>{notification.user.from + " "}</strong>
                        <span>{notification.description + " "}</span>
                        <strong>{notification.client}</strong>
                    </p>
                    <span>{notification.date}</span>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="Notification">
                <div className="Avatar">
                    <Avatar color="rgba(40, 130, 150, 0.5)" size={55} />
                </div>
                <div className="Desc">
                    <p>
                        <span>{props.user.role === "admin" ? "The administrator " : "The user "}</span>
                        <strong>{props.user.username + " from "}</strong>
                        <strong>{props.user.from + " "}</strong>
                        <span>{props.description + " "}</span>
                        <strong>{props.client}</strong>
                    </p>
                    <span>{props.date}</span>
                </div>
                <div className="Close" onClick={() => !props.showNotification && props.setClosedNotification(props.id)}>
                    <Close size={15} color={"tomato"} />
                </div>
            </div>
        );
    }
}

export default Notification;