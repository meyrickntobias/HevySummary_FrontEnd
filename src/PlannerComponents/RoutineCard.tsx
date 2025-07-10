import { Card, CloseButton } from "react-bootstrap";
import type { Routine } from "../Routes/PlanRoutine";

type RoutineCardProps = {
    routine: Routine;
    removeFromRoutines: (routine: Routine) => void;
}

const RoutineCard = ({routine, removeFromRoutines}: RoutineCardProps) => {
    return (
        <Card className="mb-3 rounded-0">
            <CloseButton 
                onClick={() => removeFromRoutines(routine)}
                style={{position: "absolute", top: "5px", right: "5px"}} />
            <Card.Body>
                <p>{routine.title}</p>
                <ul>
                    {routine.exercises.map(exercise => (
                        <li>{exercise.title} - {exercise.sets.filter(e => e.type != "warmup").length} sets</li>
                    ))}
                </ul>
            </Card.Body>
        </Card>
        
    )
}

export default RoutineCard;