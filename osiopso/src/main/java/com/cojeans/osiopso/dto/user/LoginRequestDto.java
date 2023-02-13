package com.cojeans.osiopso.dto.user;


/**
 * Created by rajeevkumarsingh on 02/08/17.
 */
public class LoginRequestDto {
    private NotificationEmail email;

    private NotificationEmail password;

    public NotificationEmail getEmail() {
        return email;
    }

    public void setEmail(NotificationEmail email) {
        this.email = email;
    }

    public NotificationEmail getPassword() {
        return password;
    }

    public void setPassword(NotificationEmail password) {
        this.password = password;
    }
}
