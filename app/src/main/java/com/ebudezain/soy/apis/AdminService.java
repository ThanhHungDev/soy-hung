package com.ebudezain.soy.apis;

import com.ebudezain.soy.models.ResponseListUser;

import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.POST;

public interface AdminService {

    @GET("/api/v1/users-admin")
    Call<ResponseListUser> getUsers();

    @POST("/api/v1/users-admin")
    Call<JSONObject> postUsers();
}
