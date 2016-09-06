package com.awesomeproject;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.awesomeproject.modules.StalkgramReactPackage;
import com.rnfs.RNFSPackage;

import java.util.Arrays;
import java.util.List;

import com.facebook.react.modules.network.ReactCookieJarContainer;
import com.facebook.stetho.Stetho;
import okhttp3.OkHttpClient;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.stetho.okhttp3.StethoInterceptor;
import java.util.concurrent.TimeUnit;

import com.brentvatne.react.ReactVideoPackage;

public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
            new ReactNativeI18n(),
                    new RNFSPackage(),
                    new ReactVideoPackage(),
                    new StalkgramReactPackage()
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    public void onCreate() {
          super.onCreate();
          Stetho.initializeWithDefaults(this);
          OkHttpClient client = new OkHttpClient.Builder()
          .connectTimeout(0, TimeUnit.MILLISECONDS)
          .readTimeout(0, TimeUnit.MILLISECONDS)
          .writeTimeout(0, TimeUnit.MILLISECONDS)
          .cookieJar(new ReactCookieJarContainer())
          .addNetworkInterceptor(new StethoInterceptor())
          .build();
          OkHttpClientProvider.replaceOkHttpClient(client);
    }
}
