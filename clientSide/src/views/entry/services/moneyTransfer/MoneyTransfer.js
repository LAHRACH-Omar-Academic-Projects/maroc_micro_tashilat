import React, { useEffect } from 'react';
import './MoneyTransfer.css';
import { GoSearch as SearchIcon } from "react-icons/go";
import { RiAddLine as AddClient } from "react-icons/ri";
import { BiTransferAlt as Transfer } from "react-icons/bi";
import { FaUserCircle as Avatar } from "react-icons/fa";
import { MdEdit as Edit } from "react-icons/md";
import { MdMoreVert as More } from "react-icons/md";
import { AiOutlineStar as Star } from "react-icons/ai";
import { AiFillStar as Favorite } from "react-icons/ai";
import { MdDelete as Delete } from "react-icons/md";
import { MdClose as Close } from "react-icons/md";
import { CgDetailsMore as NoDetails } from "react-icons/cg";
import { FaListAlt as NoMoneyTransfers } from "react-icons/fa";
import { GrFormPrevious as Previous } from "react-icons/gr";
import { GrFormNext as Next } from "react-icons/gr";
import Loader from 'react-loaders'
import { BiMehBlank as NoClients } from "react-icons/bi";
import { useState } from 'react';
import CustomInput from '../../../../components/input/CustomInput';
import CustomButton from '../../../../components/button/CustomButton';
import userService from '../../../../services/user-service';
import { useSelector } from 'react-redux';
import clientService from '../../../../services/client-service';
import moneyTransferService from '../../../../services/moneyTransfer-service';

const ClientItem = (props) => {
    return (
        <li onClick={props.handleClick} style={{ backgroundColor: props.selectedItem === props.position ? "rgba(255, 255, 255, 0.8)" : "" }}>
            <Avatar color="rgba(40, 130, 150, 0.5)" size={45} />
            <div className="Info">
                <span className="Name">{props.fullName}</span>
                <span className="NumberOfMoneyTransfers">Number of MoneyTransfers : {props.numberOfMoneyTransfers}</span>
            </div>
        </li>
    );
}

const MoneyTransferItem = (props) => {
    const [favorite, setFavorite] = useState(props.favorite);
    const [received, setRecieved] = useState(props.done);

    const { user: currentUser } = useSelector((state) => state.auth);

    const deleteMoneyTransfer = () => {
        moneyTransferService.deleteTransaction(props.id)
            .then(() => {
                props.setMoneyTransferDeleted(!props.moneyTransferDeleted);
                let notificationList = [];
                notificationList = JSON.parse(localStorage.getItem("notifications"));

                const date = new Date();
                const time = date.getHours() + ":" + date.getMinutes();
                const notification = {
                    "id": notificationList.length + 1,
                    "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                    "client": props.clientFullname,
                    "description": "deleted a Money transfer of the client",
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
                props.setMoneyTransferDeleted(false);
            })
    }

    const addToFavorite = () => {
        moneyTransferService.updateTransaction(props.id,
            props.beneficiaryFullName,
            props.beneficiaryId,
            props.transmitterFullName,
            props.transmitterPhoneNumber,
            props.transmitterId,
            props.transactionCode,
            props.transmitterAgencyName,
            props.transmitterAgencyId,
            props.receiverAgencyName,
            props.receiverAgencyId,
            props.date,
            props.price,
            received,
            !favorite,
            props.clientId)

            .then(() => {
                setFavorite(!favorite);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const updateTransaction = () => {
        moneyTransferService.updateTransaction(props.id,
            props.beneficiaryFullName,
            props.beneficiaryId,
            props.transmitterFullName,
            props.transmitterPhoneNumber,
            props.transmitterId,
            props.transactionCode,
            props.transmitterAgencyName,
            props.transmitterAgencyId,
            props.receiverAgencyName,
            props.receiverAgencyId,
            props.date,
            props.price,
            !received,
            favorite,
            props.clientId)

            .then(() => {
                setRecieved(!received);
                let notificationList = [];
                notificationList = JSON.parse(localStorage.getItem("notifications"));

                const moneyState = !received ? "received": "not received yet";
                const date = new Date();
                const time = date.getHours() + ":" + date.getMinutes();
                const notification = {
                    "id": notificationList.length + 1,
                    "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                    "client": props.clientFullname,
                    "description": "marked the money as " + moneyState + " of the client",
                    "date": date.toDateString() + " " + time
                }

                notificationList.push(notification);
                localStorage.setItem("notifications", JSON.stringify(notificationList));
                props.setShowNotification(true);
                setTimeout(() => {
                    props.setShowNotification(false);
                }, 5000);
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
                    <span className="TransactionCode">Transaction code :  {props.transactionCode}</span>
                    <span className="Date">{props.date}</span>
                </div>
                <div>
                    <span className="Amount">Amount : {props.price} DHS</span>
                    <span>Status : {received ? "Received" : "Sent"}</span>
                </div>
                <div>
                    <span>Beneficiary : {props.beneficiaryFullName}</span>
                    <span className="Amount">Transmitter phone : {props.transmitterPhoneNumber}</span>
                </div>
            </div>

            <div className="Options">
                <div className="Received">
                    <input type="checkbox" checked={received && true} onClick={() => updateTransaction()} />
                </div>
                <div className="Delete" onClick={() => deleteMoneyTransfer()}>
                    <Delete size={20} color="#f44336" />
                </div>
            </div>
        </li>
    );
}

const ClientDetails = (props) => {
    const [selected, setSelected] = useState(null);
    const [moneyTransferList, setMoneyTransferList] = useState([]);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [moneyTransferDeleted, setMoneyTransferDeleted] = useState(false);
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
            moneyTransferService.getAllTransactions(props.client.clientId)
                .then((res) => {
                    const moneyTransferList = [];
                    res.data.forEach((moneyTransfer) => {
                        moneyTransferList.push(moneyTransfer);
                    })
                    moneyTransferList.sort((a, b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0));
                    setMoneyTransferList(moneyTransferList);
                    props.setMoneyTransferDeleted(moneyTransferDeleted);
                })
        }
        else {
            moneyTransferService.getTransactionsByKeyword(keyword)
                .then((res) => {
                    const moneyTransferList = [];
                    res.data.forEach((moneyTransfer) => {
                        if (moneyTransfer.client.clientId === props.client.clientId) {
                            moneyTransferList.push(moneyTransfer);
                        }
                    })
                    setMoneyTransferList(moneyTransferList);
                    props.setMoneyTransferDeleted(moneyTransferDeleted);
                })
        }
    }, [props.newMoneyTransfer, props.client.clientId, moneyTransferDeleted, keyword])

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
                <div className="MoneyTransferList">
                    <ul>
                        {moneyTransferList.length !== 0 ? moneyTransferList.map((moneyTransfer, pos) => {
                            return (
                                <MoneyTransferItem
                                    key={moneyTransfer.id}
                                    id={moneyTransfer.id}
                                    beneficiaryFullName={moneyTransfer.beneficiaryFullName}
                                    beneficiaryId={moneyTransfer.beneficiaryId}
                                    transmitterPhoneNumber={moneyTransfer.transmitterPhoneNumber}
                                    transactionCode={moneyTransfer.transactionCode}
                                    transmitterAgencyName={moneyTransfer.transmitterAgencyName}
                                    transmitterAgencyId={moneyTransfer.transmitterAgencyId}
                                    receiverAgencyName={moneyTransfer.receiverAgencyName}
                                    receiverAgencyId={moneyTransfer.receiverAgencyId}
                                    date={moneyTransfer.date}
                                    price={moneyTransfer.price}
                                    favorite={moneyTransfer.favorite}
                                    clientFullname={props.client.fullName}
                                    setShowNotification={props.setShowNotification}
                                    clientId={props.client.clientId}
                                    done={moneyTransfer.done}
                                    setMoneyTransferDeleted={setMoneyTransferDeleted}
                                    moneyTransferDeleted={moneyTransferDeleted}
                                    position={pos}
                                    handleClick={() => setSelected(pos)}
                                    selectedItem={selected}
                                />
                            );
                        }) :
                            (
                                <div className="NoMoneyTransfers">
                                    <NoMoneyTransfers size={45} />
                                    <span>The list of transactions is empty, try to add one by clicking on "+" below</span>
                                </div>
                            )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

const AddMoneyTransferForm = (props) => {
    const [beneficiaryFirstName, setBeneficiaryFirstName] = useState("");
    const [beneficiaryLastName, setBeneficiaryLastName] = useState("");
    const [myPhoneNumber, setMyPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");

    const [next, setNext] = useState(false);

    const [transactionCode, setTransactionCode] = useState("");

    const generateTransactionCode = () => {
        if (beneficiaryFirstName === "") {
            setBeneficiaryFirstNameValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (beneficiaryLastName === "") {
            setBeneficiaryLastNameValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (myPhoneNumber === "") {
            setMyPhoneNumberValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (amount === "") {
            setAmountValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (beneficiaryFirstNameValidity !== null &&
            beneficiaryLastNameValidity !== null &&
            myPhoneNumberValidity !== null &&
            amountValidity !== null) {
            if (beneficiaryFirstNameValidity.isValid &&
                beneficiaryLastNameValidity.isValid &&
                myPhoneNumberValidity.isValid &&
                amountValidity.isValid) {
                const transactionCode = Math.floor(Math.random() * 10000) + 1000;
                setTransactionCode(transactionCode);
                setNext(true);
            }
        }

    }

    const [beneficiaryFirstNameValidity, setBeneficiaryFirstNameValidity] = useState(null);
    const [beneficiaryLastNameValidity, setBeneficiaryLastNameValidity] = useState(null);
    const [myPhoneNumberValidity, setMyPhoneNumberValidity] = useState(null);
    const [amountValidity, setAmountValidity] = useState(null);

    const { user: currentUser } = useSelector((state) => state.auth)

    const onChangeBeneficiaryFirstName = (e) => {
        const beneficiaryFirstName = e.target.value;
        if (beneficiaryFirstName === "") {
            setBeneficiaryFirstNameValidity({ "isValid": false, "message": "This field is required!" })
        }
        else {
            setBeneficiaryFirstNameValidity({ "isValid": true, "message": "" })
            setBeneficiaryFirstName(beneficiaryFirstName);
        }
    }

    const onChangeBeneficiaryLastName = (e) => {
        const beneficiaryLastName = e.target.value;
        if (beneficiaryLastName === "") {
            setBeneficiaryLastNameValidity({ "isValid": false, "message": "This field is required!" })
        }
        else {
            setBeneficiaryLastNameValidity({ "isValid": true, "message": "" })
            setBeneficiaryLastName(beneficiaryLastName);
        }
    }

    const onChangeMyPhoneNumber = (e) => {
        const myPhoneNumber = e.target.value;
        if (myPhoneNumber === "") {
            setMyPhoneNumberValidity({ "isValid": false, "message": "This field is required!" })
        }
        else if (myPhoneNumber.length !== 10) {
            setMyPhoneNumberValidity({ "isValid": false, "message": "Phone number must be 10 characters" })
        }
        else {
            setMyPhoneNumberValidity({ "isValid": true, "message": "" })
            setMyPhoneNumber(myPhoneNumber);
        }
    }

    const onChangeAmount = (e) => {
        const amount = e.target.value;
        if (amount === "") {
            setAmountValidity({ "isValid": false, "message": "This field is required!" })
        }
        else if (amount > 3000) {
            setAmountValidity({ "isValid": false, "message": "You cannot exceed 3000 Dhs per shipment.!" })
        }
        else {
            setAmountValidity({ "isValid": true, "message": "" })
            setAmount(amount);
        }
    }


    const handleSave = (e) => {
        e.preventDefault();

        let date = new Date().toDateString();
        let beneficiaryFullName = beneficiaryLastName + " " + beneficiaryFirstName;

        moneyTransferService.saveTransaction(beneficiaryFullName, null, props.client.fullName, myPhoneNumber, props.client.cin, transactionCode, currentUser.agencyName, currentUser.agencyId, null, null, date, amount, false, props.client.clientId)
            .then(() => {
                props.setNewMoneyTransfer(!props.newMoneyTransfer);
                let notificationList = [];
                notificationList = JSON.parse(localStorage.getItem("notifications"));

                const date = new Date();
                const time = date.getHours() + ":" + date.getMinutes();
                const notification = {
                    "id": notificationList.length + 1,
                    "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                    "client": props.client.fullName,
                    "description": "added a new Money transfer for the client",
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
    };

    return (
        <div className="AddForm">
            <div className="Header">
                <span>SEND YOUR MONEY ONLINE</span>
                <div className="Close" onClick={() => props.setShowAddMoneyTransferForm(false)}>
                    <Close size={25} color={"tomato"} />
                </div>
            </div>
            <div className="Body">
                <form className="Form" onSubmit={handleSave}>
                    {!next ? (
                        <div className="Part1">
                            <div className="BeneficiaryFullName">
                                <CustomInput
                                    inputStyle={"username"}
                                    type={"text"}
                                    placeholder={"Beneficiary first name"}
                                    value={beneficiaryFirstName}
                                    onChange={onChangeBeneficiaryFirstName}
                                    validity={beneficiaryFirstNameValidity} />

                                <CustomInput
                                    inputStyle={"username"}
                                    type={"text"}
                                    placeholder={"Beneficiary last name"}
                                    value={beneficiaryLastName}
                                    onChange={onChangeBeneficiaryLastName}
                                    validity={beneficiaryLastNameValidity} />
                            </div>

                            <CustomInput
                                inputStyle={"phone"}
                                type={"text"}
                                placeholder={"Your Phone number"}
                                value={myPhoneNumber}
                                onChange={onChangeMyPhoneNumber}
                                validity={myPhoneNumberValidity} />

                            <CustomInput
                                inputStyle={"money"}
                                type={"text"}
                                placeholder={"Amount (Ex : 2200)"}
                                value={amount}
                                onChange={onChangeAmount}
                                validity={amountValidity} />
                            <div className="Next" onClick={() => generateTransactionCode()}>
                                <span>Next</span>
                                <Next />
                            </div>
                        </div>
                    )
                        : (
                            <div className="Part2">
                                <div className="TransactionCode">
                                    <span>Transaction code : {transactionCode}</span>
                                </div>
                                <CustomButton text={"Valider"} />
                                <div className="Previous" onClick={() => setNext(false)}>
                                    <Previous />
                                    <span>Previous</span>
                                </div>
                            </div>
                        )}
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
                <span>{props.operation} Client</span>
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

const MoneyTransfer = (props) => {
    const [initilaClients, setInitialClients] = useState([]);
    const [selected, setSelected] = useState(0);
    const [showAddClientForm, setShowAddClientForm] = useState(false);
    const [showUpdateClientForm, setShowUpdateClientForm] = useState(false);
    const [showAddMoneyTransferForm, setShowAddMoneyTransferForm] = useState(false);
    const [newClient, setNewClient] = useState(false);
    const [clientUpdated, setClientUpdated] = useState(false);
    const [clientDeleted, setClientDeleted] = useState(false);
    const [newMoneyTransfer, setNewMoneyTransfer] = useState(false);
    const [moneyTransferDeleted, setMoneyTransferDeleted] = useState(false);
    const [clientsArray, setClientsArray] = useState([]);
    const [keyword, setKeyword] = useState("");

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
        if (keyword === "") {
            userService.getUser(currentUser.id)
                .then((res) => {
                    const userClientList = res.data.userClientList;
                    const clientList = userClientList.map((item) => {
                        let client = item.client;
                        delete item.userClientKey;
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
                    }, 100);
                })
        }
        else {
            clientService.getClientsByKeyword(keyword)
                .then((res) => {
                    const clientList = res.data.map((client) => {
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
                            if (containsObject(client, initilaClients)) {
                                clients.push(client);
                            }
                        })
                        setClientsArray(clients);
                    }, 100);
                })
        }
    }, [newClient, clientUpdated, clientDeleted, newMoneyTransfer, moneyTransferDeleted, keyword, currentUser.id]);

    return (
        <div className="MoneyTransfer-Card">
            <div className="Card-left">
                <div className="Header">
                    <div className="Top">
                        <div className="Search">
                            <SearchIcon size={25} />
                            <input type="text" placeholder="Search" onChange={(text) => setKeyword(text.target.value)} />
                        </div>
                        <div className="Add" onClick={() => { setShowAddClientForm(true); setShowAddMoneyTransferForm(false) }}>
                            {clientsArray.length === 0 && !showAddClientForm && (
                                <Loader className="HelpLoader" type="ball-scale-ripple-multiple" active color={"rgba(19, 96, 168, 0.096)"} />
                            )}
                            <AddClient className="AddIcon" color="rgb(31, 77, 175)" size={25} />
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
                                    numberOfMoneyTransfers={client.numberOfMoneyTransfers}
                                    cin={client.cin}
                                    handleClick={() => setSelected(pos)}
                                    selectedItem={selected}
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
                        newMoneyTransfer={newMoneyTransfer}
                        setMoneyTransferDeleted={setMoneyTransferDeleted}
                        setShowUpdateClientForm={setShowUpdateClientForm}
                        setShowNotification={props.setShowNotification}
                        setClientDeleted={setClientDeleted}
                        clientDeleted={clientDeleted} />
                ) :
                    <div className="NoDetails">
                        <NoDetails size={45} />
                        <span>No client selected, select a client to see more details, or add new client if there isn't</span>
                    </div>
                }
                {clientsArray.length !== 0 && (
                    <div className="New" onClick={() => { setShowAddMoneyTransferForm(true); setShowAddClientForm(false) }}>
                        <Transfer color={"white"} size={25} />
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

            {showAddMoneyTransferForm && (
                <AddMoneyTransferForm
                    setShowAddMoneyTransferForm={setShowAddMoneyTransferForm}
                    client={clientsArray[selected]}
                    setShowNotification={props.setShowNotification}
                    setNewMoneyTransfer={setNewMoneyTransfer}
                    newMoneyTransfer={newMoneyTransfer} />
            )}
        </div>
    );
}

export default MoneyTransfer;