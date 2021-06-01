package com.ebudezain.soy.apis;

import com.ebudezain.soy.models.ResponseQuestion;


import retrofit2.Call;
import retrofit2.http.GET;

public interface GameService {

    @GET("/api/v1/questions")
    Call<ResponseQuestion> getQuestions();
}
