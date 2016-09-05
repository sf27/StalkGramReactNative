/**
 * Created by elio on 9/2/16.
 */
import {Clipboard} from "react-native";
import FileUtils from "./native_modules/FileUtils";
import {MainController} from "./MainController";

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
            this.setComponentState({url: url});
            this.mainController.fetchHtml(url);
        };
        Clipboard.getString().then(success);
    };
    onShare = () => FileUtils.shareFile(this.component.state.filePath);
    onSetAs = () => FileUtils.setImageAs(this.component.state.filePath);

    /**
     * Decorator method used to change the component state
     */
    setComponentState = (state) => this.component.setState(state);
    /**
     * Methods used to access the component states
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