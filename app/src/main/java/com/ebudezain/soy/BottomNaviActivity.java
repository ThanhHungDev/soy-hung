package com.ebudezain.soy;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.MenuItem;
import android.widget.Toast;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class BottomNaviActivity extends AppCompatActivity {

    BottomNavigationView bnavi = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bottom_navi);

        bnavi = (BottomNavigationView) findViewById(R.id.bottomNavi);
        bnavi.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()){

                    case R.id.bnaviHome: {
                        Toast.makeText(BottomNaviActivity.this, "tao bấm vào home", Toast.LENGTH_LONG)
                                .show();
                        break;
                    }
                    case R.id.bnaviMessage: {
                        Toast.makeText(BottomNaviActivity.this, "tao bấm vào message!", Toast.LENGTH_LONG)
                                .show();
                        break;
                    }
                    case R.id.bnaviNotify: {
                        Toast.makeText(BottomNaviActivity.this, "tao bấm vào notify!!!", Toast.LENGTH_LONG)
                                .show();
                        break;
                    }
                }
                return true;
            }
        });
    }
}
