/**
 * Created by elio on 9/2/16.
 */

import RNFS from "react-native-fs";
import cheerio from "cheerio";
import {Clipboard} from "react-native";
import ToastAndroid from "./native_modules/ToastAndroid";
import I18n from "react-native-i18n";

export class MainController {
    constructor(view) {
        this.mainView = view;
    }

    getParseUrl(responseText) {
        /*
         Function used to get the url from the html response
         */
        let $ = cheerio.load(responseText);
        let videoUrl = $('meta[property="og:video"]').attr('content');
        let imageUrl = $('meta[property="og:image"]').attr('content');
        if (videoUrl) {
            this.mainView.setComponentState({isImage: false});
            return videoUrl;
        } else if (imageUrl) {
            this.mainView.setComponentState({isImage: true});
            return imageUrl;
        } else {
            return null;
        }
    }

    generateFilePath() {
        let filePath;
        let unixTime = new Date().getTime();
        if (this.mainView.isImage()) {
            filePath = `${RNFS.ExternalStorageDirectoryPath}/${unixTime}.jpg`;
        } else {
            filePath = `${RNFS.ExternalStorageDirectoryPath}/${unixTime}.mp4`;
        }
        return filePath;
    }

    downloadMedia(responseText) {
        let mediaUrl = this.getParseUrl(responseText);
        if (!mediaUrl) {
            ToastAndroid.show(I18n.t('errorDownload'), ToastAndroid.SHORT);
            return;
        }

        let filePath = this.generateFilePath();
        var uploadProgress = (response) => {
            var progress = (response.bytesWritten / response.contentLength);
            this.mainView.setComponentState({
                progress: progress, isProgressVisible: true
            });
        };

        let config = {
            fromUrl: mediaUrl,
            toFile: filePath,
            progress: uploadProgress
        };

        let successFn = result => {
            this.mainView.setComponentState({progress: 0, isProgressVisible: false, filePath});
            ToastAndroid.show(I18n.t('successDownload'), ToastAndroid.SHORT);
            return true;
        };

        let errorFn = err => {
            this.mainView.setComponentState({progress: 0, isProgressVisible: false, filePath: ''});
            console.warn(err);
            return false;
        };

        RNFS.downloadFile(config).promise.then(successFn).catch(errorFn);
    }

    fetchHtml(url) {
        let successResponseTextFn = response => response.text();
        let successResponseFn = responseText => this.downloadMedia(responseText);
        let errorFn = error => console.warn(error);

        return fetch(url).then(successResponseTextFn).then(successResponseFn).catch(errorFn);
    }
}