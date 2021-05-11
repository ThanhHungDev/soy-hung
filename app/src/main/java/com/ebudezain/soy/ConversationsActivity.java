package com.ebudezain.soy;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.ListView;

import java.util.ArrayList;

public class ConversationsActivity extends AppCompatActivity {

    public static final String URI_API = "https://ebudezain.com/api/v1/topics";

    private String names [] = { "hùng", "php", "nodejs" };

    ListView lvConversations;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_conversations);

        lvConversations = (ListView) findViewById(R.id.lvConversations);
        ConversationAdapter apt = new ConversationAdapter(this, this.names);
        lvConversations.setAdapter(apt);
    }
}
