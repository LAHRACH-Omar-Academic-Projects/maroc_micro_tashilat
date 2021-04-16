package com.tashilat.microBillPayment.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class LydecBillPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String method;
    private Long paymentCode;
    private String service;
    private Long price;
    private String date;
    private String agencyName;
    private Long agencyId;

    public LydecBillPayment() {

    }

    public LydecBillPayment(Long id, String method, String service, Long price, String date, Long paymentCode, String agencyName, Long agencyId) {
        this.id = id;
        this.method = method;
        this.service = service;
        this.price = price;
        this.date = date;
        this.paymentCode = paymentCode;
        this.agencyName = agencyName;
        this.agencyId = agencyId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getPaymentCode() {
        return paymentCode;
    }

    public void setPaymentCode(Long paymentCode) {
        this.paymentCode = paymentCode;
    }

    public String getAgencyName() {
        return agencyName;
    }

    public void setAgencyName(String agencyName) {
        this.agencyName = agencyName;
    }

    public Long getAgencyId() {
        return agencyId;
    }

    public void setAgencyId(Long agencyId) {
        this.agencyId = agencyId;
    }

    @Override
    public String toString() {
        return "LydecBillPayment{" +
                "id=" + id +
                ", method='" + method + '\'' +
                ", paymentCode=" + paymentCode +
                ", service='" + service + '\'' +
                ", price=" + price +
                ", date='" + date + '\'' +
                ", agencyName='" + agencyName + '\'' +
                ", agencyId=" + agencyId +
                '}';
    }
}