package com.ebudezain.soy.Fragment;

import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.ebudezain.soy.ListUserActivity;
import com.ebudezain.soy.R;
import com.ebudezain.soy.apis.GameService;
import com.ebudezain.soy.apis.UserService;
import com.ebudezain.soy.config.constant;
import com.ebudezain.soy.models.APIError;
import com.ebudezain.soy.models.Question;
import com.ebudezain.soy.models.ResponseListUser;
import com.ebudezain.soy.models.ResponseQuestion;
import com.ebudezain.soy.models.User;
import com.google.gson.Gson;

import java.io.IOException;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class QuestionGameFragment extends Fragment {

    public static final String TAG = QuestionGameFragment.class.getSimpleName();

    public static List<Question> mQuestions;
    /// create retrofit instance
    private static Retrofit.Builder retrofitBuilder = new Retrofit.Builder()
            .baseUrl(constant.API_BASE_URL)
            .addConverterFactory(GsonConverterFactory.create());

    public static Retrofit retrofit = retrofitBuilder.build();

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_question_game_mypage, container, false);
        callApiGetQuestion();
        return view;
    }

    private void callApiGetQuestion() {

        GameService retro = retrofit.create(GameService.class);
        /// tạo 1 đối tượng retrofit ở dạng interface để thực hiện call api
        retro.getQuestions()
                .enqueue(new Callback<ResponseQuestion>() {
                    @Override
                    public void onResponse(Call<ResponseQuestion> call, Response<ResponseQuestion> response) {
                        if(response.isSuccessful()) {
                            ///
                            Log.d(TAG, "response.body() : " + new Gson().toJson(response));
                            ResponseQuestion res = response.body();

                            List<Question> questions = res.getData();
                            mQuestions = questions;
                            Log.d(TAG, "response.body() : " + new Gson().toJson(questions));
                            /// cho sai thì không làm gì cả
                            Toast.makeText(getActivity(), "lấy danh sách question thành công", Toast.LENGTH_LONG)
                                    .show();
                        }else{
                            // parse the response body …
                            APIError apiError = new APIError();
                            try {
                                Gson gson = new Gson();
                                apiError = gson.fromJson( response.errorBody().string(), APIError.class);
                            } catch (IOException e) {
                                Log.d(TAG, "err sdfds : " + apiError.getCode() );
                                e.printStackTrace();
                            }

                            Log.d(TAG, "err : " + apiError.getCode() + apiError.getMessage() );
                        }
                    }

                    @Override
                    public void onFailure(Call<ResponseQuestion> call, Throwable t) {

                    }
                });
    }
}
