import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { FlatList, HStack, Heading, Text, VStack, useToast } from 'native-base'

import { api } from '@services/api'
import { AppNavigatorRoutesProps } from '@routes/app.routes'
import { AppError } from '@utils/AppError'

import { ExerciseCard } from '@components/ExerciseCard'
import { Group } from '@components/Group'
import { HomeHeader } from '@components/HomeHeader'

export function Home() {
  const [groups, setGroups] = useState<string[]>([])
  const [exercises, setExercises] = useState<string[]>(['One arm dumbbell row','Pull-up', 'Pullovers', 'Deadlifts'])
  const [groupSelected, setGroupSelected] = useState('back')

  const navigation = useNavigation<AppNavigatorRoutesProps>()
  const toast = useToast()

  async function fetchGroups() {
    try {
      const { data } = await api.get('/groups')
      setGroups(data)
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Unable to loade muscle groups'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  function handleOpenExerciseDetails() {
    navigation.navigate('exercise')
  }

  useEffect(() => {
    fetchGroups()
  }, [])

  return (
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={groupSelected.toUpperCase() === item.toUpperCase()}
            onPress={() => setGroupSelected(item)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        minH={10}
        maxH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={5}>
          <Heading color="gray.200" fontSize="md" fontFamily="heading">Exercises</Heading>
          <Text color="gray.200" fontSize="sm">{exercises.length}</Text>
        </HStack>

        <FlatList
          data={exercises}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <ExerciseCard 
              onPress={handleOpenExerciseDetails}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}