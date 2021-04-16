package com.tashilat.microMoneyTransfer.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class MoneyTransfer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String beneficiaryFullName;
    private String transmitterFullName;
    private String transmitterPhoneNumber;
    private String transmitterId;
    private String transactionCode;
    private String beneficiaryId;
    private String transmitterAgencyName;
    private Long transmitterAgencyId;
    private String receiverAgencyName;
    private Long receiverAgencyId;
    private Long price;
    private String date;
    private boolean done;

    public MoneyTransfer() {

    }

    public MoneyTransfer(Long id, String beneficiaryFullName, String transmitterFullName, String transmitterPhoneNumber, String transmitterId, String transactionCode, String beneficiaryId, String transmitterAgencyName, Long transmitterAgencyId, String receiverAgencyName, Long receiverAgencyId, Long price, String date, boolean done) {
        this.id = id;
        this.beneficiaryFullName = beneficiaryFullName;
        this.transmitterFullName = transmitterFullName;
        this.transmitterPhoneNumber = transmitterPhoneNumber;
        this.transmitterId = transmitterId;
        this.transactionCode = transactionCode;
        this.beneficiaryId = beneficiaryId;
        this.transmitterAgencyName = transmitterAgencyName;
        this.transmitterAgencyId = transmitterAgencyId;
        this.receiverAgencyName = receiverAgencyName;
        this.receiverAgencyId = receiverAgencyId;
        this.price = price;
        this.date = date;
        this.done = done;
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

    public String getTransmitterFullName() {
        return transmitterFullName;
    }

    public void setTransmitterFullName(String transmitterFullName) {
        this.transmitterFullName = transmitterFullName;
    }

    public String getTransmitterPhoneNumber() {
        return transmitterPhoneNumber;
    }

    public void setTransmitterPhoneNumber(String transmitterPhoneNumber) {
        this.transmitterPhoneNumber = transmitterPhoneNumber;
    }

    public String getTransmitterId() {
        return transmitterId;
    }

    public void setTransmitterId(String transmitterId) {
        this.transmitterId = transmitterId;
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

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public boolean isDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    @Override
    public String toString() {
        return "MoneyTransfer{" +
                "id=" + id +
                ", beneficiaryFullName='" + beneficiaryFullName + '\'' +
                ", transmitterFullName='" + transmitterFullName + '\'' +
                ", transmitterPhoneNumber='" + transmitterPhoneNumber + '\'' +
                ", transmitterId='" + transmitterId + '\'' +
                ", transactionCode='" + transactionCode + '\'' +
                ", beneficiaryId='" + beneficiaryId + '\'' +
                ", transmitterAgencyName='" + transmitterAgencyName + '\'' +
                ", transmitterAgencyId=" + transmitterAgencyId +
                ", receiverAgencyName='" + receiverAgencyName + '\'' +
                ", receiverAgencyId=" + receiverAgencyId +
                ", price=" + price +
                ", date='" + date + '\'' +
                ", done=" + done +
                '}';
    }
}
