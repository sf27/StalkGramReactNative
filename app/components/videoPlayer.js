/**
 * Created by elio on 9/1/16.
 */
'use strict';

import React, {Component} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import Video from "react-native-video";

export class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.state = {
            rate: 1,
            volume: 1.5,
            muted: false,
            resizeMode: 'cover',
            duration: 0.0,
            currentTime: 0.0,
        };
    }

    onLoad(data) {
        this.setState({duration: data.duration});
    }

    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }

    getCurrentTimePercentage() {
        if (this.state.currentTime > 0) {
            return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
        } else {
            return 0;
        }
    }

    render() {
        const flexCompleted = this.getCurrentTimePercentage() * 100;
        const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
        var {style, uri} = this.props;
        console.log("uri: ", uri);
        return (
            <View style={style}>
                <TouchableOpacity style={styles.fullScreen}
                                  onPress={() => {
                                      this.setState({paused: !this.state.paused})
                                  }}
                >
                    <Video source={{uri: uri}}
                           style={styles.fullScreen}
                           rate={this.state.rate}
                           paused={this.state.paused}
                           volume={this.state.volume}
                           muted={this.state.muted}
                           resizeMode={this.state.resizeMode}
                           onLoad={this.onLoad}
                           onProgress={this.onProgress}
                           onEnd={() => {
                               console.log('Done!')
                           }}
                           repeat={true}/>
                </TouchableOpacity>

                <View style={styles.controls}>
                    <View style={styles.generalControls}>
                        <View style={styles.progress}>
                            <View style={[styles.innerProgressCompleted, {flex: flexCompleted}]}/>
                            <View style={[styles.innerProgressRemaining, {flex: flexRemaining}]}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        // flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    controls: {
        backgroundColor: "transparent",
        borderRadius: 5,
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    progress: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 3,
        overflow: 'hidden',
    },
    innerProgressCompleted: {
        height: 20,
        backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
        height: 20,
        backgroundColor: '#2C2C2C',
    },
    generalControls: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 4,
        overflow: 'hidden',
        paddingBottom: 10,
    },
});