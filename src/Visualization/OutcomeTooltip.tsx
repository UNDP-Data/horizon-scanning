import styled from 'styled-components';
import { OutcomeMouseOverDataType } from '../Types';

interface Props {
  data: OutcomeMouseOverDataType ;
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

const HR = styled.hr`
  border-top: 1px solid var(--gray-300);
`;

const HeadingEl = styled.div`
  margin: 1rem 0 0 0;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.25rem;
`;

export const OutcomeTooltip = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <TooltipEl x={data.xPos} y={data.yPos} verticalAlignment={data.yPos > window.innerHeight / 2 ? 'top' : 'bottom'} horizontalAlignment={data.xPos > window.innerWidth / 2 ? 'left' : 'right'}>
      <p className='bold undp-typography'>
        {data['UNSDCF/ Programme Outcome']}
      </p>
      <HR className='margin-top-06' />
      <HeadingEl>Horizon</HeadingEl>
      <div
        className='undp-chip margin-top-03'
      >
        {data.Timeline ? data.Timeline : 'Timeline NA'}
      </div>
      <HR className='margin-top-06' />
      <HeadingEl>Cooperation Framework Outcome Indicator(s)</HeadingEl>
      <p className='undp-typography'>
        {data['Cooperation Framework Outcome Indicator(s)']}
      </p>
    </TooltipEl>
  );
};
