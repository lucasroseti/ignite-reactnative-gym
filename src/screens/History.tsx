import { useState } from 'react'
import { Heading, SectionList, Text, VStack } from 'native-base'

import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryCard } from '@components/HistoryCard'

export function History() {
  const [exercises, setExercises] = useState([
    {
      title: '26.08.22',
      data: ['One arm dumbbell row','Pull-up', ]
    },
    {
      title: '27.08.22',
      data: ['Pull-up', ]
    }
  ])

  return (
    <VStack flex={1}>
      <ScreenHeader title="Exercise history" />

      <SectionList
        sections={exercises}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <HistoryCard />
        )}
        renderSectionHeader={({ section }) => (
          <Heading color="gray.200" fontSize="md" mt={10} mb={3}>
            {section.title}
          </Heading>
        )}
        ListEmptyComponent={() => (
          <Text color="gray.100" textAlign="center">
            There are no registered exercises yet.{'\n'}
            Let's do it today?
          </Text>
        )}
        contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
        px={8}
      />
    </VStack>
  )
}