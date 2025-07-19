import { CloseButton, Form, Stack } from "react-bootstrap";
import type { Exercise } from "../Reducers/SavedWorkoutPlanReducer";
import { useRef } from "react";

type ExerciseCardProps = {
    exercise: Exercise;
    removeFromExercises: (exerciseId: string) => void;
    updateSets: (title: string, updatedSets: number) => void;
}

const ExerciseRow = ({exercise, removeFromExercises, updateSets}: ExerciseCardProps) => {
    const setsInputRef = useRef<HTMLInputElement>(null);

    return (
        <tr className="mb-3 rounded-0" style={{lineHeight: "34px"}}>
            <td className="border-0 ps-3">{exercise.title}</td> 
            <td style={{textAlign: "center"}}>
                <Stack direction="horizontal">
                    <Form.Control 
                        type="number"
                        min={1}
                        max={20}
                        defaultValue={exercise.sets}
                        className="me-2"
                        onKeyDown={(e) => e.preventDefault()}
                        onChange={() => updateSets(exercise.title, parseInt(setsInputRef.current?.value ?? "0"))}
                        ref={setsInputRef}
                    />
                    <span>
                        sets
                    </span>
                </Stack>
                
                
            </td>
            <td style={{textAlign: "right"}} className="border-0">
                <CloseButton style={{fontSize: "0.7rem"}} onClick={() => removeFromExercises(exercise.id)}/>
            </td>
        </tr>
    )
}

export default ExerciseRow;