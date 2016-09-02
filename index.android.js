/**
 * Stalkgram React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, TextInput, View, Image, Clipboard} from "react-native";
import ActionButton from "react-native-action-button";
import AwesomeButton from "react-native-awesome-button";
import {VideoPlayer} from "./app/components/videoPlayer";
import {MainView} from "./app/MainView";
import {Circle} from "react-native-progress";

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.mainView = new MainView(this);
        this.mainView.initialize();
    }

    onShare = () => this.mainView.onShare();
    onSetAs = () => this.mainView.onSetAs();
    onDownloadFile = () => this.mainView.onDownloadFile();

    render() {
        var mediaComponent;
        if (this.mainView.isImage()) {
            mediaComponent = <Image
                style={styles.mediaContainer}
                source={this.mainView.getFilePath()}
            />;
        } else {
            mediaComponent = <VideoPlayer
                style={styles.mediaContainer}
                uri={this.mainView.getFilePath()}
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
                    value={this.mainView.getUrl()}
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
                                onPress: this.onSetAs,
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
                                onPress: this.onShare,
                                backgroundColor: '#00bcd4',
                            }
                        }}
                    />
                </View>
                <View
                    style={styles.progress}
                >
                    {this.mainView.isProgressVisible() &&
                    <Circle
                        showsText={true}
                        progress={this.mainView.getProgress()}
                        size={300}
                    />
                    }
                </View>

                {!this.mainView.isProgressVisible() &&
                mediaComponent
                }

                <ActionButton
                    buttonColor='#00bcd4'
                    onPress={this.onDownloadFile}
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
        flex: 8,
        margin: 20,
        borderRadius: 7,
        width: null,
        height: null,
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

AppRegistry.registerComponent('StalkgramProject', () => {
    return MainComponent;
});
