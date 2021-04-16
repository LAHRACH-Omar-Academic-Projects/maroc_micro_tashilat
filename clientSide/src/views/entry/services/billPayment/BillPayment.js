import React, { useEffect } from 'react';
import './BillPayment.css';
import { GoSearch as SearchIcon } from "react-icons/go";
import { RiAddLine as AddClient } from "react-icons/ri";
import { GiPayMoney as Pay } from "react-icons/gi";
import { FaUserCircle as Avatar } from "react-icons/fa";
import { MdEdit as Edit } from "react-icons/md";
import { MdMoreVert as More } from "react-icons/md";
import { AiOutlineStar as Star } from "react-icons/ai";
import { AiFillStar as Favorite } from "react-icons/ai";
import { MdDelete as Delete } from "react-icons/md";
import { MdClose as Close } from "react-icons/md";
import { CgDetailsMore as NoDetails } from "react-icons/cg";
import { FaListAlt as NoBillPayments } from "react-icons/fa";
import { GrFormPrevious as Previous } from "react-icons/gr";
import { FcElectricity as Electricity } from "react-icons/fc";
import { IoIosWater as Water } from "react-icons/io";
import { GrFormNext as Next } from "react-icons/gr";
import Loader from 'react-loaders'
import { BiMehBlank as NoClients } from "react-icons/bi";
import { useState } from 'react';
import CustomInput from '../../../../components/input/CustomInput';
import CustomButton from '../../../../components/button/CustomButton';
import userService from '../../../../services/user-service';
import { useSelector } from 'react-redux';
import clientService from '../../../../services/client-service';
import billPaymentService from '../../../../services/billPayment-service';

const ClientItem = (props) => {
    return (
        <li onClick={props.handleClick} style={{ backgroundColor: props.selectedItem === props.position ? "rgba(255, 255, 255, 0.8)" : "" }}>
            <Avatar color="rgba(40, 130, 150, 0.5)" size={45} />
            <div className="Info">
                <span className="Name">{props.fullName}</span>
                <span className="NumberOfBillPayments">Number of BillPayments : {props.numberOfBillPayments}</span>
            </div>
        </li>
    );
}

const BillPaymentItem = (props) => {
    const [favorite, setFavorite] = useState(props.favorite);

    const { user: currentUser } = useSelector((state) => state.auth);

    const deleteBillPayment = () => {
        billPaymentService.deleteBillPayment(props.id)
            .then(() => {
                props.setBillPaymentDeleted(!props.billPaymentDeleted);
                let notificationList = [];
                notificationList = JSON.parse(localStorage.getItem("notifications"));

                const date = new Date();
                const time = date.getHours() + ":" + date.getMinutes();
                const notification = {
                    "id": notificationList.length + 1,
                    "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                    "client": props.clientFullname,
                    "description": "deleted a " + props.company + " Bill payment of the client",
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
                props.setBillPaymentDeleted(false);
            })
    }

    const addToFavorite = () => {
        billPaymentService.favorite(props.id, props.method, props.service, props.price, props.paymentCode, props.company, props.date, !favorite, props.clientId)
            .then(() => {
                setFavorite(!favorite);
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
                    <span className="PaymentCode">By {props.method}</span>
                    <span className="Date">{props.date}</span>
                </div>
                <div>
                    <span className="Price">Price : {props.price} DHS</span>
                    <div className="Service">
                        {props.service === "Electricity" ? (
                            <Electricity />
                        )
                            : (
                                <Water color={"rgb(69, 110, 221)"} />
                            )}
                        <span>{props.service}</span>
                    </div>
                </div>
                <div>
                    <span className="Code">Payment code : {props.paymentCode}</span>
                </div>
            </div>

            <div className="Options">
                <div className="Delete" onClick={() => deleteBillPayment()}>
                    <Delete size={20} color="#f44336" />
                </div>
            </div>
        </li>
    );
}

const ClientDetails = (props) => {
    const [selected, setSelected] = useState(null);
    const [billPaymentList, setBillPaymentList] = useState([]);
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [billPaymentDeleted, setBillPaymentDeleted] = useState(false);
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
            billPaymentService.getAllBillPayments(props.client.clientId)
                .then((res) => {
                    const billPaymentList = [];
                    res.data.forEach((billPayment) => {
                        if (billPayment.company === props.company) {
                            billPaymentList.push(billPayment);
                        }
                    })
                    billPaymentList.sort((a, b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0));
                    setBillPaymentList(billPaymentList);
                    props.setBillPaymentDeleted(billPaymentDeleted);
                })
        }
        else {
            billPaymentService.getBillPaymentsByKeyword(keyword)
                .then((res) => {
                    const billPaymentList = [];
                    res.data.forEach((billPayment) => {
                        if (billPayment.company === props.company && billPayment.client.clientId === props.client.clientId) {
                            billPaymentList.push(billPayment);
                        }
                    })
                    setBillPaymentList(billPaymentList);
                    props.setBillPaymentDeleted(billPaymentDeleted);
                })
        }
    }, [props.newBillPayment, props.client.clientId, props.company, billPaymentDeleted, keyword])

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
                <div className="BillPaymentList">
                    <ul>
                        {billPaymentList.length !== 0 ? billPaymentList.map((billPayment, pos) => {
                            return (
                                <BillPaymentItem
                                    key={billPayment.id}
                                    id={billPayment.id}
                                    setBillPaymentDeleted={setBillPaymentDeleted}
                                    billPaymentDeleted={billPaymentDeleted}
                                    setShowNotification={props.setShowNotification}
                                    position={pos}
                                    paymentCode={billPayment.paymentCode}
                                    favorite={billPayment.favorite}
                                    price={billPayment.price}
                                    method={billPayment.method}
                                    company={billPayment.company}
                                    clientId={props.client.clientId}
                                    clientFullname={props.client.fullName}
                                    service={billPayment.service}
                                    date={billPayment.date}
                                    handleClick={() => setSelected(pos)}
                                    selectedItem={selected}
                                />
                            );
                        }) :
                            (
                                <div className="NoBillPayments">
                                    <NoBillPayments size={45} />
                                    <span>The list of billPayments is empty, try to add one by clicking on "+" below</span>
                                </div>
                            )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

const AddBillPaymentForm = (props) => {
    const method1 = props.company === "Radeej" ? "Police" : "Invoice";
    const method2 = props.company === "Radeej" ? "Tour" : "Contract";
    const method3 = props.company === "Radeej" ? "" : "Reference";
    const [method, setMethod] = useState(method1);
    const [service, setService] = useState("Water");
    const [paymentCode, setPaymentCode] = useState("");
    const [paymentCodeValidity, setPaymentCodeValidity] = useState(null);

    const [next, setNext] = useState(false);
    const [price, setPrice] = useState(0);

    const { user: currentUser } = useSelector((state) => state.auth)

    const onChangePaymentCode = (e) => {
        const paymentCode = e.target.value;
        if (paymentCode === "") {
            setPaymentCodeValidity({ "isValid": false, "message": "This field is required!" })
        }
        else if (paymentCode.length !== 10) {
            setPaymentCodeValidity({ "isValid": false, "message": "The payment code  must have 10 caracter." })
        }
        else {
            setPaymentCodeValidity({ "isValid": true, "message": "" })
            setPaymentCode(paymentCode);
        }
    }


    const handleSave = (e) => {
        e.preventDefault();
        let date = new Date();
        if (price !== 0) {
            billPaymentService.saveBillPayment(method, service, price, paymentCode, currentUser.agencyName, currentUser.agencyId, props.company, date.toDateString(), props.clientId)
                .then(() => {
                    props.setNewBillPayment(!props.newBillPayment);
                    let notificationList = [];
                    notificationList = JSON.parse(localStorage.getItem("notifications"));

                    const date = new Date();
                    const time = date.getHours() + ":" + date.getMinutes();
                    const notification = {
                        "id": notificationList.length + 1,
                        "user": { "username": currentUser.username, "role": currentUser.role, "from": currentUser.agencyName },
                        "client": props.clientFullname,
                        "description": "added a new " + props.company + " Bill payment for the client",
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
    };

    const generatePrice = () => {
        if (paymentCode === "") {
            setPaymentCodeValidity({ "isValid": false, "message": "You forgot to fill in this field!" })
        }
        if (paymentCodeValidity !== null) {
            if (paymentCodeValidity.isValid) {
                const price = Math.floor(Math.random() * 8000) + 2000;
                setPrice(price);
                setNext(true);
            }
        }
    }

    const generateService = () => {
        if (method !== method2) {
            const services = ["Water", "Electricity"];
            const service = services[Math.floor(Math.random() * services.length)];
            setService(service);
        }
    }

    return (
        <div className="AddForm">
            <div className="Header">
                <span>Add New {props.company} BillPayment</span>
                <div className="Close" onClick={() => props.setShowAddBillPaymentForm(false)}>
                    <Close size={25} color={"tomato"} />
                </div>
            </div>
            <div className="Body">
                <form className="Form" onSubmit={handleSave}>
                    {!next ? (
                        <div className="Part1">
                            <div className="Method">
                                <div className="Method1">
                                    <label for={method1}>{method1}</label>
                                    <input type="radio" id={method1} name="method" onClick={() => setMethod(method1)} checked={method === method1 && true} />
                                </div>
                                <div className="Method2">
                                    <label for={method2}>{method2}</label>
                                    <input type="radio" id={method2} name="method" onClick={() => setMethod(method2)} checked={method === method2 && true} />
                                </div>
                                {method3 !== "" && (
                                    <div className="Method3">
                                        <label for={method3}>{method3}</label>
                                        <input type="radio" id={method3} name="method" onClick={() => setMethod(method3)} checked={method === method3 && true} />
                                    </div>
                                )}
                            </div>
                            {method === method2 && (
                                <select className="Service" onClick={(text) => setService(text.target.value)}>
                                    <option value="Water">Water</option>
                                    <option value="Electricity">Electricity</option>
                                </select>
                            )}
                            <CustomInput
                                inputStyle={"paymentCode"}
                                type={"number"}
                                placeholder={method === method3 ? method3 : method + " number"}
                                value={paymentCode}
                                onChange={onChangePaymentCode}
                                validity={paymentCodeValidity} />
                            <div className="Next" onClick={() => { generatePrice(); generateService() }}>
                                <span>Next</span>
                                <Next />
                            </div>
                        </div>
                    )
                        : (
                            <div className="Part2">
                                <div className="Price">
                                    <span>Total price : {price}</span>
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

const BillPayment = (props) => {
    const [initilaClients, setInitialClients] = useState([]);
    const [selected, setSelected] = useState(0);
    const [showAddClientForm, setShowAddClientForm] = useState(false);
    const [showUpdateClientForm, setShowUpdateClientForm] = useState(false);
    const [showAddBillPaymentForm, setShowAddBillPaymentForm] = useState(false);
    const [newClient, setNewClient] = useState(false);
    const [clientUpdated, setClientUpdated] = useState(false);
    const [clientDeleted, setClientDeleted] = useState(false);
    const [newBillPayment, setNewBillPayment] = useState(false);
    const [billPaymentDeleted, setBillPaymentDeleted] = useState(false);
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
                        billPaymentService.getAllBillPayments(client.clientId)
                            .then((res) => {
                                const billPaymentList = [];
                                res.data.forEach((billPayment) => {
                                    if (billPayment.company === props.company) {
                                        billPaymentList.push(billPayment);
                                    }
                                })
                                client.numberOfBillPayments = billPaymentList.length;
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
                        billPaymentService.getAllBillPayments(client.clientId)
                            .then((res) => {
                                const billPaymentList = [];
                                res.data.forEach((billPayment) => {
                                    if (billPayment.company === props.company) {
                                        billPaymentList.push(billPayment);
                                    }
                                })
                                client.numberOfBillPayments = billPaymentList.length;
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
    }, [newClient, clientUpdated, clientDeleted, props.company, newBillPayment, billPaymentDeleted, keyword, currentUser.id]);

    return (
        <div className="BillPayment-Card">
            <div className="Card-left">
                <div className="Header">
                    <div className="Top">
                        <div className="Search">
                            <SearchIcon size={25} />
                            <input type="text" placeholder="Search" onChange={(text) => setKeyword(text.target.value)} />
                        </div>
                        <div className="Add" onClick={() => { setShowAddClientForm(true); setShowAddBillPaymentForm(false) }}>
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
                                    numberOfBillPayments={client.numberOfBillPayments}
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
                        newBillPayment={newBillPayment}
                        setBillPaymentDeleted={setBillPaymentDeleted}
                        setShowUpdateClientForm={setShowUpdateClientForm}
                        setShowNotification={props.setShowNotification}
                        setClientDeleted={setClientDeleted}
                        clientDeleted={clientDeleted}
                        company={props.company} />
                ) :
                    <div className="NoDetails">
                        <NoDetails size={45} />
                        <span>No client selected, select a client to see more details, or add new client if there isn't</span>
                    </div>
                }
                {["Lydec", "Radeej"].includes(props.company) && clientsArray.length !== 0 && (
                    <div className="New" onClick={() => { setShowAddBillPaymentForm(true); setShowAddClientForm(false) }}>
                        <Pay color={"white"} size={25} />
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
                    clientUpdated={clientUpdated}
                    setShowNotification={props.setShowNotification}
                    operation={"Update"} />
            )}

            {showAddBillPaymentForm && (
                <AddBillPaymentForm
                    company={props.company}
                    setShowAddBillPaymentForm={setShowAddBillPaymentForm}
                    clientId={clientsArray[selected].clientId}
                    clientFullname={clientsArray[selected].fullName}
                    setShowNotification={props.setShowNotification}
                    setNewBillPayment={setNewBillPayment}
                    newBillPayment={newBillPayment} />
            )}
        </div>
    );
}

export default BillPayment;