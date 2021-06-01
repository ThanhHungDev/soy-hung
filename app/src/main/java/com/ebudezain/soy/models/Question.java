package com.ebudezain.soy.models;

public class Question {

    String _id;
    String name;
    String image;
    String iden;
    String createdAt;
    String updatedAt;

    public Question(String _id, String name, String image, String iden, String createdAt, String updatedAt) {
        this._id = _id;
        this.name = name;
        this.image = image;
        this.iden = iden;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getIden() {
        return iden;
    }

    public void setIden(String iden) {
        this.iden = iden;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
