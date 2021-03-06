package com.ebudezain.soy;

import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.ebudezain.soy.Activity.BotNaviActivity;
import com.ebudezain.soy.Activity.FragmentActivity;
import com.ebudezain.soy.Activity.OnlyViewPagerActivity;

public class DashboardActivity extends AppCompatActivity implements View.OnClickListener {

    public static final String TAG = DashboardActivity.class.getSimpleName();

    /* REQUEST_CODE là một giá trị int dùng để định danh mỗi request.
    Khi nhận được kết quả, hàm callback sẽ trả về cùng REQUEST_CODE này để ta có thể xác định và xử lý kết quả. */
    private static final int REQUEST_CODE_ICON = 123;

    CardView btnIconLoadingImgCircle = null;
    CardView btnIconLoadingIdFirebase = null;
    CardView btnRecycleView = null;
    CardView btnBottomNavi = null;
    CardView btnViewPager = null;
    CardView btnFragmentViewpager = null;
    CardView btnGotoFragment = null;

//    fragmentViewpager

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
        btnBottomNavi = (CardView) findViewById(R.id.btnBottomNavi);
        btnBottomNavi.setOnClickListener(this);
        btnViewPager = (CardView) findViewById(R.id.viewPager);
        btnViewPager.setOnClickListener(this);
        btnFragmentViewpager = (CardView) findViewById(R.id.fragmentViewpager);
        btnFragmentViewpager.setOnClickListener(this);
        btnGotoFragment = (CardView) findViewById(R.id.btnGotoFragment);
        btnGotoFragment.setOnClickListener(this);

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
            case R.id.btnBottomNavi: {
                Intent intent = new Intent(DashboardActivity.this, BottomNaviActivity.class);
                startActivity(intent);
                break;
            }
            case R.id.viewPager: {
                Intent intent = new Intent(DashboardActivity.this, BotNaviActivity.class);
                startActivity(intent);
                break;
            }
            case R.id.fragmentViewpager: {
                Intent intent = new Intent(DashboardActivity.this, OnlyViewPagerActivity.class);
                startActivity(intent);
                break;
            }
            case R.id.btnGotoFragment: {
                Intent intent = new Intent(DashboardActivity.this, FragmentActivity.class);
                startActivity(intent);
                break;
            }
        }
    }
}
