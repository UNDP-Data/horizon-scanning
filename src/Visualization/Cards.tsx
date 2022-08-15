import styled from 'styled-components';
import { SignalDataType } from '../Types';
import { CardEl } from './CardEl';

interface Props {
  data: SignalDataType ;
}

const CardContainer = styled.div`
  margin: 0 1rem;
`;

export const Cards = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <CardContainer>
      <CardEl
        data={data}
      />
    </CardContainer>
  );
};
