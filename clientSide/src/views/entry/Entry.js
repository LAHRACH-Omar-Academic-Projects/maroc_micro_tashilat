import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { FaFontAwesomeFlag as Logo } from "react-icons/fa";
import { FiMenu as Toggler } from "react-icons/fi";
import { MdNotificationsNone as NotificationIcon } from "react-icons/md";
import { TiUser as User } from "react-icons/ti";
import { AiFillHome as HomeIcon } from 'react-icons/ai';
import { FaServicestack as Services } from 'react-icons/fa';
import { IoMdAnalytics as Analytics } from "react-icons/io";
import { AiFillPlusCircle as Item } from "react-icons/ai";
import { FaUsersCog as Users } from 'react-icons/fa';
import { SiDiscover as Disc } from "react-icons/si";

import './Entry.css';
import CustomPopupMenu from '../../components/popupMenu/CustomPopupMenu';
import Recharge from './services/recharge/Recharge';
import BillPayment from "./services/billPayment/BillPayment";
import MoneyTransfer from './services/moneyTransfer/MoneyTransfer';
import Administration from './administration/Administration';
import Notification from '../../components/notification/Notification';
import Home from '../entry/home/Home';

const Notifications = (props) => {
    const [exists, setExists] = useState(false);

    const clearAllNotifications = () => {
        localStorage.setItem("notifications", JSON.stringify([]));
        props.setClearAllNotifications(!props.clearAllNotifications);
        setExists(false);
    }

    useEffect(() => {
        if (props.notificationList.length !== 0) {
            setExists(true);
        }
        else {
            setExists(false);
        }
    })

    return (
        <div className="Notifications">
            <div className="Header">
                <h3>Notifications</h3>
            </div>
            {!exists && (
                <div className="NoNotifications">
                    <NotificationIcon size={45} />
                    <span>No Notificattions</span>
                </div>
            )}
            {exists && (
                <div className="Body">
                    <div className="New">
                        <span>New</span>
                    </div>
                    {props.notificationList.length !== 0 && props.notificationList.map((notification, position) => {
                        if (position <= 2) {
                            return (
                                <Notification
                                    key={notification.id}
                                    showNotification={props.showNotification}
                                    setClosedNotification={props.setClosedNotification}
                                    id={notification.id}
                                    position={position}
                                    user={notification.user}
                                    client={notification.client}
                                    description={notification.description}
                                    date={notification.date}
                                />
                            )
                        }
                    })}
                    <div className="Earlier">
                        <span>Earlier</span>
                    </div>
                    {props.notificationList.map((notification, position) => {
                        if (position > 2) {
                            return (
                                <Notification
                                    key={notification.id}
                                    setClosedNotification={props.setClosedNotification}
                                    id={notification.id}
                                    position={position}
                                    user={notification.user}
                                    client={notification.client}
                                    description={notification.description}
                                    date={notification.date}
                                />
                            )
                        }
                    })}
                </div>
            )}
            <div className="Footer">
                <span onClick={() => clearAllNotifications()}>Mark all as read</span>
            </div>
        </div>
    );
}

const Entry = (props) => {
    
    const [marginTop, setMarginTop] = useState(5);
    const [itemSelected, setItemSelected] = useState(0);
    const [subItemSelected, setSubItemSelected] = useState("Iam");
    const [expanded, setExpanded] = useState(true);
    const [scrolling, setScrolling] = useState(false);
    const [showAside, setShowAside] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showNavbarPopup, setShowNavbarPopup] = useState(false);
    const [notificationList, setNotificationList] = useState([]);
    const [closedNotification, setClosedNotification] = useState(null);
    const [clearAllNotifications, setClearAllNotifications] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.auth);

    let notifications = JSON.parse(localStorage.getItem("notifications"));
    
        useEffect(() => {
        
        window.addEventListener("scroll", () => {
            setScrolling(true);
            if (window.scrollY === 0) {
                setScrolling(false);
            }
        })
        function checkNotifications() {
            if (notifications !== null) {
                notifications.sort((a, b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0));
                if (closedNotification !== null) {
                    notifications = notifications.filter(notification => notification.id !== closedNotification);
                }
                if (notifications !== []) {
                    setNotificationList(notifications);
                    localStorage.setItem("notifications", JSON.stringify(notifications));
                }
            }
        }
        checkNotifications();

        window.addEventListener('storage', checkNotifications);
    }, [dispatch, showNotifications, clearAllNotifications, closedNotification, showNotification]);

    const activateItem = (index) => {
        var margin = index * 5 + 5 + index * 70;
        setMarginTop(margin);
        setExpanded(true);
        setItemSelected(null);
        setTimeout(() => {
            setItemSelected(index);
        }, 200);
    }

    const activateSubItem = (Item) => {
        setSubItemSelected(Item);
    }

    if (!currentUser) {
        return <Redirect to={"/login"} />;
    }

    return (
        <div className="Container">
            <header style={{ boxShadow: scrolling ? "0px 0px 10px #ccc" : "" }}>
                <nav>
                    <ul className="Navbar-left">
                        <li onClick={() => { setExpanded(!expanded); setShowAside(true) }}>
                            <Toggler size={22} color={"rgba(40, 53, 147, 0.64)"} />
                        </li>
                        <li onClick={() => activateItem(0)}>
                            <Logo size={30} color={"#3f51b5"} />
                            <span>Tashilat maroc</span>
                        </li>
                    </ul>
                    <ul className="Navbar-right">
                        <li className="Notification-item" onClick={() => setShowNotifications(!showNotifications)}>
                            {notificationList.length !== 0 && (
                                <Disc className="Disc" size={12} />
                            )}
                            <NotificationIcon size={25} color="rgba(0, 0, 0, 0.65)" />
                        </li>
                        {showNotifications && (
                            <Notifications
                                showNotification={showNotification}
                                notificationList={notificationList}
                                setClosedNotification={setClosedNotification}
                                setClearAllNotifications={setClearAllNotifications}
                                clearAllNotifications={clearAllNotifications} />
                        )}
                        {currentUser && (
                            <div>
                                <li className="User-item" onClick={() => setShowNavbarPopup(!showNavbarPopup)}>
                                    <User size={35} color="rgba(255,255,255,0.8)" />
                                </li>
                                {showNavbarPopup && (
                                    <CustomPopupMenu />
                                )}
                            </div>
                        )}
                    </ul>
                </nav>
            </header>

            <aside style={{ display: showAside ? 'flex' : "none" }}>
                <nav>
                    <ul>
                        <li style={{ marginTop: marginTop + "px" }}></li>
                    </ul>
                    <ul>
                        <li onClick={() => activateItem(0)}>
                            <HomeIcon size={30} color={itemSelected === 0 ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.25)"} />
                            <span style={{ color: itemSelected === 0 ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.54)" }}>Home</span>
                        </li>
                        <li onClick={() => activateItem(1)}>
                            <Services size={30} color={itemSelected === 1 ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.25)"} />
                            <span style={{ color: itemSelected === 1 ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.54)" }}>Services</span>
                        </li>
                        <li onClick={() => activateItem(2)}>
                            <Analytics size={28} color={itemSelected === 2 ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.25)"} />
                            <span style={{ color: itemSelected === 2 ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.54)" }}>Analytics</span>
                        </li>
                        {currentUser && currentUser.role === "admin" && (
                            <li onClick={() => activateItem(3)}>
                                <Users size={28} color={itemSelected === 3 ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.25)"} />
                                <span style={{ color: itemSelected === 3 ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.54)" }}>Users</span>
                            </li>
                        )}
                    </ul>
                </nav>
                <nav>
                    {itemSelected === 1 && (
                        <div>
                            <span className="subtitle">RECHARGE</span>
                            <ul>
                                <li onClick={() => activateSubItem("Iam")} style={{ backgroundColor: subItemSelected === "Iam" ? "rgba(40, 130, 150, 0.2)" : "" }}>
                                    <Item size={14} color={subItemSelected === "Iam" ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.4)"} />
                                    <span style={{ color: subItemSelected === "Iam" ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.6)" }}>Iam</span>
                                </li>
                                <li onClick={() => activateSubItem("Orange")} style={{ backgroundColor: subItemSelected === "Orange" ? "rgba(40, 130, 150, 0.2)" : "" }}>
                                    <Item size={14} color={subItemSelected === "Orange" ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.4)"} />
                                    <span style={{ color: subItemSelected === "Orange" ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.6)" }}>Orange</span>
                                </li>
                                <li onClick={() => activateSubItem("Inwi")} style={{ backgroundColor: subItemSelected === "Inwi" ? "rgba(40, 130, 150, 0.2)" : "" }}>
                                    <Item size={14} color={subItemSelected === "Inwi" ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.4)"} />
                                    <span style={{ color: subItemSelected === "Inwi" ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.6)" }}>Inwi</span>
                                </li>
                            </ul>

                            <span className="subtitle">BILL PAYMENT</span>
                            <ul>
                                <li onClick={() => activateSubItem("Lydec")} style={{ backgroundColor: subItemSelected === "Lydec" ? "rgba(40, 130, 150, 0.2)" : "" }}>
                                    <Item size={14} color={subItemSelected === "Lydec" ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.4)"} />
                                    <span style={{ color: subItemSelected === "Lydec" ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.6)" }}>Lydec</span>
                                </li>
                                <li onClick={() => activateSubItem("Radeej")} style={{ backgroundColor: subItemSelected === "Radeej" ? "rgba(40, 130, 150, 0.2)" : "" }}>
                                    <Item size={14} color={subItemSelected === "Radeej" ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.4)"} />
                                    <span style={{ color: subItemSelected === "Radeej" ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.6)" }}>Radeej</span>
                                </li>
                            </ul>

                            <span className="subtitle">MONEY TRANSFER</span>
                            <ul>
                                <li onClick={() => activateSubItem("Money Transfer")} style={{ backgroundColor: subItemSelected === "Money Transfer" ? "rgba(40, 130, 150, 0.2)" : "" }}>
                                    <Item size={14} color={subItemSelected === "Money Transfer" ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.4)"} />
                                    <span style={{ color: subItemSelected === "Money Transfer" ? "rgb(50, 66, 185)" : "rgba(0, 0, 0, 0.6)" }}>Money Transfer</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </nav>
            </aside>

            <section style={{ marginLeft: expanded ? "298px" : "120px" }}>
                {itemSelected === 1 && (
                    <h1 className="Big-Title">{subItemSelected}</h1>
                )}

                {itemSelected === 0 && (
                    <Home activateItem={activateItem} setSubItemSelected={setSubItemSelected} />
                )}
                {itemSelected === 3 && (
                    <Administration setShowNotification={setShowNotification} />
                )}
                {itemSelected === 1 && ["Iam", "Orange", "Inwi"].includes(subItemSelected) && (
                    <Recharge company={subItemSelected} setShowNotification={setShowNotification} />
                )}
                {itemSelected === 1 && ["Lydec", "Radeej"].includes(subItemSelected) && (
                    <BillPayment company={subItemSelected} setShowNotification={setShowNotification} />
                )}
                {itemSelected === 1 && "Money Transfer" === subItemSelected && (
                    <MoneyTransfer setShowNotification={setShowNotification} />
                )}
                {showNotification && (
                    <Notification notifications={JSON.parse(localStorage.getItem("notifications"))} popup={true} setShowNotifications={setShowNotifications} />
                )}
            </section>

            <section onClick={() => { setExpanded(false); setShowAside(false) }} style={{ display: showAside ? 'flex' : "none" }}>

            </section>
        </div>
    );
}

export default Entry;