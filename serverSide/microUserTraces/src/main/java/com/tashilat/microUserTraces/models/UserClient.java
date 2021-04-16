package com.tashilat.microUserTraces.models;

import javax.persistence.*;

@Entity
public class UserClient {
    @EmbeddedId
    UserClientKey userClientKey;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    User user;

    @ManyToOne
    @MapsId("clientId")
    @JoinColumn(name = "client_id")
    Client client;

    public UserClient() {
        userClientKey = new UserClientKey();
    }

    public UserClientKey getUserClientKey() {
        return userClientKey;
    }

    public void setUserClientKey(UserClientKey userClientKey) {
        this.userClientKey = userClientKey;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    @Override
    public String toString() {
        return "UserClient{" +
                "userClientKey=" + userClientKey +
                ", user=" + user +
                ", client=" + client +
                '}';
    }
}
