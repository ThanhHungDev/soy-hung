package com.ebudezain.soy.models;

public class ErrorResource {

    private String error;
    private String message;
    private String rule;

    public ErrorResource(String error, String message, String rule) {
        this.error = error;
        this.message = message;
        this.rule = rule;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getRule() {
        return rule;
    }

    public void setRule(String rule) {
        this.rule = rule;
    }
}
