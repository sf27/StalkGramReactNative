/**
 * Created by elio on 9/3/16.
 */
import {StyleSheet, Clipboard} from "react-native";

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
        flex: 1.2,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 10,
        paddingRight: 10
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

export default styles;