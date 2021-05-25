package com.ebudezain.soy.models;

import java.util.ArrayList;
import java.util.List;

public class ResponseListUser {

    private int code;
    private List<User> data;
    private String internal_message;
    private String message;
    private ArrayList<ErrorResource> errors;

    public ResponseListUser(int code, List<User> data, String internal_message, String message, ArrayList<ErrorResource> errors) {
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

    public List<User> getData() {
        return data;
    }

    public void setData(List<User> data) {
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
