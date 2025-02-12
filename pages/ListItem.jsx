import React, { useState, useCo } from 'react';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { copyToClipboard } from '../utils/Clipboard';


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
                    <View style={styles.titleContainer}>
                        <Text
                            onLongPress={() => copyToClipboard(item.title)}
                            style={styles.title}
                        >
                            {item.title}
                        </Text>
                    </View>
                    <View>
                        <View style={styles.iconContainer}>
                            <TouchableOpacity onPress={() => copyToClipboard(item.body)}>
                                <Ionicons name="copy" size={24} color="#B99C8D" style={{ paddingHorizontal: 10 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onEdit(item)}>
                                <Ionicons name="create" size={24} color="blue" style={{ paddingHorizontal: 10 }} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onRemove(item.id)}>
                                <Ionicons name="trash" size={24} color="red" style={{ paddingHorizontal: 10 }} />
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={styles.text}
                            numberOfLines={isExpanded ? undefined : 5}
                            selectable={true}
                            onTextLayout={(e) => {
                                setShowMoreButton(e.nativeEvent.lines.length > 5)
                            }
                            }
                        >
                            {item.body}
                        </Text>
                        {showMoreButton && (
                            <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                                <Text style={styles.showMore}>
                                    {isExpanded ? "Show less" : "Show more"}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </ReanimatedSwipeable>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        backgroundColor: 'white',
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
    titleContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#f8f8f8',
        padding: 10,
        borderBottomLeftRadius: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        letterSpacing: 0.5,
        textAlign: 'center',
    },
    text: {
        fontSize: 17,
        lineHeight: 24,
        letterSpacing: 0.3,
        color: '#555',
        textAlign: 'justify',
        paddingHorizontal: 10,
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
        fontSize: 16,
        color: "#007BFF",
        fontWeight: "bold",
        textAlign: "right",
        marginRight: 10,
        marginBottom: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: 20,
    },
});

export default ListItem;