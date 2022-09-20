import React from 'react';
import Route from './Route';

import Home from '../pages/Home';
import Solicitations from '../pages/Solicitations';
import Employees from '../pages/Employees';
import Payments from '../pages/Payments';
import Simulation from '../pages/Simulation';
import CreateCompany from '../pages/CreateCompany';
import SignSolicitations from '../pages/SignSolicitations';
import ImportEmployees from '../pages/ImportEmployees';
import PendingPayment from '../pages/PendingPayment';

const App: React.FC = () => (
  <>
    <Route
      path="/home"
      component={Home}
      isPrivate
    />
    <Route
      path="/solicitations"
      component={Solicitations}
      isPrivate
    />
    <Route
      path="/assign-solicitations"
      component={SignSolicitations}
      isPrivate
    />
    <Route
      path="/employees"
      component={Employees}
      isPrivate
    />
    <Route
      path="/payments"
      component={Payments}
      isPrivate
    />
    <Route
      path="/simulations"
      component={Simulation}
      isPrivate
    />
    <Route
      path="/create-company"
      component={CreateCompany}
      isPrivate
    />
    <Route
      path="/pending-payment"
      component={PendingPayment}
      isPrivate
    />
    <Route
      path="/import-employees"
      component={ImportEmployees}
      isPrivate
    />
  </>
);

export default App;
