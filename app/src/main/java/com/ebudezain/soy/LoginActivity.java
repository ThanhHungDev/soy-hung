package com.ebudezain.soy;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.ArrayMap;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.ebudezain.soy.apis.ApiService;
import com.ebudezain.soy.models.ErrorResource;
import com.ebudezain.soy.models.ResponseGeneral;
import com.ebudezain.soy.models.ResponseNotificationGeneral;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

import org.json.JSONObject;

import java.io.IOException;
import java.util.Map;

import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    public static final String TAG = LoginActivity.class.getSimpleName();
    public static String FIREBASE_ID = null;
    public static String ACCESS = null;
    public static String REFRESH = null;

    EditText editEmail = null;
    EditText editPassword = null;
    Button btnLogin = null;
    Button btnGotoRegister = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        /// cho sai thì không làm gì cả
        overridePendingTransition(R.anim.fade_in, R.anim.slide_out_left);

        Toast.makeText(LoginActivity.this, "login onCreate", Toast.LENGTH_LONG)
                .show();
        setContentView(R.layout.activity_login);
        Log.d(TAG, "onCreate");
        editEmail       = (EditText) findViewById(R.id.edtEmail);
        editPassword    = (EditText) findViewById(R.id.edtPassword);
        btnLogin        = (Button) findViewById(R.id.btnLogin);
        btnGotoRegister        = (Button) findViewById(R.id.btnRegister);
        btnGotoRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /// qua trang view list
                Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email    = editEmail.getText().toString();
                String password = editPassword.getText().toString();
                btnLogin.setEnabled(false);
                LoginActivity.hideKeyboard(LoginActivity.this);
                InputMethodManager imm = (InputMethodManager) LoginActivity.this.getSystemService(Context.INPUT_METHOD_SERVICE);
                if (null != LoginActivity.this.getCurrentFocus())
                    imm.hideSoftInputFromWindow(LoginActivity.this.getCurrentFocus()
                            .getApplicationWindowToken(), 0);
                Log.d(TAG, email);
                /// fetch
                Map<String, Object> jsonParams = new ArrayMap<>();
                //put something inside the map, could be null
                jsonParams.put("email", email);
                jsonParams.put("password", password);

                RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"),(new JSONObject(jsonParams)).toString());
                //serviceCaller is the interface initialized with retrofit.create...

                ApiService.apiService.login(body)
                .enqueue(new Callback<ResponseGeneral>() {
                    @Override
                    public void onResponse(Call<ResponseGeneral> call, Response<ResponseGeneral> response) {

                        if(response.body() != null) {
                            Log.d(TAG, "response.body() : " + response.body().toString());
                            ResponseGeneral res = response.body();
                            /// thành công
                            Toast.makeText(LoginActivity.this, "login thành công", Toast.LENGTH_SHORT)
                                    .show();
                            LoginActivity.ACCESS = res.getData().getAccess();
                            LoginActivity.REFRESH = res.getData().getRefresh();
                            setLoginRefer();
                            registerFirebase();
                            //// đẩy dữ liệu firebase cho server
                            /// qua trang view list
                            Intent intent = new Intent(LoginActivity.this, LauncherActivity.class);
                            startActivity(intent);
                        } else if(response.errorBody() != null){
                            ResponseBody res = response.errorBody();
                            try {
                                Log.d(TAG, "err : " + res.string());
                                /// cho sai thì không làm gì cả
                                Toast.makeText(LoginActivity.this, "login thất bại", Toast.LENGTH_LONG)
                                        .show();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }

                        btnLogin.setEnabled(true);
                        // set text null submit
                        // editEmail.setText("");
                        // editPassword.setText("");
                        // Clear the second EditText
                        editEmail.getText().clear();
                        editEmail.clearFocus();
                        editPassword.getText().clear();
                        editPassword.clearFocus();
                    }

                    @Override
                    public void onFailure(Call<ResponseGeneral> call, Throwable t) {
                        /// cho sai thì không làm gì cả
                        Toast.makeText(LoginActivity.this, "call api thất bại " + t.getMessage(), Toast.LENGTH_LONG)
                                .show();
                        Log.d(TAG, "onFailure: " + "call api thất bại " + t.getMessage());
                        btnLogin.setEnabled(true);
                        //// set text null submit
                        editEmail.setText("");
                        editPassword.setText("");
                    }
                });
            }
        });
    }


    private void storeFirebaseIdToServer(){
        Log.d(TAG, "storeFirebaseIdToServer: bắt đầu " + LoginActivity.FIREBASE_ID);
        if(LoginActivity.FIREBASE_ID != null ){
            Log.d(TAG, "storeFirebaseIdToServer: có id " + LoginActivity.FIREBASE_ID);
            /// đẩy id lên server
            /// fetch
            Map<String, Object> jsonParams = new ArrayMap<>();
            //put something inside the map, could be null
            jsonParams.put("access", LoginActivity.ACCESS);
            jsonParams.put("token", LoginActivity.FIREBASE_ID);
            jsonParams.put("device", "android");

            RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"),(new JSONObject(jsonParams)).toString());
            //serviceCaller is the interface initialized with retrofit.create...

            ApiService.apiService.storeFirebaseId(body, LoginActivity.ACCESS)
                    .enqueue(new Callback<ResponseNotificationGeneral>() {
                        @Override
                        public void onResponse(Call<ResponseNotificationGeneral> call, Response<ResponseNotificationGeneral> response) {
                            Log.d(TAG, "ApiService.apiService.storeFirebaseId: có response ");
                            if(response.body() != null) {
                                Log.d(TAG, "response.body() noti : " + response.body().toString());
                                ResponseNotificationGeneral res = response.body();
                                String access = res.getData().getAccess();
                                if( res.getCode() == 200 ){
                                    LoginActivity.ACCESS = access;
                                }
                                /// thành công
                                Toast.makeText(LoginActivity.this, "noti thành công", Toast.LENGTH_SHORT)
                                        .show();
                                setLoginRefer();
                            } else if(response.errorBody() != null){
                                ResponseBody res = response.errorBody();
                                try {
                                    Log.d(TAG, "err : " + res.string());
                                    /// cho sai thì không làm gì cả
                                    Toast.makeText(LoginActivity.this, "noti thất bại ", Toast.LENGTH_LONG)
                                            .show();
                                } catch (IOException e) {
                                    e.printStackTrace();
                                }
                            }
                        }

                        @Override
                        public void onFailure(Call<ResponseNotificationGeneral> call, Throwable t) {
                            /// cho sai thì không làm gì cả
                            Toast.makeText(LoginActivity.this, "call api noti thất bại " + t.getMessage(), Toast.LENGTH_LONG)
                                    .show();
                            Log.d(TAG, "ApiService.apiService.storeFirebaseId: có response eror" + t.getMessage());
                        }
                    });
        }
    }

    private void setLoginRefer(){
        SharedPreferences pref = getApplicationContext().getSharedPreferences(LauncherActivity.PREFS_LOGIN, MODE_PRIVATE);
        SharedPreferences.Editor editor = pref.edit();
        Log.d(TAG, "lưu a " + LoginActivity.ACCESS + " re " + LoginActivity.REFRESH + " r " + LoginActivity.FIREBASE_ID);
        editor.putString(LauncherActivity.KEY_LOGIN, LoginActivity.ACCESS);
        editor.putString(LauncherActivity.KEY_REFRESH, LoginActivity.REFRESH);
        editor.putString(LauncherActivity.KEY_TOKEN_FIREBASE, LoginActivity.FIREBASE_ID);
        editor.apply();
    }

    private void registerFirebase(){
        Intent service = new Intent(this, MyFirebaseService.class);
        startService(service);
        FirebaseInstanceId.getInstance().getInstanceId().addOnCompleteListener(new OnCompleteListener<InstanceIdResult>() {
            @Override
            public void onComplete(@NonNull Task<InstanceIdResult> task) {
                if(!task.isSuccessful()) {
                    return;
                }
                // Get new Instance ID token
                String token = task.getResult().getToken();
                LoginActivity.FIREBASE_ID = token;
                storeFirebaseIdToServer();
                // cho đúng
                Toast.makeText(LoginActivity.this, "token của register firebase" + token, Toast.LENGTH_SHORT)
                        .show();
            }
        });
    }
    public static void hideKeyboard(Activity activity) {
        InputMethodManager imm = (InputMethodManager) activity.getSystemService(Activity.INPUT_METHOD_SERVICE);
        //Find the currently focused view, so we can grab the correct window token from it.
        View view = activity.getCurrentFocus();
        //If no view currently has focus, create a new one, just so we can grab a window token from it
        if (view == null) {
            view = new View(activity);
        }
        imm.hideSoftInputFromWindow(view.getWindowToken(), 0);
    }
}
