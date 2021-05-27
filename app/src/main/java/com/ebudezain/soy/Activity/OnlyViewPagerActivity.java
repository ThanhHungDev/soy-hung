package com.ebudezain.soy.Activity;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentStatePagerAdapter;
import androidx.viewpager.widget.ViewPager;

import com.ebudezain.soy.R;
import com.ebudezain.soy.adapters.MypageFragmentStateAdapter;

public class OnlyViewPagerActivity extends AppCompatActivity {

    ViewPager vpager = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_only_view_pager);


        vpager = (ViewPager) findViewById(R.id.vPager);
        MypageFragmentStateAdapter mypageFragment = new MypageFragmentStateAdapter(getSupportFragmentManager(), FragmentStatePagerAdapter.BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);
        vpager.setAdapter(mypageFragment);
    }
}
