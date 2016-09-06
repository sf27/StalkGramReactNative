/**
 * Created by elio on 9/2/16.
 */
import {Clipboard} from "react-native";
import FileUtils from "./native_modules/FileUtils";
import {MainController} from "./MainController";
import ToastAndroid from "./native_modules/ToastAndroid";
import I18n from "react-native-i18n";

export class MainView {
    constructor(component) {
        this.component = component;
        this.mainController = new MainController(this);
    }

    initialize() {
        this.component.state = this._getDefaultStates();
    }

    _getDefaultStates() {
        return {
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
        this.setComponentState(this._getDefaultStates());
        let success = url => {
            if (url.toString().indexOf("https://www.instagram.com/") === -1) {
                ToastAndroid.show(I18n.t('errorInvalidUrl'), ToastAndroid.SHORT);
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