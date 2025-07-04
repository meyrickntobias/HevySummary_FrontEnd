import { Accordion, Col, Row } from "react-bootstrap";
import type { WeeklyMuscleGroupSummary } from "./App";
import WeeklySummary from "./WeeklySummary";

type WeeklySummaryAccordionProps = {
  muscleGroupData: WeeklyMuscleGroupSummary[];
  onlyShowMuscle: string | undefined;
}

const dateOrdinal = (dom: number) => {
  if (dom == 31 || dom == 21 || dom == 1) return dom + "st";
  else if (dom == 22 || dom == 2) return dom + "nd";
  else if (dom == 23 || dom == 3) return dom + "rd";
  else return dom + "th";
};

const formatDateStr = (dateStr: string) => {
  var date = new Date(dateStr);
  var month = date.toLocaleDateString("en-NZ", { month: 'short' });
  var day = dateOrdinal(date.getDate());
  return day + " " + month;
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
                      <div>{formatDateStr(mg.startDate)} - {formatDateStr(mg.endDate)}</div>
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