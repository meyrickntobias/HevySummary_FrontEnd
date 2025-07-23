import { useEffect, useState } from "react";
import MuscleGroupPicker from "../HistoryComponents/MuscleGroupPicker";
import WeeklySummaryAccordion from "../HistoryComponents/WeeklySummaryAccordion";
import useFetch from "../Api/useFetch";
import { Alert, Button, CloseButton } from "react-bootstrap";

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
    const [filteredMuscleRegion, setFilteredMuscleRegion] = useState<string | undefined>();
    const { fetchData, data, loading, error } = useFetch<WeeklyMuscleGroupSummary[]>("http://localhost:5112/muscle-groups");
    const [ showInfoAlert, setShowInfoAlert ] = useState<boolean>(false);

    useEffect(() => {
      fetchData();
    }, [])

    return (
      <>
        {!showInfoAlert && (
          <Button size="sm" variant="outline-info" className="mb-3" onClick={() => setShowInfoAlert(true)}>What is this?</Button>
        )}
        
        <Alert transition={false} className="pe-5" variant="info" show={showInfoAlert}>
          <p>
            The following data is taken from the <a href="https://api.hevyapp.com/docs/">Hevy API</a>, and 
            aggregates sets into muscle groups, divided into weeks (Mon - Sun). Warmup sets are excluded,
            and exercises that have secondary muscle groups will contribute to half a set for the combined/calculated 
            total sets. The split primary/secondary counts are also included. By default, the last 4 weeks (including
            the current week) is included.
          </p>
          <CloseButton 
              onClick={() => setShowInfoAlert(false)}
              style={{position: "absolute", top: "5px", right: "5px"}} 
          />
        </Alert>
        

        <MuscleGroupPicker setFilteredMuscleRegion={setFilteredMuscleRegion} />

        {error ? (
          <Alert variant="danger">There was an error fetching your workout data ): Try refreshing the page.</Alert>
        ) : 
          loading ? (
            <p>Loading...</p>
          ) : (
            <WeeklySummaryAccordion 
              muscleGroupData={data ?? []} 
              onlyShowMuscle={filteredMuscleRegion} />
          )
        }
      </>
    );
}

export default WorkoutHistory;