package com.tashilat.microUserTraces.security.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.tashilat.microUserTraces.models.Client;
import com.tashilat.microUserTraces.models.User;
import com.tashilat.microUserTraces.models.UserClient;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;

public class UserDetailsImpl implements UserDetails {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String username;
    private String email;
    @JsonIgnore
    private String password;
    private String agencyName;
    private String agencyId;
    private String role;
    private boolean online;
    private List<UserClient> clients;

    public UserDetailsImpl(Long id, String username, String email, String password, String agencyName, String agencyId, String role, boolean online, List<UserClient> clients) {
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

    public static UserDetailsImpl build(User user) {
        return new UserDetailsImpl(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getPassword(),
                user.getAgencyName(),
                user.getAgencyId(),
                user.getRole(),
                user.isOnline(),
                user.getUserClientList());
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return new ArrayList<>();
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getAgencyName() {
        return agencyName;
    }

    public String getAgencyId() {
        return agencyId;
    }

    public String getRole() {
        return role;
    }

    public boolean isOnline() {
        return online;
    }

    public List<UserClient> getClients() {
        return clients;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        UserDetailsImpl user = (UserDetailsImpl) o;
        return Objects.equals(id, user.id);
    }
}