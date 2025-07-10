import { Button, Card, Col, Form, Row } from "react-bootstrap";
import RoutineCard from "./RoutineCard";
import { RoutineActionType, type DayOfWeek, type RoutineAction, type SavedRoutinesState } from "../Routes/PlanRoutine";

type PlannerDayCardProps = {
    dayOfWeek: DayOfWeek;
    clickAddRoutineHandler: (dayOfWeek: DayOfWeek) => void;
    savedRoutines: SavedRoutinesState;
    routineDispatcher: React.ActionDispatch<[action: RoutineAction]>
}

const PlannerDayCard = ({dayOfWeek, clickAddRoutineHandler, savedRoutines, routineDispatcher}: PlannerDayCardProps) => {
    return (
        <Card className="mb-2">
            <Card.Header>
                <Row>
                    <Col sm={4}>
                        <h3>{dayOfWeek}</h3>
                    </Col>
                    <Col sm={8}>
                        <Form>
                            <Button variant="outline-light" onClick={() => clickAddRoutineHandler(dayOfWeek)} className="me-2">
                                Add Routine
                            </Button>
                            
                            <Button variant="outline-light" className="me-2">
                                Add Exercise
                            </Button>
                            <Form.Check className="d-inline-block" style={{float: "right"}} type="switch" label="Rest Day" />
                        </Form>
                    </Col>
                </Row>
                
            </Card.Header>
            <Card.Body>
                {savedRoutines[dayOfWeek]?.map(routine => (
                    <RoutineCard routine={routine} removeFromRoutines={(routine) => routineDispatcher({ type: RoutineActionType.REMOVE, payload: { day: dayOfWeek, routine: routine} })} />
                ))}
            </Card.Body>
        </Card>
    )
}

export default PlannerDayCard;