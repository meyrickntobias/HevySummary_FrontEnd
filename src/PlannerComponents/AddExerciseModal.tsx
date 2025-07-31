import { useEffect, useState } from "react";
import { Alert, Badge, Card, CloseButton, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { type DayOfWeek, type SavedWorkoutAction } from "../Reducers/SavedWorkoutPlanReducer";
import AddExerciseForm from "./AddExerciseForm";
import useFetch from "../Api/useFetch";
import { apiBaseUrl } from "../Api/constants";

type AddExerciseModalProps = {
    isOpen: boolean;
    onHide: () => void;
    currentDay: DayOfWeek;
    savedWorkoutDispatch: React.ActionDispatch<[action: SavedWorkoutAction]>
}

export type ExerciseTemplate = {
    id: string;
    title: string;
    primaryMuscleGroup: string;
    secondaryMuscleGroups: string[];
}

const AddExerciseModal = ({isOpen, onHide, currentDay, savedWorkoutDispatch}: AddExerciseModalProps) => {
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    const [searchKeyword, setSearchKeyword] = useState<string | undefined>();

    const { fetchData, data, error, clearData } = useFetch<ExerciseTemplate[]>(`${apiBaseUrl}/exercise-templates/search?keyword=${searchKeyword}`);

    const onSearchHandler = async (keyword: string | undefined ) => {
        if (!keyword) return;
        setSearchKeyword(keyword);
    }

    useEffect(() => {
        fetchData();
    }, [searchKeyword, fetchData])

    const onKeyDownHandler = async (keyword: string | undefined) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        const newTimeoutId = setTimeout(async () => {
            await onSearchHandler(keyword);
        }, 1000);

        setTimeoutId(newTimeoutId);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearchHandler(searchKeyword);
    }

    const onHideHandler = () => {
        onHide();
        setTimeout(() => {
            clearData();
        }, 500);
    }

    return (
        <Modal
            show={isOpen}
            onHide={onHideHandler}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4>
                    Exercises 
                    {/* <span className="material-symbols-outlined">search</span> */}
                </h4>
                <CloseButton 
                    onClick={() => onHideHandler()}
                    style={{position: "absolute", top: "5px", right: "5px"}} 
                />
                <Form onSubmit={handleSubmit}>
                    <Stack direction="horizontal" gap={2}>
                        <Form.Control
                            type="text"
                            onKeyUp={(event) => onKeyDownHandler(event.currentTarget.value)}
                            autoFocus
                        />
                    </Stack>
                </Form>
                <div>
                    {error && (
                        <Alert variant="danger" className="mt-2">There was an error fetching exercises ): Try refreshing the page.</Alert>
                    )}
                    {!error && data && data.map(exercise => (
                        <Card key={exercise.id} className="mt-3">
                            <Card.Body>
                                <Row>
                                    <Col lg={6} sm={12} style={{fontWeight: "200"}} className="mb-3">
                                        <h6>{exercise.title}</h6>
                                        <Badge pill bg="primary" className="me-1">{exercise.primaryMuscleGroup}</Badge>
                                        {exercise.secondaryMuscleGroups.length > 0 && (
                                            exercise.secondaryMuscleGroups.map((mg) => (
                                                <Badge key={mg}pill bg="secondary" className="me-1">
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