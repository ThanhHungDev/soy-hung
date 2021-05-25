package com.ebudezain.soy;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import com.bumptech.glide.Glide;

import java.io.IOException;

public class DashboardActivity extends AppCompatActivity implements View.OnClickListener {

    public static final String TAG = DashboardActivity.class.getSimpleName();

    /* REQUEST_CODE là một giá trị int dùng để định danh mỗi request.
    Khi nhận được kết quả, hàm callback sẽ trả về cùng REQUEST_CODE này để ta có thể xác định và xử lý kết quả. */
    private static final int REQUEST_CODE_ICON = 123;

    CardView btnIconLoadingImgCircle = null;
    CardView btnIconLoadingIdFirebase = null;
    CardView btnRecycleView = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        Glide.with(this)
                .load(R.drawable.screen)
                .into((ImageView) findViewById(R.id.imgGif));

        initView();
//        initEvent();
    }

    private void initView(){
        btnIconLoadingImgCircle = (CardView) findViewById(R.id.btnIconLoadingImgCircle);
        btnIconLoadingImgCircle.setOnClickListener(this);
        btnIconLoadingIdFirebase = (CardView) findViewById(R.id.btnIconLoadingIdFirebase);
        btnIconLoadingIdFirebase.setOnClickListener(this);
        btnRecycleView = (CardView) findViewById(R.id.btnRecycleView);
        btnRecycleView.setOnClickListener(this);
    }


    @Override
    public void onClick(View v) {

        switch (v.getId()){
            case R.id.btnIconLoadingImgCircle: {
                Intent intent = new Intent(DashboardActivity.this, IconActivity.class);
                startActivity(intent);
                break;
            }
            case R.id.btnIconLoadingIdFirebase: {
                Intent intent = new Intent(DashboardActivity.this, SpinActivity.class);
                startActivity(intent);
                break;
            }
            case R.id.btnRecycleView: {
                Intent intent = new Intent(DashboardActivity.this, ListUserActivity.class);
                startActivity(intent);
                break;
            }
        }
    }
}
