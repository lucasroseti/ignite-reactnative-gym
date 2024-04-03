import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Home } from '@screens/Home'
import { Exercise } from '@screens/Exercise'
import { History } from '@screens/History'
import { Profile } from '@screens/Profile'

type AppRoutesProps = {
  home: undefined
  exercise: undefined
  profile: undefined
  history: undefined
}

export type AppNavigatorRoutesProps =BottomTabNavigationProp<AppRoutesProps>

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesProps>()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false
    }}>
      <Screen
        name="home"
        component={Home}
      />

      <Screen
        name="history"
        component={History}
      />

      <Screen
        name="profile"
        component={Profile}
      />

      <Screen
        name="exercise"
        component={Exercise}
      />
    </Navigator>
  )
}