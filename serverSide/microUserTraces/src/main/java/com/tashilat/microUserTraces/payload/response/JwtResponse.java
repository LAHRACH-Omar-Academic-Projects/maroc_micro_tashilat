package com.tashilat.microUserTraces.payload.response;

import com.tashilat.microUserTraces.models.Client;
import com.tashilat.microUserTraces.models.UserClient;

import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String username;
    private String email;
    private String password;
    private String agencyName;
    private String agencyId;
    private String role;
    private boolean online;
    private List<UserClient> clients;

    public JwtResponse(String token, Long id, String username, String email, String password, String agencyName, String agencyId, String role, boolean online, List<UserClient> clients) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.agencyName = agencyName;
        this.agencyId = agencyId;
        this.role = role;
        this.online = online;
        this.clients = clients;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAgencyName() {
        return agencyName;
    }

    public void setAgencyName(String agencyName) {
        this.agencyName = agencyName;
    }

    public String getAgencyId() {
        return agencyId;
    }

    public void setAgencyId(String agencyId) {
        this.agencyId = agencyId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isOnline() {
        return online;
    }

    public void setOnline(boolean online) {
        this.online = online;
    }

    public List<UserClient> getClients() {
        return clients;
    }

    public void setClients(List<UserClient> clients) {
        this.clients = clients;
    }

    @Override
    public String toString() {
        return "JwtResponse{" +
                "token='" + token + '\'' +
                ", type='" + type + '\'' +
                ", id=" + id +
                ", username='" + username + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", agencyName='" + agencyName + '\'' +
                ", agencyId='" + agencyId + '\'' +
                ", role='" + role + '\'' +
                ", online=" + online +
                ", clients=" + clients +
                '}';
    }
}
