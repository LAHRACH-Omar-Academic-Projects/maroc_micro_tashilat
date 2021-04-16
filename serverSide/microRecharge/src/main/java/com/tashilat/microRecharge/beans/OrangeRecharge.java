package com.tashilat.microRecharge.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class OrangeRecharge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String phone;
    private double price;
    private String operationType;
    private String agencyName;
    private Long agencyId;
    private String date;

    public OrangeRecharge() {

    }

    public OrangeRecharge(Long id, String phone, double price, String operationType, String agencyName, Long agencyId, String date) {
        this.id = id;
        this.phone = phone;
        this.price = price;
        this.operationType = operationType;
        this.agencyName = agencyName;
        this.agencyId = agencyId;
        this.date = date;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getOperationType() {
        return operationType;
    }

    public void setOperationType(String operationType) {
        this.operationType = operationType;
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

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return "OrangeRecharge{" +
                "id=" + id +
                ", phone='" + phone + '\'' +
                ", price=" + price +
                ", operationType='" + operationType + '\'' +
                ", agencyName='" + agencyName + '\'' +
                ", agencyId=" + agencyId +
                ", date='" + date + '\'' +
                '}';
    }
}
