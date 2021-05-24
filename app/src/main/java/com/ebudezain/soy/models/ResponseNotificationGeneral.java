package com.ebudezain.soy.models;

import java.util.ArrayList;

public class ResponseNotificationGeneral {

    private int code;
    private Notification data;
    private String internal_message;
    private String message;
    private ArrayList<ErrorResource> errors;

    public ResponseNotificationGeneral(int code, Notification data, String internal_message, String message, ArrayList<ErrorResource> errors) {
        this.code = code;
        this.data = data;
        this.internal_message = internal_message;
        this.message = message;
        this.errors = errors;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public Notification getData() {
        return data;
    }

    public void setData(Notification data) {
        this.data = data;
    }

    public String getInternal_message() {
        return internal_message;
    }

    public void setInternal_message(String internal_message) {
        this.internal_message = internal_message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public ArrayList<ErrorResource> getErrors() {
        return errors;
    }

    public void setErrors(ArrayList<ErrorResource> errors) {
        this.errors = errors;
    }
}
