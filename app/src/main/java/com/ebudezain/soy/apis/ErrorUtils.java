package com.ebudezain.soy.apis;

import android.util.Log;

import com.ebudezain.soy.ListUserActivity;
import com.ebudezain.soy.models.APIError;

import java.io.IOException;
import java.lang.annotation.Annotation;

import okhttp3.ResponseBody;
import retrofit2.Converter;
import retrofit2.Response;

public class ErrorUtils {

    public static APIError parseError(Response<?> response) {
        Converter<ResponseBody, APIError> converter =
                ListUserActivity.retrofit
                        .responseBodyConverter(APIError.class, new Annotation[0]);

        APIError error;

        try {
            error = converter.convert(response.errorBody());
        } catch (IOException e) {
            Log.d("ErrorUtils", "parseError: " + e.getMessage());
            return new APIError();
        }

        return error;
    }
}
