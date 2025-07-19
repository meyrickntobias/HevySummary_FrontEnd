import { Button, Form, FormLabel, Stack } from "react-bootstrap";
import type { ExerciseTemplate } from "../Api/FetchExercises"
import { WorkoutActionType, type DayOfWeek, type SavedWorkoutAction } from "../Reducers/SavedWorkoutPlanReducer";
import { useRef } from "react";

type AddExerciseFormProps = {
    exercise: ExerciseTemplate;
    currentDay: DayOfWeek;
    savedWorkoutDispatch: React.ActionDispatch<[action: SavedWorkoutAction]>
}

const AddExerciseForm = ({exercise, currentDay, savedWorkoutDispatch}: AddExerciseFormProps) => {
    const setsInputRef = useRef<HTMLInputElement>(null);

    const clickAddExerciseHandler = (sets: string | undefined) => {
        if (!sets) {
            return;
        }
        console.log(sets);

        savedWorkoutDispatch(
            { 
                type: WorkoutActionType.ADD_EXERCISE, 
                payload: {
                    day: currentDay,
                    item: {
                        id: crypto.randomUUID(),
                        title: exercise.title,
                        sets: parseInt(sets),
                        primaryMuscleGroup: exercise.primaryMuscleGroup,
                        secondaryMuscleGroups: exercise.secondaryMuscleGroups
                    }
                }
            }
        );
    }

    return (
        <Form>
            <Stack direction="horizontal" gap={2}>
                <Form.Control 
                    type="number"
                    min={1}
                    max={20}
                    defaultValue={3}
                    ref={setsInputRef}
                    onKeyDown={(e) => e.preventDefault()}
                />
                <Button variant="outline-primary" style={{minWidth: "200px"}} onClick={() => clickAddExerciseHandler(setsInputRef.current?.value)}>
                    Add To {currentDay}
                </Button>
            </Stack>
            <FormLabel style={{fontWeight: "100"}}>
                sets
            </FormLabel>
        </Form>
    )
}

export default AddExerciseForm;