/**
 * Created by elio on 9/2/16.
 */
import {Clipboard} from "react-native";
import FileUtils from "./native_modules/FileUtils";
import {MainController} from "./MainController";
import ToastAndroid from "./native_modules/ToastAndroid";

export class MainView {
    constructor(component) {
        this.component = component;
        this.mainController = new MainController(this);
    }

    initialize() {
        this.component.state = {
            url: '',
            filePath: '',
            progress: 0,
            isProgressVisible: false,
            isImage: true,
            defaultUrlImage: require('./assets/images/default-image.png')
        };
    }

    /**
     * On click methods
     */
    onDownloadFile = () => {
        this.setComponentState({url: ''});
        let success = url => {
            if (url.toString().indexOf("https://www.instagram.com/") === -1) {
                this.setComponentState({url: '', filePath: '', isImage: true});
                ToastAndroid.show('Please paste a valid Instagram URL', ToastAndroid.SHORT);
                return;
            }
            this.setComponentState({url: url});
            this.mainController.fetchHtml(url);
        };
        Clipboard.getString().then(success);
    };
    onShare = () => FileUtils.shareFile(this.component.state.filePath);
    onSetAs = () => FileUtils.setImageAs(this.component.state.filePath);

    /**
     * Decorator method used to change the component states
     */
    setComponentState = (state) => this.component.setState(state);
    /**
     * Decorator Methods used to access the component states
     */
    isImage = () => this.component.state.isImage;
    isProgressVisible = () => this.component.state.isProgressVisible;
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