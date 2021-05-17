package com.ebudezain.soy.apis;

import com.ebudezain.soy.config.constant;
import com.ebudezain.soy.models.ResponseGeneral;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.POST;

public interface ApiService {

    /// cần có 1 gson của google để nhúng vào tạo gson convertor factory
    Gson gson = new GsonBuilder()
                .setDateFormat("yyyy-mm-dd")
                .create();

    ApiService apiService = new Retrofit.Builder()
            .baseUrl(constant.API_BASE_URL)
            .addConverterFactory(GsonConverterFactory.create(gson))
            .build()
            .create(ApiService.class);

    @POST("/api/v1/login")
    Call<ResponseGeneral> login( @Body RequestBody params);

    @POST("/api/v1/register/notification")
    Call<ResponseGeneral> storeFirebaseId(@Body RequestBody params );

}
