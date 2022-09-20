import React from 'react';
import { BsCalendar4Event } from 'react-icons/bs';
import { withTheme, DefaultTheme } from 'styled-components';
import masks from '../../utils/masks';
import { DatesContainer, DatesWrapper } from './styles';

interface CardDatesProps {
  theme: DefaultTheme;
  createAt: string;
  actionAt: string;
  admissionAt: string;
  isRefused: boolean;
}

const CardDates: React.FC<CardDatesProps> = ({
  createAt, actionAt, admissionAt, isRefused, theme,
}) => {
  const DatesList = [
    {
      name: 'Data de criação',
      date: masks.formarDate(createAt),
    },
    {
      name: 'Data Aprovação/Recusada',
      date: actionAt ? masks.formarDate(actionAt) : '',
      dynamicColors: true,
      refusedColor: isRefused,
    },
    {
      name: 'Data de Admissão',
      date: admissionAt ? masks.formarDate(admissionAt) : '',
      dynamicColors: true,
      admissionColor: true,
    },
  ];

  return (
    <DatesWrapper>
      {DatesList.map(({
        name, date, refusedColor, admissionColor, dynamicColors,
      }) => (
        date && (
          <DatesContainer
            key={name}
            dynamicColors={dynamicColors}
            refusedColor={refusedColor}
            admissionColor={admissionColor}
            data-tip={name}
            data-background-color={theme.colors.background}
            data-place="bottom"
            data-type="light"
            data-effect="solid"
            data-text-color={theme.colors.darkBlue}
          >
            <BsCalendar4Event size={16} />
            {date}
          </DatesContainer>
        )
      ))}
    </DatesWrapper>
  );
};

export default withTheme(CardDates);
