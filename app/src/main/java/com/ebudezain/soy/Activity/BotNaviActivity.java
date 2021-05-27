package com.ebudezain.soy.Activity;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentStatePagerAdapter;
import androidx.viewpager.widget.ViewPager;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;

import com.ebudezain.soy.R;
import com.ebudezain.soy.adapters.MypageFragmentStateAdapter;
import com.google.android.material.bottomnavigation.BottomNavigationView;

public class BotNaviActivity extends AppCompatActivity {

    BottomNavigationView bNaivi = null;
    ViewPager vpager = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bot_navi);
        vpager = (ViewPager) findViewById(R.id.vPager);
        MypageFragmentStateAdapter mypageFragment = new MypageFragmentStateAdapter(getSupportFragmentManager(), FragmentStatePagerAdapter.BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);
        vpager.setAdapter(mypageFragment);

        bNaivi = (BottomNavigationView) findViewById(R.id.botNavi);
        bNaivi.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()){
                    case R.id.itemBotNaviHomeMypage: {
                        vpager.setCurrentItem(0);
                        break;
                    }
                    case R.id.itemBotNaviProfileMypage: {
                        vpager.setCurrentItem(1);
                        break;
                    }
                    case R.id.itemBotNaviMessageMypage: {
                        vpager.setCurrentItem(2);
                        break;
                    }
                    default: {
                        break;
                    }
                }

                return true;
            }
        });
        vpager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {
                Menu menu = bNaivi.getMenu();
                switch (position){

                    case 1: {
                        menu.findItem(R.id.itemBotNaviProfileMypage).setChecked(true );
//                        for (int i = 0, size = menu.size(); i < size; i++) {
//                            MenuItem item = menu.getItem(i);
//                            item.setChecked(item.getItemId() == R.id.itemBotNaviProfileMypage);
//                        }
                        break;
                    }
                    case 2: {
                        menu.findItem(R.id.itemBotNaviMessageMypage).setChecked(true );
//                        for (int i = 0, size = menu.size(); i < size; i++) {
//                            MenuItem item = menu.getItem(i);
//                            item.setChecked(item.getItemId() == R.id.itemBotNaviMessageMypage);
//                        }
                        break;
                    }
                    default:{
                        menu.findItem(R.id.itemBotNaviHomeMypage).setChecked(true );
//                        for (int i = 0, size = menu.size(); i < size; i++) {
//                            MenuItem item = menu.getItem(i);
//                            item.setChecked(item.getItemId() == R.id.itemBotNaviHomeMypage);
//                        }
                        break;
                    }
                }

            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });

    }

}
