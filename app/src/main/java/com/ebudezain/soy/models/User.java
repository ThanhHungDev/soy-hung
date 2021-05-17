package com.ebudezain.soy.models;

public class User {

    private int _id;
    private String name;
    private String email;
    private int gender;

    public User(int _id, String name, String email, int gender) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.gender = gender;
    }

    public int getId() {
        return _id;
    }

    public void setId(int _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getGender() {
        return gender;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }
}
