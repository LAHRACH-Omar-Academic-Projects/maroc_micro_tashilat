package com.tashilat.microBillPayment.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class RadeejBillPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String method;
    private String service;
    private Long price;
    private String date;
    private Long paymentCode;
    private String agencyName;
    private Long agencyId;

    public RadeejBillPayment() {

    }

    public RadeejBillPayment(Long id, String service, Long price, String date, String method, Long paymentCode, String agencyName, Long agencyId) {
        this.id = id;
        this.service = service;
        this.price = price;
        this.date = date;
        this.method = method;
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

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
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
        return "RadeejBillPayment{" +
                "id=" + id +
                ", method='" + method + '\'' +
                ", service='" + service + '\'' +
                ", price=" + price +
                ", date='" + date + '\'' +
                ", paymentCode=" + paymentCode +
                ", agencyName='" + agencyName + '\'' +
                ", agencyId=" + agencyId +
                '}';
    }
}
