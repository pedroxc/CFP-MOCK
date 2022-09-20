import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { withTheme, DefaultTheme } from 'styled-components';
import { BiImport } from 'react-icons/bi';
import { toastError } from '../../utils/toast/config';
import messages from '../../utils/toast/messages';
import LoadingPage from '../LoadingPage';
import { importCSV } from '../../services/Employee';

import { Container, Title, ImportContainer } from './styles';

interface IimportEmployees {
  theme: DefaultTheme;
}

const ImportEmployees: React.FC<IimportEmployees> = ({ theme }) => {
  const [loading, handleLoading] = useState(false);
  const onDrop = async (acceptedFiles: any): Promise<void> => {
    try {
      handleLoading(true);
      const path = acceptedFiles[0].path.split('.');
      const type = path.pop();

      if (type === 'csv') {
        const data = new FormData();
        data.append('csv', acceptedFiles[0]);
        const response = await importCSV(data);
        handleLoading(false);
      } else {
        handleLoading(false);
        toastError(messages.import.importFileError);
      }
    } catch (e) {
      handleLoading(false);
      toastError(messages.importError);
    }
  };

  const {
    getRootProps, getInputProps, open, isDragActive,
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <>
      {loading && <LoadingPage />}
      <Container>

        <Title> Importar Funcionários</Title>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive
              ? (
                <ImportContainer className="dragingContainer">
                  Aqui!!!
                  <BiImport size="50" />
                </ImportContainer>
              )
              : (
                <ImportContainer>
                  Arraste o arquivo .csv

                  <button type="button" onClick={open}>
                    <BiImport size="50" />

                  </button>

                </ImportContainer>
              )
          }
        </div>
      </Container>
    </>
  );
};

export default withTheme(ImportEmployees);
