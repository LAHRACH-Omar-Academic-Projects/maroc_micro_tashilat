import React, { useEffect } from 'react';
import './Administration.css';
import { GoSearch as SearchIcon } from "react-icons/go";
import { FaUserCircle as Avatar } from "react-icons/fa";
import { MdEdit as Edit } from "react-icons/md";
import { MdMoreVert as More } from "react-icons/md";
import { isEmail } from 'validator';
import { FaListAlt as NoClients } from "react-icons/fa";
import { MdDelete as Delete } from "react-icons/md";
import { SiDiscover as Disc } from "react-icons/si";
import { BiUserPlus as AddIcon } from "react-icons/bi";
import { MdClose as Close } from "react-icons/md";
import { CgDetailsMore as NoDetails } from "react-icons/cg";
import Loader from 'react-loaders'
import { BiMehBlank as NoUsers } from "react-icons/bi";
import { useState } from 'react';
import CustomInput from '../../../components/input/CustomInput';
import userService from '../../../services/user-service';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../../actions/auth';
import CustomButton from '../../../components/button/CustomButton';
import clientService from '../../../services/client-service';
import rechargeService from '../../../services/recharge-service';
import billPaymentService from '../../../services/billPayment-service';
import moneyTransferService from '../../../services/moneyTransfer-service';

const ClientItem = (props) => {
    const [showUpdateClientForm, setShowUpdateClientForm] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);

    const deleteClient = () => {
        clientService.deleteClient(props.clientId)
            .then(() => {
                props.setClientDeleted(!props.clientDeleted);
                let notificationList = [];
                notificationList = JSON.parse(localStorage.getItem("notifications"));

                const date = new Date();
                const time = date.getHours() + ":" + date.getMinutes();
                const notification = {
                    "id": notificationList.length + 1,
                    "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                    "client": props.fullName,
                    "description": "deleted for the agent user (" + props.user.username + ") the client",
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
                props.setClientDeleted(false);
            })
    }

    return (
        <li onClick={props.handleClick} style={{ backgroundColor: props.selectedItem === props.position ? "rgba(255, 255, 255, 0.8)" : "" }}>
            <div className="Info">
                <div>
                    <span className="FullName">Full name :  {props.fullName}</span>
                    <span className="CIN">CIN : {props.cin}</span>
                </div>
                <div>
                    <span className="NumberOfRecharges">Number Of Recharges : {props.numberOfRecharges}</span>
                    <span className="NumberOfMoneyTransfers">Number Of MoneyTransfers : {props.numberOfMoneyTransfers}</span>
                    <span className="NumberOfBillPayments">Number Of BillPayments : {props.numberOfBillPayments}</span>
                </div>
            </div>

            <div className="Options">
                <div className="Edit" onClick={() => setShowUpdateClientForm(true)}>
                    <Edit size={20} color="#4336f4" />
                </div>
                <div className="Delete" onClick={() => deleteClient()}>
                    <Delete size={20} color="#f44336" />
                </div>
            </div>

            {showUpdateClientForm && (
                <ClientForm
                    user={props.user}
                    client={{ "clientId": props.clientId, "fullName": props.fullName, "cin": props.cin }}
                    setClientUpdated={props.setClientUpdated}
                    setShowUpdateClientForm={setShowUpdateClientForm}
                    setShowAddClientForm={props.setShowAddClientForm}
                    clientUpdated={props.clientUpdated}
                    operation={"Update"} />
            )}
        </li>
    );
}

const UserItem = (props) => {
    return (
        <li onClick={props.handleClick} style={{ backgroundColor: props.selectedItem === props.position ? "rgba(255, 255, 255, 0.8)" : "" }}>
            <Avatar color="rgba(40, 130, 150, 0.5)" size={45} />
            <div className="Info">
                <span className="Name">{props.username}</span>
                <span className="Agency">Agency: {props.agencyName}(Code : {props.agencyId})</span>
            </div>
        </li>
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
                            "user": { "userId": props.user.userId, "username": props.user.username, "email": props.user.email, "password": props.user.password, "agencyName": props.user.agencyName, "agencyId": props.user.agencyId, "role": props.user.role }
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
                                    "description": "added to the agent user (" + props.user.username + ") a new client",
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
                        const client = { "clientId": props.client.clientId, "fullName": fullName, "cin": cin };
                        const user = { "userId": props.user.userId, "username": props.user.username, "email": props.user.email, "password": props.user.password, "agencyName": props.user.agencyName, "agencyId": props.user.agencyId, "role": props.user.role };
                        userService.getUser(props.user.userId)
                            .then((res) => {
                                let userClientList = res.data.userClientList
                                userClientList.forEach((userClient) => {
                                    if (userClient.client.clientId === client.clientId) {
                                        let userClientKey = userClient.userClientKey;
                                        clientService.saveClient({
                                            "userClientKey": userClientKey,
                                            "client": client,
                                            "user": user
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
                                                    "client": fullName,
                                                    "description": "edited for the agent user (" + props.user.username + ") the client",
                                                    "date": date.toDateString() + " " + time
                                                }

                                                notificationList.push(notification);
                                                localStorage.setItem("notifications", JSON.stringify(notificationList));
                                                props.setShowNotification(true);
                                                setTimeout(() => {
                                                    props.setShowNotification(false);
                                                }, 5000);
                                            })
                                    }
                                })
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
                <span>{props.operation} Client</span>
                <div className="Close" onClick={() => { props.setShowAddClientForm(false); props.setShowUpdateClientForm && props.setShowUpdateClientForm(false) }}>
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

const UserDetails = (props) => {
    const [initialClients, setInitialClients] = useState([]);
    const [selected, setSelected] = useState(false);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [clientDeleted, setClientDeleted] = useState(false);
    const [clientUpdated, setClientUpdated] = useState(false);
    const [clientsArray, setClientsArray] = useState([]);
    const [keyword, setKeyword] = useState("");

    const { user: currentUser } = useSelector((state) => state.auth)

    const deleteUser = () => {
        userService.deleteUser(props.user.userId)
            .then(() => {
                props.setUserDeleted(!props.userDeleted);
                let notificationList = [];
                notificationList = JSON.parse(localStorage.getItem("notifications"));

                const date = new Date();
                const time = date.getHours() + ":" + date.getMinutes();
                const notification = {
                    "id": notificationList.length + 1,
                    "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                    "client": props.user.username,
                    "description": "deleted the user",
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
                props.setUserDeleted(false);
            })
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
        if (keyword === "") {
            const userClientList = props.user.userClientList;
            const clientList = userClientList.map((item) => {
                let client = item.client;
                delete item.userClientKey;
                rechargeService.getAllRecharges(client.clientId)
                    .then((res) => {
                        const rechargeList = [];
                        res.data.forEach((recharge) => {
                            rechargeList.push(recharge);
                        })
                        client.numberOfRecharges = rechargeList.length;
                    })
                billPaymentService.getAllBillPayments(client.clientId)
                    .then((res) => {
                        const billPaymentList = [];
                        res.data.forEach((billPayment) => {
                            billPaymentList.push(billPayment);
                        })
                        client.numberOfBillPayments = billPaymentList.length;
                    })
                moneyTransferService.getAllTransactions(client.clientId)
                    .then((res) => {
                        const moneyTransferList = [];
                        res.data.forEach((moneyTransfer) => {
                            moneyTransferList.push(moneyTransfer);
                        })
                        client.numberOfMoneyTransfers = moneyTransferList.length;
                    })
                return client;
            })
            clientList.sort((a, b) => (a.clientId > b.clientId) ? -1 : ((b.clientId > a.clientId) ? 1 : 0));
            setTimeout(() => {
                setClientsArray(clientList);
                setInitialClients(clientList);
                props.setClientDeleted(clientDeleted);
                props.setClientUpdated(clientUpdated);
            }, 100);
        }
        else {
            clientService.getClientsByKeyword(keyword)
                .then((res) => {
                    const clientList = res.data.map((client) => {
                        rechargeService.getAllRecharges(client.clientId)
                            .then((res) => {
                                const rechargeList = [];
                                res.data.forEach((recharge) => {
                                    rechargeList.push(recharge);
                                })
                                client.numberOfRecharges = rechargeList.length;
                            })
                        billPaymentService.getAllBillPayments(client.clientId)
                            .then((res) => {
                                const billPaymentList = [];
                                res.data.forEach((billPayment) => {
                                    billPaymentList.push(billPayment);
                                })
                                client.numberOfBillPayments = billPaymentList.length;
                            })
                        moneyTransferService.getAllTransactions(client.clientId)
                            .then((res) => {
                                const moneyTransferList = [];
                                res.data.forEach((moneyTransfer) => {
                                    moneyTransferList.push(moneyTransfer);
                                })
                                client.numberOfMoneyTransfers = moneyTransferList.length;
                            })
                        return client;
                    })
                    setTimeout(() => {
                        const clients = [];
                        clientList.forEach((client) => {
                            if (containsObject(client, initialClients)) {
                                clients.push(client);
                            }
                        })
                        setClientsArray(clients);
                        props.setClientDeleted(clientDeleted);
                        props.setClientUpdated(clientUpdated);
                    }, 100);
                })
        }
    }, [props.newClient, props.user, clientDeleted, clientUpdated, keyword]);

    return (
        <div className="Details">
            <div className="Header">
                <div className="User">
                    <Avatar color="rgba(40, 130, 150, 0.5)" size={60} />
                    <div className="Info">
                        <span className="Name">{props.user.username}</span>
                        <span className="Email">{props.user.email}</span>
                        <span className="Role">{props.user.role}</span>
                    </div>
                </div>
                <div className="Options">
                    <div className="Edit" onClick={() => props.setShowUpdateUserForm(true)}>
                        <Edit size={24} color="rgba(0, 0, 0, 0.54)" />
                    </div>
                    <div className="More" onClick={() => setShowMoreOptions(!showMoreOptions)}>
                        <More size={25} color="rgba(0, 0, 0, 0.54)" />
                    </div>
                    {showMoreOptions && (
                        <div className="MoreOptionsPopup">
                            <ul>
                                <li className="popup-item" onClick={() => deleteUser()}>
                                    <Delete />
                                    <span className="item-text">Delete user</span>
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
                <div className="ClientList">
                    <ul>
                        {clientsArray.length !== 0 ? clientsArray.map((client, pos) => {
                            return (
                                <ClientItem
                                    key={client.clientId}
                                    clientId={client.clientId}
                                    fullName={client.fullName}
                                    cin={client.cin}
                                    user={props.user}
                                    setShowNotification={props.setShowNotification}
                                    numberOfBillPayments={client.numberOfBillPayments}
                                    numberOfMoneyTransfers={client.numberOfMoneyTransfers}
                                    numberOfRecharges={client.numberOfRecharges}
                                    setClientDeleted={setClientDeleted}
                                    setShowAddClientForm={props.setShowAddClientForm}
                                    clientDeleted={clientDeleted}
                                    clientUpdated={clientUpdated}
                                    setClientUpdated={setClientUpdated}
                                    position={pos}
                                    handleClick={() => setSelected(pos)}
                                    selectedItem={selected}
                                />
                            );
                        }) :
                            (
                                <div className="NoClients">
                                    <NoClients size={45} />
                                    <span>The list of clients is empty, try to add one by clicking on "+" below</span>
                                </div>
                            )}
                    </ul>
                </div>
            </div>
        </div >
    );
}

const UserForm = (props) => {
    const [username, setUsername] = useState(props.user.username);
    const [email, setEmail] = useState(props.user.email);
    const [password, setPassword] = useState(props.user.password);
    const [confirmPassword, setConfirmPassword] = useState(props.user.password);
    const [agencyName, setAgencyName] = useState(props.user.agencyName);
    const [agencyId, setAgencyId] = useState(props.user.agencyId);
    const [role, setRole] = useState(props.user.role);

    const [usernameValidity, setUsernameValidity] = useState(props.user.username !== "" ? { "isValid": true, "message": "" } : null);
    const [emailValidity, setEmailValidity] = useState(props.user.email !== "" ? { "isValid": true, "message": "" } : null);
    const [passwordValidity, setPasswordValidity] = useState(props.user.password !== "" ? { "isValid": true, "message": "" } : null);
    const [confirmPasswordValidity, setConfirmPasswordValidity] = useState(props.user.password !== "" ? { "isValid": true, "message": "" } : null);
    const [agencyNameValidity, setAgencyNameValidity] = useState(props.user.agencyName !== "" ? { "isValid": true, "message": "" } : null);
    const [agencyIdValidity, setAgencyIdValidity] = useState(props.user.agencyId !== "" ? { "isValid": true, "message": "" } : null);

    const { message } = useSelector(state => state.message);

    const dispatch = useDispatch();

    const onChangeUsername = (e) => {
        const username = e.target.value;
        if (username === "") {
            setUsernameValidity({ "isValid": false, "message": "This field is required!" })
        }
        else if (username.length < 3 || username.length > 20) {
            setUsernameValidity({ "isValid": false, "message": "The username must be between 3 and 20 characters." })
        }
        else {
            setUsernameValidity({ "isValid": true, "message": "" })
            setUsername(username);
        }
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        if (email === "") {
            setEmailValidity({ "isValid": false, "message": "This field is required!" })
        }
        else if (!isEmail(email)) {
            setEmailValidity({ "isValid": false, "message": "This is not a valid email." })
        }
        else {
            setEmailValidity({ "isValid": true, "message": "" })
            setEmail(email);
        }
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        if (password === "") {
            setPasswordValidity({ "isValid": false, "message": "This field is required!" })
        }
        else if (password.length < 6 || password.length > 40) {
            setPasswordValidity({ "isValid": false, "message": "The password must be between 6 and 40 characters." })
        }
        else {
            setPasswordValidity({ "isValid": true, "message": "" })
            setPassword(password);
        }
    }

    const onChangeConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        if (confirmPassword === "") {
            setConfirmPasswordValidity({ "isValid": false, "message": "This field is required!" })
        }
        else if (confirmPassword !== password) {
            setConfirmPasswordValidity({ "isValid": false, "message": "The password must be the same as the previous password." })
        }
        else {
            setConfirmPasswordValidity({ "isValid": true, "message": "" })
            setConfirmPassword(confirmPassword);
        }
    }

    const onChangeAgencyName = (e) => {
        const agencyName = e.target.value;
        if (agencyName === "") {
            setAgencyNameValidity({ "isValid": false, "message": "This field is required!" })
        }
        else if (agencyName.length < 6 || agencyName.length > 20) {
            setAgencyNameValidity({ "isValid": false, "message": "The agencyName must be between 6 and 20 characters." })
        }
        else {
            setAgencyNameValidity({ "isValid": true, "message": "" })
            setAgencyName(agencyName);
        }
    };

    const onChangeAgencyId = (e) => {
        const agencyId = e.target.value;
        if (agencyId === "") {
            setAgencyIdValidity({ "isValid": false, "message": "This field is required!" })
        }
        else if (agencyId.length < 1 || agencyId.length > 20) {
            setAgencyIdValidity({ "isValid": false, "message": "The agencyId must be between 1 and 20 characters." })
        }
        else {
            setAgencyIdValidity({ "isValid": true, "message": "" })
            setAgencyId(agencyId);
        }
    };

    const { user: currentUser } = useSelector((state) => state.auth)

    const handleRegister = (e) => {
        e.preventDefault();
        if (username === "") {
            setUsernameValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (email === "") {
            setEmailValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (password === "") {
            setPasswordValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (confirmPassword === "") {
            setConfirmPasswordValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (agencyName === "") {
            setAgencyNameValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (agencyId === "") {
            setAgencyIdValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (usernameValidity !== null &&
            emailValidity !== null &&
            passwordValidity !== null &&
            confirmPasswordValidity !== null &&
            agencyNameValidity !== null &&
            agencyIdValidity !== null) {
            if (usernameValidity.isValid &&
                emailValidity.isValid &&
                passwordValidity.isValid &&
                confirmPasswordValidity.isValid &&
                agencyNameValidity.isValid &&
                agencyIdValidity.isValid) {

                switch (props.operation) {
                    case "Add":
                        dispatch(register(username, email, confirmPassword, agencyName, agencyId, role))
                            .then(() => {
                                props.setNewUser(!props.newUser);
                                let notificationList = [];
                                notificationList = JSON.parse(localStorage.getItem("notifications"));

                                const date = new Date();
                                const time = date.getHours() + ":" + date.getMinutes();
                                const notification = {
                                    "id": notificationList.length + 1,
                                    "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                                    "client": username,
                                    "description": "added a new user",
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
                        userService.updateUser(props.user.userId, username, email, confirmPassword, agencyName, agencyId, role)
                            .then(() => {
                                props.setUserUpdated(!props.userUpdated);
                                let notificationList = [];
                                notificationList = JSON.parse(localStorage.getItem("notifications"));

                                const date = new Date();
                                const time = date.getHours() + ":" + date.getMinutes();
                                const notification = {
                                    "id": notificationList.length + 1,
                                    "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                                    "client": username,
                                    "description": "edited the user",
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
        <div className="AddUserForm">
            <div className="Header">
                <span>{props.operation} User</span>
                <div className="Close" onClick={() => { props.setShowAddUserForm(false); props.setShowUpdateUserForm(false) }}>
                    <Close size={25} color={"tomato"} />
                </div>
            </div>
            <div className="Body">
                <form className="Form" onSubmit={handleRegister}>
                    <CustomInput value={username} inputStyle={"username"} type={"text"} placeholder={"Username"} onChange={onChangeUsername} validity={usernameValidity} />
                    <CustomInput value={email} inputStyle={"email"} type={"email"} placeholder={"Email"} onChange={onChangeEmail} validity={emailValidity} />
                    <CustomInput value={password} inputStyle={"password"} type={"password"} placeholder={"Password"} onChange={onChangePassword} validity={passwordValidity} readOnly={props.operation === "Update" && true} />
                    <CustomInput value={confirmPassword} inputStyle={"confirmPassword"} type={"password"} placeholder={"Confirm password"} onChange={onChangeConfirmPassword} validity={confirmPasswordValidity} readOnly={props.operation === "Update" && true} />
                    <CustomInput value={agencyName} inputStyle={"agencyName"} type={"text"} placeholder={"Agency name"} onChange={onChangeAgencyName} validity={agencyNameValidity} />
                    <CustomInput value={agencyId} inputStyle={"agencyId"} type={"number"} placeholder={"Agency id"} onChange={onChangeAgencyId} validity={agencyIdValidity} />
                    <select className="Role" value={role} onChange={(text) => setRole(text.target.value)}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    <CustomButton text={"Save"} />
                    {message && (
                        <div className="Danger">
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

const Administration = (props) => {
    const [selected, setSelected] = useState(0);
    const [showAddUserForm, setShowAddUserForm] = useState(false);
    const [showUpdateUserForm, setShowUpdateUserForm] = useState(false);
    const [newUser, setNewUser] = useState(false);
    const [userUpdated, setUserUpdated] = useState(false);
    const [userDeleted, setUserDeleted] = useState(false);
    const [usersArray, setUsersArray] = useState([]);
    const [showAddClientForm, setShowAddClientForm] = useState(false);
    const [newClient, setNewClient] = useState(false);
    const [clientDeleted, setClientDeleted] = useState(false);
    const [clientUpdated, setClientUpdated] = useState(false);
    const [keyword, setKeyword] = useState("");

    const { user: currentUser } = useSelector((state) => state.auth)

    if (selected !== 0 && selected >= usersArray.length) {
        setSelected(usersArray.length - 1);
    }

    useEffect(() => {
        if (keyword === "") {
            userService.getUsers(currentUser.id)
                .then((res) => {
                    res.data.sort((a, b) => (a.userId > b.userId) ? -1 : ((b.userId > a.userId) ? 1 : 0));
                    setUsersArray(res.data);
                })
        }
        else {
            userService.getUsersByKeyword(keyword)
                .then((res) => {
                    setUsersArray(res.data);
                })
        }
    }, [newUser, userUpdated, userDeleted, newClient, clientDeleted, clientUpdated, keyword, currentUser.id]);

    return (
        <div className="Administration-Card">
            <div className="Card-left">
                <div className="Header">
                    <div className="Top">
                        <div className="Search">
                            <SearchIcon size={25} />
                            <input type="text" placeholder="Search" onChange={(text) => setKeyword(text.target.value)} />
                        </div>
                        <div className="Add" onClick={() => setShowAddUserForm(true)}>
                            {usersArray.length === 0 && !showAddUserForm && (
                                <Loader className="HelpLoader" type="ball-scale-ripple-multiple" active color={"rgba(19, 96, 168, 0.096)"} />
                            )}
                            <AddIcon className="AddIcon" color="rgb(31, 77, 175)" size={25} />
                        </div>
                    </div>
                    <div className="Sum">
                        <span>{usersArray.length} Users</span>
                    </div>
                </div>
                <div className="Body">
                    <ul>
                        {usersArray.length !== 0 ? (usersArray.map((user, pos) => {
                            return (
                                <UserItem
                                    key={user.userId}
                                    position={pos}
                                    online={user.online}
                                    username={user.username}
                                    agencyName={user.agencyName}
                                    agencyId={user.agencyId}
                                    handleClick={() => setSelected(pos)}
                                    selectedItem={selected === usersArray.length ? selected - 1 : selected}
                                />
                            );
                        }))
                            : (
                                <div className="NoUsers">
                                    <NoUsers size={45} />
                                    <span>The list of users is empty, to add a new User click on "+" symbol on the right-bottom</span>
                                </div>
                            )
                        }
                    </ul>
                </div>
            </div>
            <div className="Card-right">
                {usersArray.length !== 0 ? (
                    <UserDetails
                        user={selected === usersArray.length ? usersArray[selected - 1] : usersArray[selected]}
                        setShowUpdateUserForm={setShowUpdateUserForm}
                        setShowAddClientForm={setShowAddClientForm}
                        setUserDeleted={setUserDeleted}
                        userDeleted={userDeleted}
                        setShowNotification={props.setShowNotification}
                        newClient={newClient}
                        setClientDeleted={setClientDeleted}
                        setClientUpdated={setClientUpdated} />
                ) :
                    <div className="NoDetails">
                        <NoDetails size={45} />
                        <span>No user selected, select a user to see more details, or add new user if there isn't</span>
                    </div>
                }
                {usersArray.length !== 0 && (
                    <div className="New" onClick={() => { setShowAddClientForm(true); setShowAddUserForm(false) }}>
                        <AddIcon color={"white"} size={25} />
                    </div>
                )}
            </div>
            {showAddUserForm && (
                <UserForm
                    setShowAddUserForm={setShowAddUserForm}
                    setShowUpdateUserForm={setShowUpdateUserForm}
                    user={{ "username": "", "email": "", "password": "", "confirmedPassword": "", "agencyName": "", "agencyId": "", "role": "admin" }}
                    setNewUser={setNewUser}
                    setShowNotification={props.setShowNotification}
                    newUser={newUser}
                    operation={"Add"} />
            )}

            {showUpdateUserForm && (
                <UserForm
                    setShowAddUserForm={setShowAddUserForm}
                    setShowUpdateUserForm={setShowUpdateUserForm}
                    user={usersArray[selected]}
                    setUserUpdated={setUserUpdated}
                    setShowNotification={props.setShowNotification}
                    userUpdated={userUpdated}
                    operation={"Update"} />
            )}

            {showAddClientForm && (
                <ClientForm
                    setShowAddClientForm={setShowAddClientForm}
                    user={usersArray[selected]}
                    client={{ "fullName": "", "cin": "" }}
                    setShowNotification={props.setShowNotification}
                    setNewClient={setNewClient}
                    newClient={newClient}
                    operation={"Add"} />
            )}
        </div>
    );
}

export default Administration;