import { Accordion, Col, Row } from "react-bootstrap";
import WeeklySummary from "./WeeklySummary";
import type { WeeklyMuscleGroupSummary } from "../Routes/WorkoutHistory";
import { formatDateWithMonAndYear } from "../Helpers/DateHelper";

type WeeklySummaryAccordionProps = {
  muscleGroupData: WeeklyMuscleGroupSummary[];
  onlyShowMuscle: string | undefined;
}

const WeeklySummaryAccordion = ({muscleGroupData, onlyShowMuscle} : WeeklySummaryAccordionProps) => {
    return (
        <Accordion defaultActiveKey="0" alwaysOpen>
          {muscleGroupData.map((mg, i) => 
            (
              <Accordion.Item eventKey={i.toString()}>
                <Accordion.Header>
                  <Row style={{width: "100%"}}>
                    <Col lg={8} md={6} xs={8} sm={5}>
                      <div>{formatDateWithMonAndYear(mg.startDate)} - {formatDateWithMonAndYear(mg.endDate)}</div>
                    </Col>
                    <Col lg={2} md={3} sm={3} xs={0} className="d-none d-sm-block" style={{textAlign: "right"}}>
                      { i == 0 && <span style={{fontWeight: "100"}}> This Week</span>} 
                    </Col>
                    <Col lg={2} md={3} xs={4} sm={4}>
                      <div style={{fontWeight: "200", float: "right"}} className="me-4">({mg.workouts} workouts)</div>
                    </Col>
                  </Row>
                </Accordion.Header>
                <Accordion.Body 
                  className="p-0" 
                  style={{ maxHeight: '300px', overflowY: 'auto', backgroundColor: 'blue !important'}}>
                    <WeeklySummary muscleGroups={mg.muscleGroups} onlyShowMuscle={onlyShowMuscle} />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
    )
}

export default WeeklySummaryAccordion;