import React, { useState, useCo } from 'react';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";


const ListItem = ({ item, onRemove, onEdit, isExpanded, toggleExpand }) => {
    const [showMoreButton, setShowMoreButton] = useState(false);

    // render left swipe action
    // const renderLeftAction = () => {
    //     return (
    //         <>
    //             <TouchableOpacity
    //                 style={styles.leftAction}
    //                 onPress={() => onRemove(item.id)}
    //             >
    //                 <Text style={styles.actionText}>Edit</Text>
    //             </TouchableOpacity>
    //         </>
    //     )
    // };

    // render right swipe action
    const renderRightAction = () => {
        return (
            <>
                <TouchableOpacity
                    style={styles.leftAction}
                    onPress={() => onEdit(item)}
                >
                    <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
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
            // leftThreshold={40}
            onSwipeableRightOpen={() => onRemove(item.id)}
            renderRightActions={renderRightAction}
        // renderLeftActions={renderLeftAction}
        // onSwipeableLeftOpen={() => onEdit(item)}
        >
            <TouchableWithoutFeedback onPress={() => toggleExpand(item.id)}>
                <View style={styles.itemContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}
                        numberOfLines={isExpanded ? undefined : 4}
                        onTextLayout={(e) => {
                            setShowMoreButton(e.nativeEvent.lines.length > 4)
                        }
                        }
                    >
                        {item.body}
                    </Text>
                    {/* show more line if more than 4 lines */}
                    {showMoreButton && (
                        <Text
                            onPress={() => toggleExpand(item.id)}
                            style={[styles.text, styles.showMore]}
                        >
                            {isExpanded ? 'Show less' : 'Show more'}
                        </Text>
                    )}
                </View>
            </TouchableWithoutFeedback>
        </ReanimatedSwipeable>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
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
        minHeight: 120,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 16,
    },
    rightAction: {
        marginVertical: 10,
        marginHorizontal: 5,
        borderRadius: 10,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
    },
    leftAction: {
        marginVertical: 10,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
    },
    actionText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 18,
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
    showMore: {
        color: 'blue',
        marginTop: 10,
        textAlign: 'right',
    },
});

export default ListItem;