package com.ebudezain.soy.apis;




import com.ebudezain.soy.models.ResponseListUser;

import org.json.JSONObject;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;

public interface UserService {

    @GET("/api/v1/users")
    Call<ResponseListUser> getUsers(@Header("x-access-token") String access);

    @POST("/api/v1/users")
    Call<JSONObject> postUsers();
}