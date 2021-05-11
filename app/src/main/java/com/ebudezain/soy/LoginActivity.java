package com.ebudezain.soy;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class LoginActivity extends AppCompatActivity {

    public static final String TAG = LoginActivity.class.getSimpleName();

    EditText editEmail = null;
    EditText editPassword = null;
    Button btnLogin = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
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
                if( email.equals("thanhhung@gmail.com")){
                    // cho đúng
                    Toast.makeText(LoginActivity.this, "login thành công", Toast.LENGTH_SHORT)
                            .show();
                    setLoginRefer();
                    /// qua trang view list
                    Intent intent = new Intent(LoginActivity.this, LauncherActivity.class);
                    startActivity(intent);
                }else{
                    /// cho sai thì không làm gì cả
                    Toast.makeText(LoginActivity.this, "login thất bại", Toast.LENGTH_LONG)
                            .show();
                }
                btnLogin.setEnabled(true);
                //// set text null submit
                editEmail.setText("");
                editPassword.setText("");
            }
        });
    }

    private void setLoginRefer(){
        SharedPreferences pref = getApplicationContext().getSharedPreferences(LauncherActivity.PREFS_NAME, MODE_PRIVATE);
        SharedPreferences.Editor editor = pref.edit();
        editor.putString(LauncherActivity.KEY_LOGIN, "access");
        editor.apply();
    }
}
