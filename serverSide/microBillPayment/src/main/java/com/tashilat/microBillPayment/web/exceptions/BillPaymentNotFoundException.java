package com.tashilat.microBillPayment.web.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class BillPaymentNotFoundException extends RuntimeException {
    public BillPaymentNotFoundException(String s) {
        super(s);
    }
}
