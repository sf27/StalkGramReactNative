/**
 * Created by elio on 9/6/16.
 */
import I18n from "react-native-i18n";

export default loadTranslations = () => {
    I18n.fallbacks = true;

    I18n.translations = {
        en: {
            toolTip: 'Instagram Share URL',
            title: 'Share URL',
            btnSetAsTitle: 'Set as',
            btnShareTitle: 'Share'
        },
        es: {
            toolTip: 'Instagram URL Compartida',
            title: 'URL Compartida',
            btnSetAsTitle: 'Establecer como',
            btnShareTitle: 'Compartir'
        }
    };
};

