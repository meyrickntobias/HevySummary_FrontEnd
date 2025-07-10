import { Container, Nav } from 'react-bootstrap';
import { Route, Routes, useLocation } from 'react-router-dom';
import WorkoutHistory from './Routes/WorkoutHistory';
import PlanRoutine from './Routes/PlanRoutine';


const App = () => {
  const location = useLocation();

  return (
    <>
      <Container fluid="md" className="mt-3">
        <h2 className="text-center mb-3 mt-4">Hevy Summary - Sets Per Muscle Group Per Week</h2>
        <Nav variant="underline" className="mb-3">
          <Nav.Item>
            <Nav.Link active={location.pathname == "/history"} href="/history">Workout History</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={location.pathname == "/plan"} href="/plan">Workout Planner</Nav.Link>
          </Nav.Item>
        </Nav>  

        <Routes>
          <Route path="/history" element={<WorkoutHistory />} />
          <Route path="/plan" element={<PlanRoutine />} />
        </Routes>
        
      </Container>
    </>
  )
}

export default App
