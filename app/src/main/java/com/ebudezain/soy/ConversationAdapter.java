package com.ebudezain.soy;

import android.app.Activity;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

public class ConversationAdapter extends BaseAdapter {

    private Activity activity;
    private String[] names;

    public ConversationAdapter(Activity activity, String[] names) {

        this.activity = activity;
        this.names = names;
    }

    @Override
    public int getCount() {

        return this.names.length;
    }

    @Override
    public Object getItem(int position) {
        return this.names[position];
    }

    @Override
    public long getItemId(int position) {
        return position;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {

        LayoutInflater inflater = activity.getLayoutInflater();
        convertView = inflater.inflate(R.layout.item_conversation, parent, false );
        TextView tvItemConv = convertView.findViewById(R.id.tvItemConv);
        tvItemConv.setText(this.names[position]);
        return convertView;
    }
}
