import { useState, useEffect } from "react";
import { ScrollView, View, Text, Alert } from "react-native";
import { useRoute } from '@react-navigation/native'
import dayjs from 'dayjs'
import clsx from "clsx";

import { api } from "../lib/axios";
import { generateProgressPercentage } from '../utils/generate-progress-percentage'

import { BackButton } from "../components/BackButton";
import { ProgressBar } from '../components/ProgressBar';
import { Checkbox } from "../components/Checkbox";
import { Loading } from "../components/Loading";
import { HabitsEmpty } from "../components/HabitsEmpty";

interface Params {
    date: string;
}

interface DayInfoProps {
    completedHabits: string[];
    possibleHabits: {
        id: string;
        title: string;
    }[];

}

export function Habit(){
    const [loading, setLoading] = useState(true)
    const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
    const [completedHabits, setCompletedHabits] = useState<string[]>([])

    const route = useRoute();
    const { date } = route.params as Params;

    const parsedDate = dayjs(date);
    const isDateInPast = parsedDate.endOf('day').isBefore(new Date())
    const dayOfWeek = parsedDate.format('dddd')
    const dayAndMonth = parsedDate.format('DD/MMMM')

    const habitsProgress = dayInfo?.possibleHabits.length 
    ? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length) 
    : 0

    async function fetchHabits() {
        try {
            setLoading(true)

            const response = await api.get('/day', { params: { date }})
            setDayInfo(response.data)
            setCompletedHabits(response.data.completedHabits)
        } catch (e) {
            console.log(e)
            Alert.alert('Error','Unable to loading the habits')  
        } finally {
            setLoading(false)
        }
    }

    async function handleToggleHabit(habitId: string){
        try {
            await api.patch(`/habits/${habitId}/toggle`)
            
            if(completedHabits.includes(habitId)){
                setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId))
            } else {
                setCompletedHabits(prevState => [...prevState, habitId])
            }
        } catch (e) {
            console.log(e)
            Alert.alert('Error', 'Unable to update habits information')
        }
    }

    useEffect(() => {
        fetchHabits()
    }, [])

    if(loading) {
        return(
            <Loading />
        )
    }

    console.log(date)
    return(
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 80}}
            >   
            
            <BackButton />

            <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
                {dayOfWeek}
            </Text>
            
            <Text className="text-white font-extrabold text-3xl">
                {dayAndMonth}
            </Text>

            <ProgressBar progress={habitsProgress} />

            <View
                className={clsx("mt-6", {
                    ["opacity-60"]: isDateInPast
                })}>
            {
                dayInfo?.possibleHabits ?
                dayInfo?.possibleHabits.map(habit => (
                    <Checkbox 
                        key={habit.id}
                        title={habit.title}
                        checked={completedHabits.includes(habit.id)}
                        disabled={isDateInPast}
                        onPress={() => handleToggleHabit(habit.id)}
                    />
                ))
                : <HabitsEmpty />
            }    
            </View>
            {
                isDateInPast && (
                    <Text className="text-white mt-10 text-center text-base">
                        You can only update completed habits on today's statistics
                    </Text>
                )
            }
            </ScrollView>
        </View>
    )
}