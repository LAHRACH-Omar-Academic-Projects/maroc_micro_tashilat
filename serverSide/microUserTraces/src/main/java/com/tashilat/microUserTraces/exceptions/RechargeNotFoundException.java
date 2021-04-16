package com.tashilat.microUserTraces.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class RechargeNotFoundException extends RuntimeException {
    public RechargeNotFoundException(String s) {
        super(s);
    }
}
