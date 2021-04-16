package com.tashilat.microUserTraces.models;

import javax.persistence.*;

@Entity
public class MoneyTransfer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String beneficiaryFullName;
    private String transmitterPhoneNumber;
    private String transactionCode;
    private String beneficiaryId;
    private String transmitterAgencyName;
    private Long transmitterAgencyId;
    private String receiverAgencyName;
    private Long receiverAgencyId;
    private Long price;
    private String date;
    private boolean done;
    private String favorite;
    @ManyToOne
    @JoinColumn (name="client_id", referencedColumnName="clientId")
    private Client client;

    public MoneyTransfer() {

    }

    public MoneyTransfer(Long id, String beneficiaryFullName, String transmitterPhoneNumber, String transactionCode, String beneficiaryId, String transmitterAgencyName, Long transmitterAgencyId, String receiverAgencyName, Long receiverAgencyId, Long price, String date, boolean done, String favorite, Client client) {
        this.id = id;
        this.beneficiaryFullName = beneficiaryFullName;
        this.transmitterPhoneNumber = transmitterPhoneNumber;
        this.transactionCode = transactionCode;
        this.beneficiaryId = beneficiaryId;
        this.transmitterAgencyName = transmitterAgencyName;
        this.transmitterAgencyId = transmitterAgencyId;
        this.receiverAgencyName = receiverAgencyName;
        this.receiverAgencyId = receiverAgencyId;
        this.price = price;
        this.date = date;
        this.done = done;
        this.favorite = favorite;
        this.client = client;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBeneficiaryFullName() {
        return beneficiaryFullName;
    }

    public void setBeneficiaryFullName(String beneficiaryFullName) {
        this.beneficiaryFullName = beneficiaryFullName;
    }

    public String getTransmitterPhoneNumber() {
        return transmitterPhoneNumber;
    }

    public void setTransmitterPhoneNumber(String transmitterPhoneNumber) {
        this.transmitterPhoneNumber = transmitterPhoneNumber;
    }

    public String getTransactionCode() {
        return transactionCode;
    }

    public void setTransactionCode(String transactionCode) {
        this.transactionCode = transactionCode;
    }

    public String getBeneficiaryId() {
        return beneficiaryId;
    }

    public void setBeneficiaryId(String beneficiaryId) {
        this.beneficiaryId = beneficiaryId;
    }

    public String getTransmitterAgencyName() {
        return transmitterAgencyName;
    }

    public void setTransmitterAgencyName(String transmitterAgencyName) {
        this.transmitterAgencyName = transmitterAgencyName;
    }

    public Long getTransmitterAgencyId() {
        return transmitterAgencyId;
    }

    public void setTransmitterAgencyId(Long transmitterAgencyId) {
        this.transmitterAgencyId = transmitterAgencyId;
    }

    public String getReceiverAgencyName() {
        return receiverAgencyName;
    }

    public void setReceiverAgencyName(String receiverAgencyName) {
        this.receiverAgencyName = receiverAgencyName;
    }

    public Long getReceiverAgencyId() {
        return receiverAgencyId;
    }

    public void setReceiverAgencyId(Long receiverAgencyId) {
        this.receiverAgencyId = receiverAgencyId;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public String getFavorite() {
        return favorite;
    }

    public void setFavorite(String favorite) {
        this.favorite = favorite;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    @Override
    public String toString() {
        return "MoneyTransfer{" +
                "id=" + id +
                ", beneficiaryFullName='" + beneficiaryFullName + '\'' +
                ", transmitterPhoneNumber='" + transmitterPhoneNumber + '\'' +
                ", transactionCode='" + transactionCode + '\'' +
                ", beneficiaryId='" + beneficiaryId + '\'' +
                ", transmitterAgencyName='" + transmitterAgencyName + '\'' +
                ", transmitterAgencyId=" + transmitterAgencyId +
                ", receiverAgencyName='" + receiverAgencyName + '\'' +
                ", receiverAgencyId=" + receiverAgencyId +
                ", price=" + price +
                ", date='" + date + '\'' +
                ", done=" + done +
                ", favorite='" + favorite + '\'' +
                ", client=" + client +
                '}';
    }
}
