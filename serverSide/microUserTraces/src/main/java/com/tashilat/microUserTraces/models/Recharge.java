package com.tashilat.microUserTraces.models;

import javax.persistence.*;

@Entity
public class Recharge {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String phone;
    private double price;
    private String operationType;
    private String company;
    private String date;
    private boolean favorite;
    @ManyToOne
    @JoinColumn (name="client_id", referencedColumnName="clientId")
    private Client client;

    public Recharge() {

    }

    public Recharge(Long id, String phone, double price, String operationType, String company, String date, boolean favorite) {
        this.id = id;
        this.phone = phone;
        this.price = price;
        this.operationType = operationType;
        this.company = company;
        this.date = date;
        this.favorite = favorite;
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

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    @Override
    public String toString() {
        return "Recharge{" +
                "id=" + id +
                ", phone='" + phone + '\'' +
                ", price=" + price +
                ", operationType='" + operationType + '\'' +
                ", company='" + company + '\'' +
                ", date='" + date + '\'' +
                ", favorite=" + favorite +
                ", client=" + client +
                '}';
    }
}
