package com.cojeans.osiopso.exception;

import org.springframework.mail.MailException;

public class CustomMailException extends MailException {
    public CustomMailException(String msg) {
        super(msg);
    }

    public CustomMailException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
