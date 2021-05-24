package com.ebudezain.soy.models;

public class User {

    private String _id;
    private String name;
    private String email;
    private int gender;
    private String avatar;

    public User(String _id, String name, String email, int gender, String avatar) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.avatar = avatar;
    }

    public User(String _id, String name, String email, int gender) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.gender = gender;
    }

    public String getId() {
        return _id;
    }

    public void setId(String _id) {
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

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
