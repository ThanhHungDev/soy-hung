package com.ebudezain.soy;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

import com.ebudezain.soy.adapters.LstUserAdapter;
import com.ebudezain.soy.apis.ErrorUtils;
import com.ebudezain.soy.apis.UserService;
import com.ebudezain.soy.config.constant;
import com.ebudezain.soy.models.APIError;
import com.ebudezain.soy.models.ResponseListUser;
import com.ebudezain.soy.models.User;
import com.google.gson.Gson;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class ListUserActivity extends AppCompatActivity {

    public static final String TAG = ListUserActivity.class.getSimpleName();

    /// create retrofit instance
    private static Retrofit.Builder retrofitBuilder = new Retrofit.Builder()
            .baseUrl(constant.API_BASE_URL)
            .addConverterFactory(GsonConverterFactory.create());

    public static Retrofit retrofit = retrofitBuilder.build();

    private List<User> mUsers = new ArrayList<User>();
    RecyclerView lstUserRecycler = null;
    LstUserAdapter userAdepter = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_list_user);
        /// đầu tiên phải set adapter
        lstUserRecycler = (RecyclerView) findViewById(R.id.lstUserRecycler);
        userAdepter = new LstUserAdapter(ListUserActivity.this);
        /// cần phải set layout cho nó
        /// chọn đại 1 layout ví dụ linerlayout
        LinearLayoutManager layout = new LinearLayoutManager(ListUserActivity.this);
        lstUserRecycler.setLayoutManager(layout);
        lstUserRecycler.setAdapter(userAdepter);

//        User fakeUser = new User("dsfdf", "ahihi", "nà ní", 123, "sfds ");
//        List<User> fakers = new ArrayList<>();
//        fakers.add(fakeUser);
//        userAdepter.setLstUser(fakers);
        if( mUsers.size() == 0 ){
            /// không có thì fet api
            getLstUser();
        }else{
            userAdepter.setLstUser(mUsers);
        }

    }

    private void getLstUser(){
        /// call api
        SharedPreferences prefs = getSharedPreferences(LauncherActivity.PREFS_LOGIN, MODE_PRIVATE);
        String access = prefs.getString(LauncherActivity.KEY_LOGIN, "");//"" is the default value.
        String refresh = prefs.getString(LauncherActivity.KEY_REFRESH, "");//"" is the default value.
        String firebase = prefs.getString(LauncherActivity.KEY_TOKEN_FIREBASE, "");//"" is the default value.

        Log.d(TAG, "checkLogin ListUserActivity " + access + " refresh " + refresh + " firebase " + firebase);
        if( !access.equals("") ){
            callApiGetListUser(access);
        }
        return;
    }

    private void callApiGetListUser(String access){
        List<User> users = null;
        UserService retrofitUserService = retrofit.create(UserService.class);
        retrofitUserService.getUsers(access)
                .enqueue(new Callback<ResponseListUser>() {
                    @Override
                    public void onResponse(Call<ResponseListUser> call, Response<ResponseListUser> response) {

                        if(response.isSuccessful()) {
                            ///
                            Log.d(TAG, "response.body() : " + new Gson().toJson(response));
                            ResponseListUser res = response.body();
                            /// thành công
                            Toast.makeText(ListUserActivity.this, "lấy danh sách user thành công", Toast.LENGTH_SHORT)
                                    .show();
                            List<User> users = res.getData();
                            mUsers = users;
                            Log.d(TAG, "response.body() : " + new Gson().toJson(users));
                            userAdepter.setLstUser(users);

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
                            /// cho sai thì không làm gì cả
                            Toast.makeText(ListUserActivity.this, "lấy danh sách user thất bại" + apiError.getMessage(), Toast.LENGTH_LONG)
                                    .show();

                        }
                    }

                    @Override
                    public void onFailure(Call<ResponseListUser> call, Throwable t) {
                        /// thành công
                        Toast.makeText(ListUserActivity.this, "lấy danh sách thất bại" + t.getMessage(), Toast.LENGTH_SHORT)
                                .show();
                    }
                });

    }
}
