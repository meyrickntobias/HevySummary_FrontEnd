import { Container, Nav } from 'react-bootstrap';
import { Route, Routes, useLocation } from 'react-router-dom';
import WorkoutHistory from './Routes/WorkoutHistory';
import PlanWorkouts from './Routes/PlanWorkouts';

const App = () => {
  const location = useLocation();

  return (
    <>
      <Container fluid="md" className="mt-3">
        <h1 className="text-center mb-3 mt-4 site-heading">Hevy Sidekick</h1>
        <Nav variant="underline" className="mb-3 site-heading">
          <Nav.Item>
            <Nav.Link active={location.pathname == "#history"} className="site-heading" href="#history">
              History
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={location.pathname == "#plan"} className="site-heading" href="#plan">
              Planner
            </Nav.Link>
          </Nav.Item>
        </Nav>  

        <Routes>
          <Route path="/history" index element={<WorkoutHistory />} />
          <Route path="/plan" element={<PlanWorkouts />} />
        </Routes>
        
      </Container>
    </>
  )
}

export default App
