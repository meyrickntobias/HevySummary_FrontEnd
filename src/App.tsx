import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import WeeklySummaryAccordion from './WeeklySummaryAccordion';
import MuscleGroupPicker from './MuscleGroupPicker';

type FetchMuscleGroupData = () => Promise<WeeklyMuscleGroupSummary[]>;

export type WeeklyMuscleGroupSummary = {
  startDate: string,
  endDate: string,
  workouts: number,
  muscleGroups: MuscleGroup[]
}

export type MuscleGroup = {
  muscleGroup: string,
  muscleGroupRegion: string,
  calculatedSets: number,
  primarySets: number,
  secondarySets: number
}

const fetchMuscleGroupData: FetchMuscleGroupData = async() => {
  try {
    const response = await fetch("http://localhost:5112/muscle-groups");
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
}

function App() {
  const [muscleGroupData, setMuscleGroupData] = useState<WeeklyMuscleGroupSummary[]>([]);
  const [filteredMuscleRegion, setFilteredMuscleRegion] = useState<string | undefined>();

  useEffect(() => {
    async function fetchData() {
      const response = await fetchMuscleGroupData();
      console.log(response);
      setMuscleGroupData(response);
    }
    fetchData();
  }, [])

  return (
    <Container fluid="md" className="mt-3">
      <h2 className="text-center mb-3 mt-4">Hevy Summary - Sets Per Muscle Group Per Week</h2>
      <p>
        The following data is taken from the <a href="https://api.hevyapp.com/docs/">Hevy API</a>, and 
        aggregates sets into muscle groups, divided into weeks (Mon - Sun). Warmup sets are excluded,
        and exercises that have secondary muscle groups will contribute to half a set for the combined/calculated 
        total sets. The split primary/secondary counts are also included. By default, the last 4 weeks (including
        the current week) is included.
      </p>

      <MuscleGroupPicker setFilteredMuscleRegion={setFilteredMuscleRegion} />

      {muscleGroupData.length > 0 && 
        <WeeklySummaryAccordion 
          muscleGroupData={muscleGroupData} 
          onlyShowMuscle={filteredMuscleRegion} />
      }

    </Container>
  )
}

export default App
