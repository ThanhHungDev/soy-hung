package com.ebudezain.soy.Activity;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.annotation.SuppressLint;
import android.os.Bundle;

import com.ebudezain.soy.Fragment.HomeMypageFragment;
import com.ebudezain.soy.Fragment.QuestionGameFragment;
import com.ebudezain.soy.R;

public class FragmentActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_fragment);

        FragmentManager fragmentManager = getSupportFragmentManager();
        FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
        QuestionGameFragment questionGame = new QuestionGameFragment();
        fragmentTransaction.add( R.id.layoutContainFragment ,questionGame);
        fragmentTransaction.commit();
    }
}
