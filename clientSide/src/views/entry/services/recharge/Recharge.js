import React, { useEffect } from 'react';
import './Recharge.css';
import { GoSearch as SearchIcon } from "react-icons/go";
import { RiAddLine as AddIcon } from "react-icons/ri";
import { FaUserCircle as Avatar } from "react-icons/fa";
import { MdEdit as Edit } from "react-icons/md";
import { MdMoreVert as More } from "react-icons/md";
import { AiOutlineStar as Star } from "react-icons/ai";
import { AiFillStar as Favorite } from "react-icons/ai";
import { MdDelete as Delete } from "react-icons/md";
import { MdClose as Close } from "react-icons/md";
import { AiOutlineLeft as Left } from "react-icons/ai";
import { AiOutlineRight as Right } from "react-icons/ai";
import { CgDetailsMore as NoDetails } from "react-icons/cg";
import { FaListAlt as NoRecharges } from "react-icons/fa";
import Loader from 'react-loaders'
import { BiMehBlank as NoClients } from "react-icons/bi";
import { useState } from 'react';
import CustomInput from '../../../../components/input/CustomInput';
import CustomButton from '../../../../components/button/CustomButton';
import userService from '../../../../services/user-service';
import { useSelector } from 'react-redux';
import clientService from '../../../../services/client-service';
import rechargeService from '../../../../services/recharge-service';

const ClientItem = (props) => {
    return (
        <li onClick={props.handleClick} style={{ backgroundColor: props.selectedItem === props.position ? "rgba(255, 255, 255, 0.8)" : "" }}>
            <Avatar color="rgba(40, 130, 150, 0.5)" size={45} />
            <div className="Info">
                <span className="Name">{props.fullName}</span>
                <span className="NumberOfRecharges">Number of Recharges : {props.numberOfRecharges}</span>
            </div>
        </li>
    );
}

const RechargeItem = (props) => {
    const [favorite, setFavorite] = useState(props.favorite);

    const { user: currentUser } = useSelector((state) => state.auth);

    const deleteRecharge = () => {
        rechargeService.deleteRecharge(props.id)
            .then(() => {
                props.setRechargeDeleted(!props.rechargeDeleted);
                let notificationList = [];
                notificationList = JSON.parse(localStorage.getItem("notifications"));

                const date = new Date();
                const time = date.getHours() + ":" + date.getMinutes();
                const notification = {
                    "id": notificationList.length + 1,
                    "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                    "client": props.clientFullname,
                    "description": "deleted an " + props.company + " Recharge of the client",
                    "date": date.toDateString() + " " + time
                }

                notificationList.push(notification);
                localStorage.setItem("notifications", JSON.stringify(notificationList));
                props.setShowNotification(true);
                setTimeout(() => {
                    props.setShowNotification(false);
                }, 5000);
            })
            .catch(() => {
                props.setRechargeDeleted(false);
            })
    }

    const addToFavorite = () => {
        rechargeService.favorite(props.id, props.phone, props.price, props.operationType, props.company, props.date, !favorite, props.clientId)
            .then(() => {
                setFavorite(!favorite)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <li onClick={props.handleClick} style={{ backgroundColor: props.selectedItem === props.position ? "rgba(255, 255, 255, 0.8)" : "" }}>
            <div className="Info">
                <div className="Star" onClick={() => addToFavorite()}>
                    {favorite ?
                        <Favorite size={20} color={"orange"} />
                        :
                        <Star size={20} />
                    }
                </div>
                <div>
                    <span className="Phone">{props.phone}</span>
                    <span className="Date">{props.date}</span>
                </div>
                <div>
                    <span className="Price">Price : {props.price} DHS</span>
                    <span className="OperationType">{props.operationType}</span>
                </div>
            </div>

            <div className="Options">
                <div className="Delete" onClick={() => deleteRecharge()}>
                    <Delete size={20} color="#f44336" />
                </div>
            </div>
        </li>
    );
}

const ClientDetails = (props) => {
    const [selected, setSelected] = useState(null);
    const [rechargeList, setRechargeList] = useState([]);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [rechargeDeleted, setRechargeDeleted] = useState(false);
    const [keyword, setKeyword] = useState("");

    const { user: currentUser } = useSelector((state) => state.auth);

    const deleteClient = () => {
        clientService.deleteClient(props.client.clientId)
            .then(() => {
                props.setClientDeleted(!props.clientDeleted);
                let notificationList = [];
                notificationList = JSON.parse(localStorage.getItem("notifications"));

                const date = new Date().toDateString();
                const notification = {
                    "id": notificationList.length + 1,
                    "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                    "client": props.client.fullName,
                    "description": "deleted the client",
                    "date": date
                }

                notificationList.push(notification);
                localStorage.setItem("notifications", JSON.stringify(notificationList));
                props.setShowNotification(true);
                setTimeout(() => {
                    props.setShowNotification(false);
                }, 5000);
            })
            .catch(() => {
                props.setClientDeleted(false);
            })
    }

    useEffect(() => {
        if (keyword === "") {
            rechargeService.getAllRecharges(props.client.clientId)
                .then((res) => {
                    const rechargeList = [];
                    res.data.forEach((recharge) => {
                        if (recharge.company === props.company) {
                            rechargeList.push(recharge);
                        }
                    })
                    rechargeList.sort((a, b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0));
                    setRechargeList(rechargeList);
                    props.setRechargeDeleted(rechargeDeleted);
                })
        }

        else {
            rechargeService.getRechargesByKeyword(keyword)
                .then((res) => {
                    const rechargeList = [];
                    res.data.forEach((recharge) => {
                        if (recharge.company === props.company && recharge.client.clientId === props.client.clientId) {
                            rechargeList.push(recharge);
                        }
                    })
                    setRechargeList(rechargeList);
                    props.setRechargeDeleted(rechargeDeleted);
                })
        }
    }, [props.newRecharge, props.client.clientId, props.company, rechargeDeleted, keyword])

    return (
        <div className="Details">
            <div className="Header">
                <div className="Client">
                    <Avatar color="rgba(40, 130, 150, 0.5)" size={60} />
                    <div className="Info">
                        <span className="Name">{props.client.fullName}</span>
                        <span className="Cin">CIN : {props.client.cin}</span>
                    </div>
                </div>
                <div className="Options">
                    <div className="Edit" onClick={() => props.setShowUpdateClientForm(true)}>
                        <Edit size={24} color="rgba(0, 0, 0, 0.54)" />
                    </div>
                    <div className="More" onClick={() => setShowMoreOptions(!showMoreOptions)}>
                        <More size={25} color="rgba(0, 0, 0, 0.54)" />
                    </div>
                    {showMoreOptions && (
                        <div className="MoreOptionsPopup">
                            <ul>
                                <li className="popup-item" onClick={() => deleteClient()}>
                                    <Delete />
                                    <span className="item-text">Delete client</span>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="Body">
                <div className="Header">
                    <div className="Search">
                        <SearchIcon size={18} color="rgba(0, 0, 0, 0.54)" />
                        <input type="text" placeholder="Search" onChange={(text) => setKeyword(text.target.value)} />
                    </div>
                </div>
                <div className="RechargeList">
                    <ul>
                        {rechargeList.length !== 0 ? rechargeList.map((recharge, pos) => {
                            return (
                                <RechargeItem
                                    key={recharge.id}
                                    id={recharge.id}
                                    setRechargeDeleted={setRechargeDeleted}
                                    rechargeDeleted={rechargeDeleted}
                                    position={pos}
                                    phone={recharge.phone}
                                    favorite={recharge.favorite}
                                    setShowNotification={props.setShowNotification}
                                    price={recharge.price}
                                    company={recharge.company}
                                    clientId={props.client.clientId}
                                    clientFullname={props.client.fullName}
                                    operationType={recharge.operationType}
                                    date={recharge.date}
                                    handleClick={() => setSelected(pos)}
                                    selectedItem={selected}
                                />
                            );
                        }) :
                            (
                                <div className="NoRecharges">
                                    <NoRecharges size={45} />
                                    <span>The list of recharges is empty, try to add one by clicking on "+" below</span>
                                </div>
                            )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

const AddRechargeForm = (props) => {
    const [phone, setPhone] = useState("");
    const [phoneValidity, setPhoneValidity] = useState(null);
    const [price, setPrice] = useState(10);
    const [operationType, setOperationType] = useState(0);
    const [animation, setAnimation] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth)

    const types = ["*3", "*2", "*7", "*6"]

    const next = () => {
        if ((operationType + 1) < types.length) {
            setOperationType(operationType + 1);
        }
        else {
            setOperationType(0);
        }
        setAnimation(!animation);
    }

    const previous = () => {
        if ((operationType - 1 >= 0)) {
            setOperationType(operationType - 1);
        }
        else {
            setOperationType(types.length - 1);
        }
        setAnimation(!animation);
    }

    const onChangePhone = (e) => {
        const phone = e.target.value;
        if (phone === "") {
            setPhoneValidity({ "isValid": false, "message": "This field is required!" })
        }
        else if (phone.length !== 10) {
            setPhoneValidity({ "isValid": false, "message": "The phone number must have 10 caracter." })
        }
        else {
            setPhoneValidity({ "isValid": true, "message": "" })
            setPhone(phone);
        }
    }


    const handleSave = (e) => {
        e.preventDefault();
        if (phone === "") {
            setPhoneValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (phoneValidity !== null) {
            if (phoneValidity.isValid) {
                let date = new Date();
                rechargeService.saveRecharge(phone, price, types[operationType], currentUser.agencyName, currentUser.agencyId, props.company, date.toDateString(), props.clientId)
                    .then(() => {
                        props.setNewRecharge(!props.newRecharge);
                        let notificationList = [];
                        notificationList = JSON.parse(localStorage.getItem("notifications"));

                        const date = new Date();
                        const time = date.getHours() + ":" + date.getMinutes();
                        const notification = {
                            "id": notificationList.length + 1,
                            "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                            "client": props.clientFullname,
                            "description": "added a new " + props.company + " Recharge for the client",
                            "date": date.toDateString() + " " + time
                        }

                        notificationList.push(notification);
                        localStorage.setItem("notifications", JSON.stringify(notificationList));
                        props.setShowNotification(true);
                        setTimeout(() => {
                            props.setShowNotification(false);
                        }, 5000);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }
    };

    return (
        <div className="AddForm">
            <div className="Header">
                <span>Add New {props.company} Recharge</span>
                <div className="Close" onClick={() => props.setShowAddRechargeForm(false)}>
                    <Close size={25} color={"tomato"} />
                </div>
            </div>
            <div className="Body">
                <form className="Form" onSubmit={handleSave}>
                    <CustomInput inputStyle={"phone"} type={"number"} placeholder={"Phone"} onChange={onChangePhone} validity={phoneValidity} />
                    <div className="Prices">
                        <div className="Price1"
                            onClick={() => setPrice(10)}
                            style={price === 10 ? { transform: "scale(1.5)", boxShadow: "0px 4px 4px rgb(192, 192, 192)", backgroundColor: "purple", color: "white", transition: "0.2s" } : {}}>
                            <span>10</span>
                        </div>
                        <div className="Price2"
                            onClick={() => setPrice(20)}
                            style={price === 20 ? { transform: "scale(1.5)", boxShadow: "0px 4px 4px rgb(192, 192, 192)", backgroundColor: "rgb(55, 235, 130)", color: "white", transition: "0.2s" } : {}}>
                            <span>20</span>
                        </div>
                        <div className="Price3"
                            onClick={() => setPrice(50)}
                            style={price === 50 ? { transform: "scale(1.5)", boxShadow: "0px 4px 4px rgb(192, 192, 192)", backgroundColor: "orange", color: "white", transition: "0.2s" } : {}}>
                            <span>50</span>
                        </div>
                        <div className="Price4"
                            onClick={() => setPrice(100)}
                            style={price === 100 ? { transform: "scale(1.5)", boxShadow: "0px 4px 4px rgb(192, 192, 192)", backgroundColor: "tomato", color: "white", transition: "0.2s" } : {}}>
                            <span>100</span>
                        </div>
                    </div>
                    <div className="OperationType">
                        <div className="LeftSide" onClick={() => previous()}>
                            <Left />
                        </div>
                        <div className="Body">
                            <span style={{ animation: animation ? "translate_from_left 0.2s" : "translate_from_right 0.2s", position: 'absolute' }}>{types[operationType]}</span>
                        </div>
                        <div className="RightSide" onClick={() => next()}>
                            <Right />
                        </div>
                    </div>
                    <CustomButton text={"Save"} />
                </form>
            </div>
        </div>
    );
}

const ClientForm = (props) => {
    const [fullName, setFullName] = useState(props.client.fullName);
    const [cin, setCin] = useState(props.client.cin);

    const [fullNameValidity, setFullNameValidity] = useState(props.client.fullName !== "" ? { "isValid": true, "message": "" } : null);
    const [cinValidity, setCinValidity] = useState(props.client.cin !== "" ? { "isValid": true, "message": "" } : null);

    const { user: currentUser } = useSelector((state) => state.auth);

    const onChangeFullName = (e) => {
        const fullName = e.target.value;
        if (fullName === "") {
            setFullNameValidity({ "isValid": false, "message": "This field is required!" })
        }
        else if (fullName.length < 3 || fullName.length > 20) {
            setFullNameValidity({ "isValid": false, "message": "The username must be between 3 and 20 characters." })
        }
        else {
            setFullNameValidity({ "isValid": true, "message": "" })
            setFullName(fullName);
        }
    };

    const onChangeCin = (e) => {
        const cin = e.target.value;
        if (cin === "") {
            setCinValidity({ "isValid": false, "message": "This field is required!" })
        }
        else if (!((/[a-zA-Z]/i).test(cin[0]) && (/[a-zA-Z]/i).test(cin[1]))) {
            setCinValidity({ "isValid": false, "message": "CIN begins with two letters" })
        }
        else if (cin.length !== 7) {
            setCinValidity({ "isValid": false, "message": "The CIN must be 8 characters." })
        }
        else {
            setCinValidity({ "isValid": true, "message": "" })
            setCin(cin);
        }
    };


    const handleSave = (e) => {
        e.preventDefault();
        if (fullName === "") {
            setFullNameValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (cin === "") {
            setCinValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (fullNameValidity !== null && cinValidity !== null) {
            if (fullNameValidity.isValid && cinValidity.isValid) {
                delete currentUser.token;
                delete currentUser.type;
                switch (props.operation) {
                    case "Add":
                        clientService.saveClient({
                            "client": { "fullName": fullName, "cin": cin },
                            "user": { "userId": currentUser.id, "username": currentUser.username, "email": currentUser.email, "password": currentUser.password, "agencyName": currentUser.agencyName, "agencyId": currentUser.agencyId, "role": currentUser.role }
                        })
                            .then(() => {
                                props.setNewClient(!props.newClient);
                                let notificationList = [];
                                notificationList = JSON.parse(localStorage.getItem("notifications"));

                                const date = new Date();
                                const time = date.getHours() + ":" + date.getMinutes();
                                const notification = {
                                    "id": notificationList.length + 1,
                                    "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                                    "client": fullName,
                                    "description": "added a new client",
                                    "date": date.toDateString() + " " + time
                                }

                                notificationList.push(notification);
                                localStorage.setItem("notifications", JSON.stringify(notificationList));
                                props.setShowNotification(true);
                                setTimeout(() => {
                                    props.setShowNotification(false);
                                }, 5000);
                            })
                        break;
                    case "Update":
                        clientService.saveClient({
                            "client": { "clientId": props.client.clientId, "fullName": fullName, "cin": cin },
                            "user": { "userId": currentUser.id, "username": currentUser.username, "email": currentUser.email, "password": currentUser.password, "agencyName": currentUser.agencyName, "agencyId": currentUser.agencyId, "role": currentUser.role }
                        })
                            .then(() => {
                                props.setClientUpdated(!props.clientUpdated);
                                let notificationList = [];
                                notificationList = JSON.parse(localStorage.getItem("notifications"));

                                const date = new Date();
                                const time = date.getHours() + ":" + date.getMinutes();
                                const notification = {
                                    "id": notificationList.length + 1,
                                    "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                                    "client": props.client.fullName,
                                    "description": "edited the client",
                                    "date": date.toDateString() + " " + time
                                }
                                notificationList.push(notification);
                                localStorage.setItem("notifications", JSON.stringify(notificationList));
                                props.setShowNotification(true);
                                setTimeout(() => {
                                    props.setShowNotification(false);
                                }, 5000);
                            })
                        break;
                    default:
                        break;
                }
            }
        }
    };

    return (
        <div className="AddClientForm">
            <div className="Header">
                <span>{props.operation} {props.company} Client</span>
                <div className="Close" onClick={() => { props.setShowAddClientForm(false); props.setShowUpdateClientForm(false) }}>
                    <Close size={25} color={"tomato"} />
                </div>
            </div>
            <div className="Body">
                <form className="Form" onSubmit={handleSave}>
                    <CustomInput inputStyle={"username"} type={"text"} placeholder={"Full name"} onChange={onChangeFullName} validity={fullNameValidity} value={fullName} />
                    <CustomInput inputStyle={"cin"} type={"text"} placeholder={"CIN"} onChange={onChangeCin} validity={cinValidity} value={cin} />
                    <CustomButton text={"Save"} />
                </form>
            </div>
        </div>
    );
}

const Recharge = (props) => {
    const [ping, setPing] = useState(new Date());
    const [initilaClients, setInitialClients] = useState([]);
    const [selected, setSelected] = useState(0);
    const [showAddClientForm, setShowAddClientForm] = useState(false);
    const [showUpdateClientForm, setShowUpdateClientForm] = useState(false);
    const [showAddRechargeForm, setShowAddRechargeForm] = useState(false);
    const [newClient, setNewClient] = useState(false);
    const [clientUpdated, setClientUpdated] = useState(false);
    const [clientDeleted, setClientDeleted] = useState(false);
    const [newRecharge, setNewRecharge] = useState(false);
    const [rechargeDeleted, setRechargeDeleted] = useState(false);
    const [clientsArray, setClientsArray] = useState([]);
    const [keyword, setKeyword] = useState("");

    let eventSource = new EventSource(`http://192.168.43.253:9091/users/`);
    const { user: currentUser } = useSelector((state) => state.auth)

    if (selected !== 0 && selected >= clientsArray.length) {
        setSelected(clientsArray.length - 1);
    }

    function containsObject(obj, list) {
        var i;
        for (i = 0; i < list.length; i++) {
            if (list[i].clientId === obj.clientId) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        if (keyword != "") {
            clientService.getClientsByKeyword(keyword)
                .then((res) => {
                    const clientList = res.data.map((client) => {
                        rechargeService.getAllRecharges(client.clientId)
                            .then((res) => {
                                const rechargeList = [];
                                res.data.forEach((recharge) => {
                                    if (recharge.company === props.company) {
                                        rechargeList.push(recharge);
                                    }
                                })
                                client.numberOfRecharges = rechargeList.length;
                            })
                        return client;
                    })
                    setTimeout(() => {
                        const clients = [];
                        clientList.forEach((client) => {
                            if (containsObject(client, initilaClients)) {
                                clients.push(client);
                            }
                        })
                        setClientsArray(clients);
                    }, 100);
                })
        }
        else {
            eventSource.addEventListener('ping', function (e) {
                setPing(new Date(e.data))
            });
            setInterval(() => {
                let now = new Date().getTime();
                let diff = (now - ping.getTime());

                if (diff > 20) {
                    userService.getUser(currentUser.id)
                        .then((res) => {
                            const userClientList = res.data.userClientList;
                            const clientList = userClientList.map((item) => {
                                let client = item.client;
                                delete item.userClientKey;
                                rechargeService.getAllRecharges(client.clientId)
                                    .then((res) => {
                                        const rechargeList = [];
                                        res.data.forEach((recharge) => {
                                            if (recharge.company === props.company) {
                                                rechargeList.push(recharge);
                                            }
                                        })
                                        client.numberOfRecharges = rechargeList.length;
                                    })
                                return client;
                            })

                            clientList.sort((a, b) => (a.clientId > b.clientId) ? -1 : ((b.clientId > a.clientId) ? 1 : 0));
                            setTimeout(() => {
                                setClientsArray(clientList);
                                setInitialClients(clientList);
                            }, 100);
                        })

                }
            }, 1000);
        }
    }, [newClient, clientUpdated, clientDeleted, props.company, newRecharge, rechargeDeleted, keyword, currentUser.id]);

    return (
        <div className="Recharge-Card">
            <div className="Card-left">
                <div className="Header">
                    <div className="Top">
                        <div className="Search">
                            <SearchIcon size={25} />
                            <input type="text" placeholder="Search" onChange={(text) => setKeyword(text.target.value)} />
                        </div>
                        <div className="Add" onClick={() => { setShowAddClientForm(true); setShowAddRechargeForm(false) }}>
                            {clientsArray.length === 0 && !showAddClientForm && (
                                <Loader className="HelpLoader" type="ball-scale-ripple-multiple" active color={"rgba(19, 96, 168, 0.096)"} />
                            )}
                            <AddIcon className="AddIcon" color="rgb(31, 77, 175)" size={25} />
                        </div>
                    </div>
                    <div className="Sum">
                        <span>{clientsArray.length} Clients</span>
                    </div>
                </div>
                <div className="Body">
                    <ul>
                        {clientsArray.length !== 0 ? (clientsArray.map((client, pos) => {
                            return (
                                <ClientItem
                                    key={client.clientId}
                                    position={pos}
                                    fullName={client.fullName}
                                    numberOfRecharges={client.numberOfRecharges}
                                    cin={client.cin}
                                    handleClick={() => setSelected(pos)}
                                    selectedItem={selected === clientsArray.length ? selected - 1 : selected}
                                />
                            );
                        }))
                            : (
                                <div className="NoClients">
                                    <NoClients size={45} />
                                    <span>The list of clients is empty, to add a new Client click on "+" symbol on the top</span>
                                </div>
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className="Card-right">
                {clientsArray.length !== 0 ? (
                    <ClientDetails
                        client={selected === clientsArray.length ? clientsArray[selected - 1] : clientsArray[selected]}
                        newRecharge={newRecharge}
                        setRechargeDeleted={setRechargeDeleted}
                        setShowUpdateClientForm={setShowUpdateClientForm}
                        setShowNotification={props.setShowNotification}
                        setClientDeleted={setClientDeleted}
                        clientDeleted={clientDeleted}
                        ping={ping}
                        setPing={setPing}
                        company={props.company} />
                ) :
                    <div className="NoDetails">
                        <NoDetails size={45} />
                        <span>No client selected, select a client to see more details, or add new client if there isn't</span>
                    </div>
                }
                {["Iam", "Orange", "Inwi"].includes(props.company) && clientsArray.length !== 0 && (
                    <div className="New" onClick={() => { setShowAddRechargeForm(true); setShowAddClientForm(false) }}>
                        <AddIcon color={"white"} size={25} />
                    </div>
                )}
            </div>
            {showAddClientForm && (
                <ClientForm
                    setShowAddClientForm={setShowAddClientForm}
                    setShowUpdateClientForm={setShowUpdateClientForm}
                    client={{ "fullName": "", "cin": "" }}
                    setNewClient={setNewClient}
                    setShowNotification={props.setShowNotification}
                    newClient={newClient}
                    operation={"Add"} />
            )}

            {showUpdateClientForm && (
                <ClientForm
                    setShowUpdateClientForm={setShowUpdateClientForm}
                    setShowAddClientForm={setShowAddClientForm}
                    client={clientsArray[selected]}
                    setClientUpdated={setClientUpdated}
                    setShowNotification={props.setShowNotification}
                    clientUpdated={clientUpdated}
                    operation={"Update"} />
            )}

            {showAddRechargeForm && (
                <AddRechargeForm
                    company={props.company}
                    setShowAddRechargeForm={setShowAddRechargeForm}
                    clientId={clientsArray[selected].clientId}
                    clientFullname={clientsArray[selected].fullName}
                    setShowNotification={props.setShowNotification}
                    setNewRecharge={setNewRecharge}
                    newRecharge={newRecharge} />
            )}
        </div>
    );
}

export default Recharge;