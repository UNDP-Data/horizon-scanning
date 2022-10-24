import styled from 'styled-components';
import { MouseOverDataType } from '../Types';
import { CardEl } from './CardEl';

interface Props {
  data: MouseOverDataType ;
}

interface TooltipElProps {
  x: number;
  y: number;
  verticalAlignment: string;
  horizontalAlignment: string;
}

const TooltipEl = styled.div<TooltipElProps>`
  display: block;
  position: fixed;
  z-index: 10;
  border-radius: 5px;
  font-size: 1.4rem;
  padding: 1.24rem;
  background-color: var(--gray-100);
  border: 1px solid var(--gray-300);
  word-wrap: break-word;
  top: ${(props) => (props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40)}px;
  left: ${(props) => (props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20)}px;
  width: 26.25rem;
  transform: ${(props) => `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${props.verticalAlignment === 'top' ? '-100%' : '0%'})`};
`;

export const Tooltip = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <TooltipEl x={data.xPos} y={data.yPos} verticalAlignment={data.yPos > window.innerHeight / 2 ? 'top' : 'bottom'} horizontalAlignment={data.xPos > window.innerWidth / 2 ? 'left' : 'right'}>
      <CardEl
        data={data}
      />
    </TooltipEl>
  );
};
