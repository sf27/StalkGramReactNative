package com.awesomeproject.modules;

import android.widget.Toast;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;

import java.io.File;


/**
 * Created by elio on 8/5/16.
 */
public class FileUtils extends ReactContextBaseJavaModule {

    public FileUtils(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "FileUtils";
    }

    @Override
    public boolean canOverrideExistingModule() {
        return true;
    }

    @ReactMethod
    public void shareFile(String filePath) {
        Intent shareIntent = new Intent(Intent.ACTION_SEND);
        shareIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        File file = new File(filePath);
        Uri imageUri = Uri.fromFile(file);

        shareIntent.setData(imageUri);
        String extension = android.webkit.MimeTypeMap.getFileExtensionFromUrl(
                Uri.fromFile(file).toString()
        );
        String mimetype = android.webkit.MimeTypeMap.getSingleton().getMimeTypeFromExtension(
                extension
        );
        shareIntent.setType(mimetype);
        shareIntent.putExtra(Intent.EXTRA_STREAM, imageUri);
        getCurrentActivity().startActivity(Intent.createChooser(shareIntent, "Share the file"));
    }

    @ReactMethod
    public void setImageAs(String filePath) {
        Intent setAsIntent = new Intent(Intent.ACTION_ATTACH_DATA);
        setAsIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        File file = new File(filePath);
        Uri imageUri = Uri.fromFile(file);

        String extension = android.webkit.MimeTypeMap.getFileExtensionFromUrl(
                Uri.fromFile(file).toString()
        );
        String mimetype = android.webkit.MimeTypeMap.getSingleton().getMimeTypeFromExtension(
                extension
        );

        setAsIntent.setDataAndType(imageUri, mimetype);
        setAsIntent.putExtra("mimeType", mimetype);
        setAsIntent.putExtra(Intent.EXTRA_STREAM, imageUri);
        setAsIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
        getCurrentActivity().startActivity(Intent.createChooser(setAsIntent, "Set the image as profile"));
    }
}
