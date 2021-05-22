package com.ebudezain.soy;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class DashboardActivity extends AppCompatActivity {

    public static final String TAG = DashboardActivity.class.getSimpleName();

    /* REQUEST_CODE là một giá trị int dùng để định danh mỗi request.
    Khi nhận được kết quả, hàm callback sẽ trả về cùng REQUEST_CODE này để ta có thể xác định và xử lý kết quả. */
    private static final int REQUEST_CODE_ICON = 123;

    CardView btnIconLoadingImgCircle = null;
    CardView btnIconLoadingIdFirebase = null;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);

        initView();
        initEvent();
    }

    private void initView(){
        btnIconLoadingImgCircle = (CardView) findViewById(R.id.btnIconLoadingImgCircle);
        btnIconLoadingIdFirebase = (CardView) findViewById(R.id.btnIconLoadingIdFirebase);
    }
    private void initEvent(){
        btnIconLoadingImgCircle.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                Intent intent = new Intent(DashboardActivity.this, IconActivity.class);
                startActivity(intent);
//                startActivityForResult(intent, REQUEST_CODE_ICON);
            }
        });

        btnIconLoadingIdFirebase.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(DashboardActivity.this, IconActivity.class);
                startActivity(intent);
//                startActivityForResult(intent, REQUEST_CODE_ICON);
            }
        });
    }
}
