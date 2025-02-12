import * as Clipboard from 'expo-clipboard';


export const copyToClipboard = async (text) => {
    try {
        await Clipboard.setStringAsync(text);
        return "Copied to clipboard:";
    } catch (error) {
        return "Failed to copy:";
    }
}


export const getTextFromClipboard = () => {
    return Clipboard.getStringAsync();
}
