import { useEffect, useState } from "react";
import MuscleGroupPicker from "../HistoryComponents/MuscleGroupPicker";
import WeeklySummaryAccordion from "../HistoryComponents/WeeklySummaryAccordion";
import { fetchMuscleGroupData } from "../Api/FetchMuscleGroupSets";


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

const WorkoutHistory = () => {
    const [muscleGroupData, setMuscleGroupData] = useState<WeeklyMuscleGroupSummary[]>([]);
    const [filteredMuscleRegion, setFilteredMuscleRegion] = useState<string | undefined>();

    useEffect(() => {
        async function fetchData() {
          const response = await fetchMuscleGroupData();
          setMuscleGroupData(response);
        }
        fetchData();
    }, [])

    return (
    <>
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
    </>
    );
}

export default WorkoutHistory;