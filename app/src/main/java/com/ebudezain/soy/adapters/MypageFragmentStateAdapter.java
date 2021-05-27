package com.ebudezain.soy.adapters;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;

import com.ebudezain.soy.Fragment.HomeMypageFragment;
import com.ebudezain.soy.Fragment.MessageMypageFragment;
import com.ebudezain.soy.Fragment.ProfileMypageFragment;

public class MypageFragmentStateAdapter extends FragmentStatePagerAdapter {

    public MypageFragmentStateAdapter(@NonNull FragmentManager fm, int behavior) {
        super(fm, behavior);
    }

    @NonNull
    @Override
    public Fragment getItem(int position) {
        switch (position){

            case 1:{
                return new ProfileMypageFragment();
            }
            case 2:{
                return new MessageMypageFragment();
            }
            default:
                return new HomeMypageFragment();
        }
    }

    @Override
    public int getCount() {
        return 3;
    }
}
