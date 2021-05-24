package com.ebudezain.soy;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.ArrayMap;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import com.ebudezain.soy.apis.ApiService;
import com.ebudezain.soy.models.ResponseGeneral;
import com.ebudezain.soy.models.ResponseRegisterUser;

import org.json.JSONObject;

import java.io.IOException;
import java.util.Map;

import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class RegisterActivity extends AppCompatActivity {

    public static final String TAG = RegisterActivity.class.getSimpleName();

    EditText edtName    = null;
    EditText edtEmail   = null;
    EditText edtPass    = null;
    EditText edtConfirm = null;

    RadioGroup rdGender = null;


   Button btnGotoLogin = null;
    Button btnRegister = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        overridePendingTransition(R.anim.fade_in, R.anim.fade_in);
        setContentView(R.layout.activity_register);

        edtName     = ( EditText ) findViewById(R.id.edtName);
        edtEmail    = ( EditText ) findViewById(R.id.edtEmail);
        edtPass     = ( EditText ) findViewById(R.id.edtPassword);
        edtConfirm  = ( EditText ) findViewById(R.id.edtConfirm);

        rdGender = ( RadioGroup ) findViewById(R.id.radioGroup_character);

        btnGotoLogin = (Button) findViewById(R.id.btnGotoLogin);
        btnGotoLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /// qua trang view list
//                Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
//                startActivity(intent);
                finish();
            }
        });
        btnRegister = (Button) findViewById(R.id.btnRegister);
        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                callApiRegister();
            }
        });
    }
    private void callApiRegister(){

        btnRegister.setEnabled(false);


        String name         = edtName.getText().toString();
        String email        = edtEmail.getText().toString();
        String password     = edtPass.getText().toString();
        String confirm      = edtConfirm.getText().toString();

        int genderId = rdGender.getCheckedRadioButtonId();
        RadioButton rdBtnChecked = (RadioButton) findViewById(genderId);
        int gender = Integer.parseInt(rdBtnChecked.getTag().toString());

        Log.d(TAG, name + " - " + email + " - " + password + " - " + confirm + " - " + gender );
        /// fetch
        Map<String, Object> jsonParams = new ArrayMap<>();
        //put something inside the map, could be null
        jsonParams.put("name", name);
        jsonParams.put("email", email);
        jsonParams.put("password", password);
        jsonParams.put("confirm", confirm);
        jsonParams.put("gender", gender);

        RequestBody body = RequestBody.create(okhttp3.MediaType.parse("application/json; charset=utf-8"),(new JSONObject(jsonParams)).toString());
        //serviceCaller is the interface initialized with retrofit.create...
        ApiService.apiService.register(body)
                .enqueue(new Callback<ResponseRegisterUser>() {
                    @Override
                    public void onResponse(Call<ResponseRegisterUser> call, Response<ResponseRegisterUser> response) {

                        if(response.body() != null) {
                            Log.d(TAG, "response.body() : " + response.body().toString());
                            ResponseRegisterUser res = response.body();
                            /// thành công
                            Toast.makeText(RegisterActivity.this, "đăng ký thành công", Toast.LENGTH_SHORT)
                                    .show();
                            /// qua trang view list

                            Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
                            startActivity(intent);
                            finish();
                        } else if(response.errorBody() != null){
                            ResponseBody res = response.errorBody();
                            try {
                                Log.d(TAG, "err : " + res.string());
                                /// cho sai thì không làm gì cả
                                Toast.makeText(RegisterActivity.this, "register thất bại", Toast.LENGTH_LONG)
                                        .show();
                            } catch (IOException e) {
                                e.printStackTrace();
                            }
                        }
                        resetFormInput();
                    }

                    @Override
                    public void onFailure(Call<ResponseRegisterUser> call, Throwable t) {

                        /// cho sai thì không làm gì cả
                        Toast.makeText(RegisterActivity.this, "call api thất bại " + t.getMessage(), Toast.LENGTH_LONG)
                                .show();
                        Log.d(TAG, "onFailure: " + "call api thất bại " + t.getMessage());

                        resetFormInput();
                    }
                });
    }

    private void resetFormInput(){
        btnRegister.setEnabled(true);

        edtName.getText().clear();
        edtName.clearFocus();

        edtEmail.getText().clear();
        edtEmail.clearFocus();

        edtPass.getText().clear();
        edtPass.clearFocus();

        edtConfirm.getText().clear();
        edtConfirm.clearFocus();
    }
}
