import { useState } from "react";
import { ScrollView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"
import colors from 'tailwindcss/colors';

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";

const availableWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function New() {
    const [weekDays, setWeekDays] = useState<number[]>([]);

    function handleToggleWeekDay(weekDayIndex: number){
        if(weekDays.includes(weekDayIndex)){
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        }else{
            setWeekDays(prevState => [...prevState, weekDayIndex])
        }
    }

    return(
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100}}    
            >
                
                <BackButton />

                <Text className="text-white mt-6 font-extrabold text-3xl">
                    New Habit
                </Text>
                
                <Text className="text-white mt-6 font-semibold text-base">
                    What is your commitment?
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-violet-700"
                    placeholder="Drink Water, Read a book chapter"
                    placeholderTextColor={colors.zinc[500]}
                />

                <Text className="font-semibold mt-4 mb-3 text-white text-base">
                    What is the recurrence?
                </Text>

                {
                    availableWeekDays.map((weekDay, index) => (
                        <Checkbox
                            key={weekDay}
                            title={weekDay}
                            checked={weekDays.includes(index)}
                            onPress={() => handleToggleWeekDay(index)}
                        />
                    ))
                }

                <TouchableOpacity
                    className="flex-row mt-4 h-12 bg-green-700 rounded-lg justify-center items-center"
                    activeOpacity={0.6}
                >
                    <Feather 
                        name='check'
                        size={20}
                        color={colors.white}
                    />

                    <Text
                        className="font-semibold text-base text-white ml-2"
                    >
                        Confirm
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
