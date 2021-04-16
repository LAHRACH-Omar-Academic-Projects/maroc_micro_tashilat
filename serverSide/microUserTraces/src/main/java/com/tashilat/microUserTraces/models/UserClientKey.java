package com.tashilat.microUserTraces.models;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class UserClientKey implements Serializable {
    @Column(name = "user_id")
    Long userId;
    @Column(name = "client_id")
    Long clientId;
}
