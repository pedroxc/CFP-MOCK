import React from 'react';
import { BiEdit } from 'react-icons/bi';
import { EditButton, ButtonText } from './styles';

interface EditBankDetailsButtonProps {
  handleAction(): void;
}

const EditBankDetailsButton: React.FC<EditBankDetailsButtonProps> = ({
  handleAction,
}) => (
  <EditButton
    onClick={handleAction}
  >
    <BiEdit size={20} />
    <ButtonText>Editar dados bancários</ButtonText>
  </EditButton>
);

export default EditBankDetailsButton;
