import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from "react-native";

export function HabitsEmpty() {
    const {navigate} = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    return(
        <Text className="text-zinc-400 text-lg">
            There are no habits available for this selected day. {' '}

            <Text 
                className="text-violet-400 text-xl underline active:text-violet-500"
                onPress={() => navigate('new')}    
            >
                Create a new habit &gt;
            </Text>

        </Text>
    )
}