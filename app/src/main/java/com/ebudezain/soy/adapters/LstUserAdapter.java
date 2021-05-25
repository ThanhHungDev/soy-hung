package com.ebudezain.soy.adapters;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.ebudezain.soy.R;
import com.ebudezain.soy.config.constant;
import com.ebudezain.soy.models.User;

import java.util.List;

public class LstUserAdapter extends RecyclerView.Adapter<LstUserAdapter.UserViewHolder> {

    private Context mContext;
    private List<User> mLstUser;

    public LstUserAdapter(Context mContext) {
        this.mContext = mContext;

    }

    public void setLstUser(List<User> user){
        this.mLstUser = user;
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public UserViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_user, parent, false);
        return new UserViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull UserViewHolder holder, int position) {

        /// giống như view holder có dùng dạng như 1 cái interface để bind dữ liệu ra cái đối tượng cha
        /// mục đích là để đối tượng cha có thể thao tác với child qua 1 function
        /// tại đối tượng cha có thể lấy được dữ liệu và bind dữ liệu vào con
        User user = this.mLstUser.get(position);
        if( user == null ){
            /// dữ liệu không có
            return;
        }
        Log.d("hung", "onBindViewHolder: " + user.getEmail());
        //// nếu có thì bind dữ liệu như sau
        String domain = constant.API_BASE_URL;
        if(!user.getAvatar().equals("")){

        }else{
            String urlAvatar = domain + user.getAvatar();
        }
        String urlAvatar = domain + user.getAvatar();
        Glide.with(this.mContext)
                .load(urlAvatar)
                .into(holder.itemAvatarUser);
        holder.itemName.setText(user.getName());
        String strGender = "";
        if(user.getGender() == constant.GENDER_FEMALE){
            strGender += " giới tính là nữ - lớn lên làm mụ dạ xoa";
        }else{
            strGender += " giới tính là nữ - lớn lên làm hot boy giống hùng đẹp trai khoai to";
        }
        holder.itemEmail.setText(user.getEmail() + strGender );
    }

    @Override
    public int getItemCount() {

        if(this.mLstUser != null){
            return this.mLstUser.size();
        }
        return 0;
    }

    public class UserViewHolder extends RecyclerView.ViewHolder{

        private ImageView itemAvatarUser = null;
        private TextView itemName = null;
        private TextView itemEmail = null;

        public UserViewHolder(@NonNull View itemView) {
            super(itemView);
            /// ánh xạ view
            itemAvatarUser  = (ImageView) itemView.findViewById(R.id.itemAvatarUser);
            itemName        = (TextView) itemView.findViewById(R.id.itemName);
            itemEmail       = (TextView) itemView.findViewById(R.id.itemEmail);
        }
    }
}
