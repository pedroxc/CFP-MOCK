import React, { useCallback, useEffect, useState } from 'react';
import {
  deleteItemStorage, getStorage, setStorage,
} from '../../utils/storage';
import storage from '../../utils/storage/keys';
import messages from '../../utils/toast/messages';
import { toastSuccess } from '../../utils/toast/config';
import CreateAddress from './CreateAddress';
import CreateMainInfo from './CreateMainInfo';
import CreateParams from './CreateParams';
import {
  Container,
  Title,
} from './styles';

const steps = {
  main: 'mainInfo',
  address: 'address',
  params: 'params',
};

const CreateCompany: React.FC = () => {
  const [stepName, setStepName] = useState(steps.main);

  useEffect(() => {
    const step = getStorage(storage.registration.step);
    const companyId = getStorage(storage.registration.companyId);
    const companyName = getStorage(storage.registration.companyName);

    if (step && companyId && companyName) {
      setStepName(step);
      toastSuccess(messages.company.continueCreation(companyName));
    }
  }, []);

  const changeStep = useCallback((step: string) => {
    setStorage(storage.registration.step, step);
    setStepName(step);
  }, []);

  const finishCreate = useCallback(() => {
    setStepName(steps.main);
    deleteItemStorage(storage.registration.step);
    deleteItemStorage(storage.registration.companyId);
    deleteItemStorage(storage.registration.companyName);
  }, []);

  return (
    <Container>
      <Title>Cadastro de Empresa</Title>
      {stepName === steps.main && (
        <CreateMainInfo handleNext={(step) => changeStep(step)} />
      )}
      {stepName === steps.address && (
        <CreateAddress handleNext={(step) => changeStep(step)} />
      )}
      {stepName === steps.params && (
        <CreateParams handleNext={() => finishCreate()} />
      )}
    </Container>
  );
};

export default CreateCompany;
