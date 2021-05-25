package com.ebudezain.soy.models;

import java.util.ArrayList;

public class APIError {

    private int code;
    private String internal_message;
    private String message;
//    private ArrayList<ErrorResource> errors;

    public APIError() {
        this.code = 504;
        this.internal_message = "nothing";
        this.message = "nothing";
//        this.errors = null;
    }

    public APIError(int code, String message, String internal_message) {
        this.code = code;
        this.internal_message = internal_message;
        this.message = message;
    }

    //    public APIError(int code, String internal_message, String message, ArrayList<ErrorResource> errors) {
//        this.code = code;
//        this.internal_message = internal_message;
//        this.message = message;
////        this.errors = errors;
//    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
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

//    public ArrayList<ErrorResource> getErrors() {
//        return errors;
//    }
//
//    public void setErrors(ArrayList<ErrorResource> errors) {
//        this.errors = errors;
//    }
}
