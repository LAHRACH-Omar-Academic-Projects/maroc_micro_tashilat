package com.tashilat.microUserTraces.models;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long clientId;
    private String fullName;
    private String cin;
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Recharge> rechargeList;
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<BillPayment> billPaymentList;
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<MoneyTransfer> moneyTransferList;
    @OneToMany(mappedBy = "client", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    private List<UserClient> userClientList;
    public Client() {
        rechargeList = new ArrayList<>();
        userClientList = new ArrayList<>();
    }

    public Client(Long clientId, String fullName, String cin) {
        this.clientId = clientId;
        this.fullName = fullName;
        this.cin = cin;
    }

    public Long getClientId() {
        return clientId;
    }

    public void setClientId(Long clientId) {
        this.clientId = clientId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getCin() {
        return cin;
    }

    public void setCin(String cin) {
        this.cin = cin;
    }

    public List<Recharge> getRechargeList() {
        return rechargeList;
    }

    public void setRechargeList(List<Recharge> rechargeList) {
        this.rechargeList = rechargeList;
    }

    public List<BillPayment> getBillPaymentList() {
        return billPaymentList;
    }

    public void setBillPaymentList(List<BillPayment> billPaymentList) {
        this.billPaymentList = billPaymentList;
    }

    public List<MoneyTransfer> getMoneyTransferList() {
        return moneyTransferList;
    }

    public void setMoneyTransferList(List<MoneyTransfer> moneyTransferList) {
        this.moneyTransferList = moneyTransferList;
    }

    public List<UserClient> getUserClientList() {
        return userClientList;
    }

    public void setUserClientList(List<UserClient> userClientList) {
        this.userClientList = userClientList;
    }

    @Override
    public String toString() {
        return "Client{" +
                "clientId=" + clientId +
                ", fullName='" + fullName + '\'' +
                ", cin='" + cin + '\'' +
                ", rechargeList=" + rechargeList +
                ", billPaymentList=" + billPaymentList +
                ", moneyTransferList=" + moneyTransferList +
                ", userClientList=" + userClientList +
                '}';
    }
}
