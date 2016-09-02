/**
 * Created by elio on 9/2/16.
 */
import {Clipboard} from "react-native";
import FileUtils from "./native_modules/FileUtils";
import {MainController} from "./MainController";

export class MainView {
    constructor(component) {
        this.component = component;
        this.mainView = new MainController(this);
    }

    initialize() {
        this.component.state = {
            url: '',
            progress: 0,
            progressVisible: false,
            filePath: '',
            isImage: true,
            isVideo: false,
            defaultUrlImage: require('./app/images/logo_og.png')
        };
    }

    onDownloadFile = () => {
        let success = url => {
            this.setComponentState({url: url});
            this.mainView.fetchHtml(url);
        };
        Clipboard.getString().then(success);
    };
    onShare = () => FileUtils.shareFile(this.component.state.filePath);
    onSetAs = () => FileUtils.setImageAs(this.component.state.filePath);

    /**
     *
     *
     */
    setComponentState = (state) => this.component.setState(state);

    isImage = () => this.component.state.isImage;
    isProgressVisible = () => this.component.state.progressVisible;
    getProgress = () => this.component.state.progress;
    getUrl = () => this.component.state.url;
    getFilePath = () => {
        if (this.isImage()) {
            return this.component.state.filePath ? {uri: 'file://' + this.component.state.filePath} : this.component.state.defaultUrlImage;
        } else {
            return 'file://' + this.component.state.filePath;
        }
    }
}