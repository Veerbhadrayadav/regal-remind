import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import colors from '../misc/colors';
import { LineChart } from "react-native-chart-kit";
import RoundIconBtn from './RoundIconBtn';
import BoxIconBtn from './BoxIconBtn';
import EditTask from '../screens/EditTask';

const TaskDetail = (props) => {
    const { item } = props.route.params;
    const [tasks, setTasks] = useState([]);
    const [editScreenVisible, setEditSreenVisible] = useState(false);
    const [detail, setDetail] = useState({});

    const width = Dimensions.get('window').width;
    const detailsArray = Object.entries(item.details).map(([date, data]) => ({ date, ...data }));

    const handleOnDone = (date, timespent, info) => {
        setDetail({
            [date]: {
                'timespent': timespent,
                'info': info
            }
        })
    };

    return (
        <>
            <FlatList
                data={detailsArray}
                keyExtractor={(item) => item.date}
                ListHeaderComponent={() => (
                    <View style={{ maxHeight: 1200 }}>
                        <View style={styles.topBoxStyle}>
                            <Text style={{ color: colors.DARK, fontSize: 20, fontWeight: 'bold' }}> {item.title} </Text>
                            <Text style={{ color: colors.DARK, }}> {item.desc} </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={styles.streakBoxStyle}>
                                <RoundIconBtn iconname='local-fire-department' size={30} style={{}} />
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.LIGHT, marginLeft: -10 }}> {item.currentStreak} </Text>
                            </View>
                            <View style={styles.streakBoxStyle}>
                                <RoundIconBtn iconname='local-fire-department' size={30} style={{}} />
                                <Text style={{ fontSize: 25, fontWeight: 'bold', color: colors.LIGHT, marginLeft: -10 }}> {item.maxStreak} </Text>
                            </View>
                            <View style={styles.progressBar} >
                                {
                                    item.progress !== 0 ?
                                        <View style={[styles.progressFillStyle, { width: `${item.progress}%` }]}>
                                            <Text style={styles.progressValueStyle}>{item.progress}%</Text>
                                        </View> :
                                        <Text style={[{ color: colors.LIGHT, fontSize: 20, marginHorizontal: width / 4.5 }]}>{item.progress}%</Text>
                                }


                            </View>
                        </View>
                        <LineChart
                            data={{
                                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                                datasets: [
                                    {
                                        data: [12, 45, 16, 0, 120, 13, 23]
                                    }
                                ]
                            }}
                            width={width - 20} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix=" min"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#e26a00",
                                backgroundGradientFrom: "#fb8c00",
                                backgroundGradientTo: "#ffa726",
                                decimalPlaces: 0, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 1
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "1",
                                    stroke: "#ffa726"
                                }
                            }}
                            style={{
                                marginVertical: 8,
                                marginHorizontal: 10,
                                // borderRadius: 16
                            }}
                        />
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={styles.MenuStyle}>
                        <TouchableOpacity style={[styles.textStyle]} onPress={() => {
                            console.log(item.date)
                        }}>
                            <View style={{ flexDirection: 'row', marginTop: 5, borderBottomWidth: 2, borderBottomColor: colors.DARK, height: 30, padding: 10, width: '95%' }}>
                                <Text style={{ color: colors.DARK, fontSize: 20, position: 'absolute', left: 0 }}>{item.date}</Text>
                                <Text style={{ color: colors.DARK, fontSize: 20, position: 'absolute', right: 0 }}>{item.time_spent} min</Text>
                            </View>
                            <View style={{ margin: 5 }}>
                                <Text style={{ color: colors.DARK, fontSize: 18 }}>{item.info}...</Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                )}
            />
            <View style={{ flexDirection: 'row', padding: 10, position: 'absolute', bottom: 0, alignSelf: 'center' }}>
                <BoxIconBtn iconname='edit' size={30} title='Edit' onPress={() => setEditSreenVisible(true)} style={styles.btnStyle} />
                <BoxIconBtn iconname='delete' size={30} title='Delete' onPress={() => onDelete} style={styles.btnStyle} />
            </View>
            <EditTask
                item={item}
                visible={editScreenVisible}
                onCancel={() => setEditSreenVisible(false)}
                onDone={(date, timespent, info) => handleOnDone(date, timespent, info)}
            />
        </>
    );
};

const styles = StyleSheet.create({
    topBoxStyle: {
        padding: 15,
        marginTop: 50,
        backgroundColor: colors.LIGHT,
        elevation: 4,
        marginHorizontal: 10,
        borderRadius: 15,
    },
    streakBoxStyle: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        width: '15%',
        borderColor: colors.LIGHT,
        borderBottomWidth: 2,
    },
    progressBar: {
        width: '54%',
        borderColor: colors.LIGHT,
        borderWidth: 4,
        borderRadius: 25,
        margin: 10,
        overflow: 'hidden',
    },
    progressValueStyle: {
        fontSize: 20,
        color: colors.DARK,
    },
    progressFillStyle: {
        backgroundColor: colors.LIGHT,
        alignItems: 'center',
        // borderColor: colors.LIGHT,
        // borderWidth: 3,

    },
    MenuStyle: {
        // height:150,
        width: Dimensions.get("window").width - 20,
        // padding:15,
        margin: 10,
        elevation: 4,
        backgroundColor: colors.LIGHT,
        borderRadius: 5,
        zIndex: -1
    },
    textStyle: {
        maxHeight: 150,
        paddingLeft: 10,
        width: '100%',
        alignSelf: 'center',
        // justifyContent: 'center',
    },
    btnStyle: {
        width: 100,
        backgroundColor: colors.LIGHT,
        padding: 10,
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 5,
        marginHorizontal: 40
    }
});

export default TaskDetail;