import { ListGroup, Table } from "react-bootstrap"
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
        <>
            <Table bordered className="m-0 p-0">
                <colgroup>
                    <col style={{ width: "50px" }} />
                    <col style={{ width: "auto" }} />
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: 'auto' }} />
                    <col style={{ width: 'auto' }} />
                </colgroup>
                <thead>
                    <tr style={{borderBottom: "2px solid rgb(230,230,230)"}}>
                        <th>#</th>
                        <th>Muscle</th>
                        <th>Sets</th>
                        <th>Primary Sets</th>
                        <th>Secondary Sets</th>
                    </tr>
                </thead>
                <tbody>
                    {muscleGroups.length > 0 
                    && filteredMuscleGroups.map((muscle, i) => (
                        <tr>
                            <td>{i+1}.</td>
                            <td>{formatMuscleGroupTitle(muscle.muscleGroup)}</td>
                            <td><b>{muscle.calculatedSets}</b></td>
                            <td>{muscle.primarySets}</td>
                            <td>{muscle.secondarySets}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        
            <ListGroup as="ol" numbered>
                
            </ListGroup>
        </>
    )
}

export default WeeklySummary;