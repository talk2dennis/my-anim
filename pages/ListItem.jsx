import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ListItem = ({ item, onRemove }) => {

    // render right swipe action
        const renderRightAction = () => {
            return (
                <>
                    <TouchableOpacity
                        style={styles.rightAction}
                        onPress={() => onRemove(item.id)}
                    >
                        <Text style={styles.actionText}>Delete</Text>
                    </TouchableOpacity>
                </>
            )
        };

    return (
        <ReanimatedSwipeable
            friction={2}
            rightThreshold={40}
            onSwipeableRightOpen={() => onRemove(item.id)}
            renderRightActions={renderRightAction}
        >
            <View style={styles.itemContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.text}>{item.body}</Text>
            </View>
        </ReanimatedSwipeable>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: 'white',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 8,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
    },
    rightAction: {
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: '87%',
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
    },
    buttonContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    btn: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ListItem;