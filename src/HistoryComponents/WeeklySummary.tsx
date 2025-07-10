import { ListGroup } from "react-bootstrap"
import { useEffect, useState } from "react";
import type { MuscleGroup } from "../Routes/WorkoutHistory";

type WeeklySummaryProps = {
    muscleGroups: MuscleGroup[];
    onlyShowMuscle: string | undefined;
}

const formatMuscleGroupTitle = (muscleGroupTitle: string) => {
    if (muscleGroupTitle.length == 0) return;
    if (muscleGroupTitle.length == 1) return muscleGroupTitle.toLocaleUpperCase();
  
    const words = muscleGroupTitle.split('_');
    const capitalisedWords = words.map(w => {
      if (w.length == 0) return "";
      if (w.length == 1) return w.toLocaleUpperCase();
  
      const firstLetter = w.charAt(0);
      return firstLetter.toLocaleUpperCase() + w.substring(1);
    });
    
    return capitalisedWords.join(' ');
}

const WeeklySummary = ({muscleGroups, onlyShowMuscle} : WeeklySummaryProps) => {
    const [filteredMuscleGroups, setFilteredMuscleGroups] = useState<MuscleGroup[]>(muscleGroups);

    useEffect(() => {
        if (onlyShowMuscle) {
            const muscleGroupsToShow = muscleGroups.filter(mg => mg.muscleGroupRegion == onlyShowMuscle);
            setFilteredMuscleGroups(muscleGroupsToShow);
            return;
        }

        setFilteredMuscleGroups(muscleGroups);
    }, [onlyShowMuscle])

    return (
        <ListGroup as="ol" numbered style={{backgroundColor: "red"}}>
            {muscleGroups.length > 0 
            && filteredMuscleGroups.map(muscle => (
                <ListGroup.Item as="li" className="pb-1 rounded-0" style={{fontSize: "0.9rem"}}> 
                {formatMuscleGroupTitle(muscle.muscleGroup)}
                    <div className="ps-4 pt-2" style={{fontSize: "0.8rem"}}>
                    <span>{muscle.calculatedSets} calculated sets </span>
                    | <span>{muscle.primarySets} primary sets </span>
                    | <span>{muscle.secondarySets} secondary sets</span>
                    </div>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}

export default WeeklySummary;