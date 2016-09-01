/**
 * Stalkgram React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, TextInput, View, Image, Clipboard} from "react-native";
import ActionButton from "react-native-action-button";
import AwesomeButton from "react-native-awesome-button";
import ToastAndroid from "./app/native_modules/ToastAndroid";
import FileUtils from "./app/native_modules/FileUtils";
import {VideoPlayer} from "./app/components/videoPlayer";
import {Circle} from "react-native-progress";
import RNFS from "react-native-fs";
import cheerio from "cheerio";

class StalkgramProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            progress: 0,
            progressVisible: false,
            filePath: '',
            isImage: true,
            isVideo: false,
            defaultUrlImage: 'http://facebook.github.io/react/img/logo_og.png'
        };
    }

    share = () => FileUtils.shareFile(this.state.filePath);

    setAs = () => FileUtils.setImageAs(this.state.filePath);

    showProgress = (progress, progressVisible = false) => this.setState({progress, progressVisible});

    setFilePath = filePath => this.setState({filePath});

    setUrl = url => this.setState({url});

    getParseUrl(responseText) {
        /*
         Function used to get the url from the html response
         */
        let $ = cheerio.load(responseText);
        // todo: Fix the problem to detect if the media file is a video or a image
        let metaList = $('meta');
        let metaVideoUrl = metaList[23];
        if (metaVideoUrl) {
            let videoUrl = metaVideoUrl.attribs.content;
            if (videoUrl.toString().indexOf("http://") != -1) {
                this.setState({isImage: false, isVideo: true});
                return videoUrl
            }
        }

        let imageUrl = metaList[10].attribs.content;
        this.setState({isImage: true, isVideo: false});
        return imageUrl;
    }

    downloadMedia(responseText) {
        let mediaUrl = this.getParseUrl(responseText);

        let unix_time = new Date().getTime();
        let filePath;
        if (this.state.isImage) {
            filePath = `${RNFS.ExternalStorageDirectoryPath}/${unix_time}.jpg`;
        } else {
            filePath = `${RNFS.ExternalStorageDirectoryPath}/${unix_time}.mp4`;
        }

        var uploadProgress = (response) => {
            var progress = Math.floor((response.bytesWritten / response.contentLength) * 100);
            this.showProgress(progress, progressVisible = true);
        };

        let config = {
            fromUrl: mediaUrl,
            toFile: filePath,
            progress: uploadProgress
        };

        let successFn = result => {
            this.showProgress(0);
            this.setFilePath(filePath);
            ToastAndroid.show('Download file correctly', ToastAndroid.SHORT);
            return true
        };

        let errorFn = err => {
            this.showProgress(0);
            this.setFilePath('');
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

    downloadFile() {
        let success = url => {
            this.setUrl(url);
            this.fetchHtml(url);
        };
        Clipboard.getString().then(success);
    }

    render() {
        var mediaComponent;
        if (this.state.isImage) {
            mediaComponent = <Image
                style={styles.mediaContainer}
                source={{uri: this.state.filePath ? 'file://' + this.state.filePath : this.state.defaultUrlImage}}
            />;
        } else {
            mediaComponent = <VideoPlayer
                style={styles.mediaContainer}
                uri={'file://' + this.state.filePath}
            />;
        }

        return (
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View
                    backgroundColor='#00bcd4'
                    style={styles.bar}
                >
                    <Text style={styles.title}>StalkGram React-Native</Text>
                </View>
                <Text
                    style={styles.text}
                >
                    Paste the share link here
                </Text>
                <TextInput
                    placeholder="Paste here the link"
                    style={styles.textInput}
                    value={this.state.url}
                />
                <View
                    style={styles.buttonsContainer}
                >
                    <AwesomeButton
                        labelStyle={styles.whiteTitle}
                        backgroundStyle={styles.buttons}
                        transitionDuration={200}
                        states={{
                            idle: {
                                text: 'Set as',
                                onPress: this.setAs.bind(this),
                                backgroundColor: '#00bcd4',
                            }
                        }}
                    />
                    <AwesomeButton
                        labelStyle={styles.whiteTitle}
                        backgroundStyle={styles.buttons}
                        transitionDuration={200}
                        states={{
                            idle: {
                                text: 'Share',
                                onPress: this.share.bind(this),
                                backgroundColor: '#00bcd4',
                            }
                        }}
                    />
                </View>
                <View
                    style={styles.progress}
                >
                    {this.state.progressVisible &&
                    <Circle
                        showsText={true}
                        progress={this.state.progress}
                        size={300}
                    />
                    }
                </View>

                {!this.state.progressVisible &&
                mediaComponent
                }

                <ActionButton
                    buttonColor='#00bcd4'
                    onPress={this.downloadFile.bind(this)}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    whiteTitle: {
        color: 'white'
    },
    bar: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
        paddingTop: 20
    },
    title: {
        color: '#fff'
    },
    text: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        color: '#00bcd4'
    },
    textInput: {
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 7,
        color: '#00bcd4'
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: 'row',
        padding: 10
    },
    mediaContainer: {
        flex: 10,
        margin: 20,
        borderRadius: 7
    },
    progress: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        flex: 1,
        height: 40,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
    }
});

AppRegistry.registerComponent('StalkgramProject', () => StalkgramProject);
