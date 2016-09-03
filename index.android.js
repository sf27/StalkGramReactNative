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

                {this.mainView.isProgressVisible() &&
                <View
                    style={styles.progress}
                >
                    <Circle
                        showsText={true}
                        progress={this.mainView.getProgress()}
                        size={200}
                        unfilledColor='white'
                        color='#00bcd4'
                    />
                </View>
                }


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
        alignItems: 'center',
        flex: 1,
        padding: 10,
        paddingTop: 20
    },
    title: {
        color: '#fff'
    },
    text: {
        color: '#00bcd4',
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20
    },
    textInput: {
        borderRadius: 7,
        color: '#00bcd4',
        flex: 1,
        marginLeft: 20,
        marginRight: 20
    },
    buttonsContainer: {
        flex: 2,
        flexDirection: 'row',
        padding: 10
    },
    mediaContainer: {
        borderRadius: 7,
        flex: 8,
        height: null,
        margin: 20,
        width: null,
    },
    progress: {
        alignItems: 'center',
        borderRadius: 7,
        flex: 8,
        justifyContent: 'center',
        margin: 20,
    },
    buttons: {
        borderRadius: 7,
        flex: 1,
        height: 10,
        marginLeft: 10,
        marginRight: 10,
    }
});

AppRegistry.registerComponent('MainComponent', () => MainComponent);
