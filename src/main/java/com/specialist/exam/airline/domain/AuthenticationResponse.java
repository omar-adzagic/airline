package com.specialist.exam.airline.domain;

import com.specialist.exam.airline.service.dto.BasicUserInfoDTO;

public class AuthenticationResponse {

    private String jwt;
    private BasicUserInfoDTO user;

    public AuthenticationResponse(String jwt, BasicUserInfoDTO user) {
        this.jwt = jwt;
        this.user = user;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public BasicUserInfoDTO getUser() {
        return user;
    }

    public void setUser(BasicUserInfoDTO user) {
        this.user = user;
    }
}
