import { Button, Col, Row } from "react-bootstrap";

type MuscleGroupPickerProps = {
    setFilteredMuscleRegion: (value: React.SetStateAction<string | undefined>) => void;
}

const muscleRegions = ["Legs", "Chest", "Shoulders", "Back", "Abdominals", "Arms"];

const MuscleGroupPicker = ({setFilteredMuscleRegion}: MuscleGroupPickerProps) => {
    return (
        <Row className="mb-1">
            <Col>
                <Button variant="light" className="me-2 mb-2" style={{fontSize: "0.8rem"}} onClick={() => setFilteredMuscleRegion(undefined)}>
                    All / No Filter
                </Button>
                {muscleRegions.map(m => (
                    <Button variant="outline-primary" className="me-2 mb-2" style={{fontSize: "0.8rem"}} onClick={() => setFilteredMuscleRegion(m.toLowerCase())}>
                        {m}
                    </Button>
                ))}
            </Col>
        </Row>
        
    )
}

export default MuscleGroupPicker;