package com.ebudezain.soy;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

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
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.InstanceIdResult;

import org.json.JSONObject;

import java.util.Map;

import okhttp3.RequestBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class LoginActivity extends AppCompatActivity {

    public static final String TAG = LoginActivity.class.getSimpleName();
    public static String FIREBASE_ID = null;

    EditText editEmail = null;
    EditText editPassword = null;
    Button btnLogin = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        /// cho sai thì không làm gì cả
        Toast.makeText(LoginActivity.this, "login onCreate", Toast.LENGTH_LONG)
                .show();
        setContentView(R.layout.activity_login);
        Log.d(TAG, "onCreate");
        editEmail       = (EditText) findViewById(R.id.edtEmail);
        editPassword    = (EditText) findViewById(R.id.edtPassword);
        btnLogin        = (Button) findViewById(R.id.btnLogin);
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String email    = editEmail.getText().toString();
                String password = editPassword.getText().toString();
                btnLogin.setEnabled(false);
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
                        ResponseGeneral res = response.body();
                        // cho đúng
                        Log.d(TAG, "success : " + response.body().getCode());
                        /// check success
                        if( res != null && res.getCode() == 200 ){
                            // cho đúng
                            Toast.makeText(LoginActivity.this, "login thành công", Toast.LENGTH_SHORT)
                                    .show();
                            setLoginRefer(res.getData().getAccess());
                            registerFirebase();
                            //// đẩy dữ liệu firebase cho server
                            storeFirebaseIdToServer();
                            /// qua trang view list
                            Intent intent = new Intent(LoginActivity.this, LauncherActivity.class);
                            startActivity(intent);

                        }else{
                            ErrorResource err = res.getErrors().get(0);
                            Log.d(TAG, "err 0: " + err.getMessage());
                            /// cho sai thì không làm gì cả
                            Toast.makeText(LoginActivity.this, "login thất bại null hoặc code", Toast.LENGTH_LONG)
                                    .show();
                        }
                        btnLogin.setEnabled(true);
                        //// set text null submit
                        editEmail.setText("");
                        editPassword.setText("");
                    }

                    @Override
                    public void onFailure(Call<ResponseGeneral> call, Throwable t) {
                        /// cho sai thì không làm gì cả
                        Toast.makeText(LoginActivity.this, "login thất bại" + t.getMessage(), Toast.LENGTH_LONG)
                                .show();
                        Log.d(TAG, "onFailure: " + "login thất bại" + t.getMessage());
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


    }

    private void setLoginRefer(String access){
        SharedPreferences pref = getApplicationContext().getSharedPreferences(LauncherActivity.PREFS_NAME, MODE_PRIVATE);
        SharedPreferences.Editor editor = pref.edit();
        editor.putString(LauncherActivity.KEY_LOGIN, access);
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
                FIREBASE_ID = token;
                // cho đúng
                Toast.makeText(LoginActivity.this, "token của register firebase" + token, Toast.LENGTH_SHORT)
                        .show();
                SharedPreferences pref = getApplicationContext().getSharedPreferences(LauncherActivity.PREFS_FIREBASE, MODE_PRIVATE);
                SharedPreferences.Editor editor = pref.edit();
                editor.putString(LauncherActivity.KEY_TOKEN_FIREBASE, token);
                editor.apply();
            }
        });
    }
}
