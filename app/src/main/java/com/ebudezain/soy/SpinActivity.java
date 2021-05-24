package com.ebudezain.soy;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import com.github.ybq.android.spinkit.SpinKitView;

public class SpinActivity extends AppCompatActivity {

    public static final String TAG = SpinActivity.class.getSimpleName();

    SpinKitView spin = null;
    Button btnShowSpin = null;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_spin);

        spin = ( SpinKitView ) findViewById(R.id.spin_kit );
        btnShowSpin = ( Button ) findViewById(R.id.btnLoadSpin);
        btnShowSpin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int visibility = spin.getVisibility();
                int gone = View.GONE;
                Log.d(TAG, "onClick: " + visibility + " - " + gone + " - " + View.INVISIBLE + View.GONE);
                if( visibility == gone ){
                    /// show
                    spin.setVisibility(View.VISIBLE);
                }else{
                    /// hide
                    spin.setVisibility(View.GONE);
                }
            }
        });
    }
}
