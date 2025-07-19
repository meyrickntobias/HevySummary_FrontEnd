import { useRef, useState } from "react";
import { Badge, Button, Card, CloseButton, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { type DayOfWeek, type SavedWorkoutAction } from "../Reducers/SavedWorkoutPlanReducer";
import { fetchExercises, type ExerciseTemplate } from "../Api/FetchExercises";
import AddExerciseForm from "./AddExerciseForm";

type AddExerciseModalProps = {
    isOpen: boolean;
    onHide: () => void;
    currentDay: DayOfWeek;
    savedWorkoutDispatch: React.ActionDispatch<[action: SavedWorkoutAction]>
}

const AddExerciseModal = ({isOpen, onHide, currentDay, savedWorkoutDispatch}: AddExerciseModalProps) => {
    const [exerciseTemplates, setExerciseTemplates] = useState<ExerciseTemplate[]>([]);
    const searchRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const onSearchHandler = async (searchKeyword: string | undefined ) => {
        if (!searchKeyword) return;
        setIsLoading(true);
        const response = await fetchExercises(searchKeyword!);
        setExerciseTemplates(response);
        setIsLoading(false);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearchHandler(searchRef.current?.value);
    }

    return (
        <Modal
            show={isOpen}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4>Exercises</h4>
                <CloseButton 
                    onClick={() => onHide()}
                    style={{position: "absolute", top: "5px", right: "5px"}} 
                />
                <Form onSubmit={handleSubmit}>
                    <Stack direction="horizontal" gap={2}>
                        <Form.Control
                            ref={searchRef}
                            type="text"
                        />
                        <Button type="submit" variant="success" onClick={() => onSearchHandler(searchRef.current?.value)}>
                            {isLoading ? (
                                "Loading..."
                            ) : "Search"}
                        </Button>
                    </Stack>
                </Form>
                <div>
                    {exerciseTemplates && exerciseTemplates.map(exercise => (
                        <Card key={exercise.id} className="mt-3">
                            <Card.Body>
                                <Row>
                                    <Col lg={6} sm={12} style={{fontWeight: "200"}}>
                                        <h6>{exercise.title}</h6>
                                        <Badge pill bg="primary" className="me-1">{exercise.primaryMuscleGroup}</Badge>
                                        {exercise.secondaryMuscleGroups.length > 0 && (
                                            exercise.secondaryMuscleGroups.map((mg) => (
                                                <Badge pill bg="secondary" className="me-1">
                                                    {mg}
                                                </Badge>
                                            ))
                                        )}
                                    </Col>

                                    <Col lg={6} sm={12}>
                                        <AddExerciseForm
                                            exercise={exercise}
                                            currentDay={currentDay}
                                            savedWorkoutDispatch={savedWorkoutDispatch}
                                        />
                                    </Col>
                                </Row>
                                
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default AddExerciseModal;