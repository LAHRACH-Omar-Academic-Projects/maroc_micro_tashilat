package com.tashilat.microUserTraces.models;

import javax.persistence.*;

@Entity
public class BillPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String method;
    private Long paymentCode;
    private String service;
    private Long price;
    private String date;
    private String company;
    private boolean favorite;
    @ManyToOne
    @JoinColumn (name="client_id", referencedColumnName="clientId")
    private Client client;

    public BillPayment() {

    }

    public BillPayment(Long id, String method, Long paymentCode, String service, Long price, String date, String company, boolean favorite) {
        this.id = id;
        this.method = method;
        this.paymentCode = paymentCode;
        this.service = service;
        this.price = price;
        this.date = date;
        this.company = company;
        this.favorite = favorite;
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

    public Long getPaymentCode() {
        return paymentCode;
    }

    public void setPaymentCode(Long paymentCode) {
        this.paymentCode = paymentCode;
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

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
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
        return "BillPayment{" +
                "id=" + id +
                ", method='" + method + '\'' +
                ", paymentCode=" + paymentCode +
                ", service='" + service + '\'' +
                ", price=" + price +
                ", date='" + date + '\'' +
                ", company='" + company + '\'' +
                ", favorite=" + favorite +
                ", client=" + client +
                '}';
    }
}
