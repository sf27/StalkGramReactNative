/**
 * Created by elio on 9/2/16.
 */

import RNFS from "react-native-fs";
import cheerio from "cheerio";
import {Clipboard} from "react-native";
import ToastAndroid from "./native_modules/ToastAndroid";

export class MainController {
    constructor(presenter) {
        this.mainView = presenter;
    }

    getParseUrl(responseText) {
        /*
         Function used to get the url from the html response
         */
        const INDEX_IMAGE = 10;
        const INDEX_VIDEO = 23;
        let $ = cheerio.load(responseText);
        let metaList = $('meta');
        let metaVideoUrl = metaList[INDEX_VIDEO];
        if (metaVideoUrl) {
            let videoUrl = metaVideoUrl.attribs.content;
            if (videoUrl.toString().indexOf("http://") != -1) {
                this.mainView.setComponentState({isImage: false, isVideo: true});
                return videoUrl
            }
        }

        let imageUrl = metaList[INDEX_IMAGE].attribs.content;
        this.mainView.setComponentState({isImage: true, isVideo: false});
        return imageUrl;
    }

    generateFilePath() {
        let filePath;
        let unix_time = new Date().getTime();
        if (this.mainView.isImage()) {
            filePath = `${RNFS.ExternalStorageDirectoryPath}/${unix_time}.jpg`;
        } else {
            filePath = `${RNFS.ExternalStorageDirectoryPath}/${unix_time}.mp4`;
        }
        return filePath;
    }

    downloadMedia(responseText) {
        let mediaUrl = this.getParseUrl(responseText);
        let filePath = this.generateFilePath();

        var uploadProgress = (response) => {
            var progress = Math.floor((response.bytesWritten / response.contentLength) * 100);
            this.mainView.setComponentState({progress: progress, progressVisible: true});
        };

        let config = {
            fromUrl: mediaUrl,
            toFile: filePath,
            progress: uploadProgress
        };

        let successFn = result => {
            this.mainView.setComponentState({progress: 0, progressVisible: false});
            this.mainView.setComponentState({filePath: filePath});
            ToastAndroid.show('Download file correctly', ToastAndroid.SHORT);
            return true
        };

        let errorFn = err => {
            this.mainView.setComponentState({progress: 0, progressVisible: false});
            this.mainView.setComponentState({filePath: ''});
            console.warn(err);
            return false
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