package com.ebudezain.soy;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class LauncherActivity extends AppCompatActivity {

    public static final String TAG = LauncherActivity.class.getSimpleName();
    public static final String PREFS_NAME = "LOGIN";
    public static final String KEY_LOGIN = "KEY_LOGIN";

    public static final String PREFS_FIREBASE = "FIREBASE";
    public static final String KEY_TOKEN_FIREBASE = "KEY_TOKEN_FIREBASE";

    private Button btnLogout;
    private TextView tvShowStateLogin;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_launcher);
        tvShowStateLogin = (TextView) findViewById(R.id.tvWellcome);
        btnLogout = (Button) findViewById(R.id.btnLogout);
        btnLogout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                setLogout();
            }
        });
        if( this.checkLogin() ){

            Intent intentLogin = new Intent(this, ConversationsActivity.class);
            startActivity(intentLogin);
        }else{
            /// qua màn hình login
            Intent intentLogin = new Intent(this, LoginActivity.class);
            startActivity(intentLogin);
        }
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        /// qua màn hình load listview
        Toast.makeText(LauncherActivity.this, "bạn vừa restart 1 activity", Toast.LENGTH_SHORT)
                .show();
        if( this.checkLogin() ){
            checkFirebase();
            tvShowStateLogin.setText("đã login rồi");
        }
    }

    private boolean checkLogin(){
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        String access = prefs.getString(KEY_LOGIN, "");//"" is the default value.
        if( !access.equals("") ){
            return true;
        }
        return false;
    }
    private void checkFirebase(){
        SharedPreferences prefs = getSharedPreferences(PREFS_FIREBASE, MODE_PRIVATE);
        String tokenFirebase = prefs.getString(KEY_TOKEN_FIREBASE, "");//"" is the default value.
        /// qua màn hình load listview
        Toast.makeText(LauncherActivity.this, "có tokenFirebase" + tokenFirebase, Toast.LENGTH_SHORT)
                .show();
        Log.d(TAG, "checkFirebase: " + tokenFirebase);
    }

    private void setLogout(){
        SharedPreferences pref = getApplicationContext().getSharedPreferences(LauncherActivity.PREFS_NAME, MODE_PRIVATE);
        SharedPreferences.Editor editor = pref.edit();
        editor.remove(LauncherActivity.KEY_LOGIN);
        editor.apply();
        Toast.makeText(LauncherActivity.this, "đã logout", Toast.LENGTH_SHORT)
                .show();
        finish();
        startActivity(getIntent());
    }
}
