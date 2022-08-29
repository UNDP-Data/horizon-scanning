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
  border-radius: 1rem;
  font-size: 1.4rem;
  padding: 2rem;
  background-color: var(--white);
  box-shadow: 0 0 1rem rgb(0 0 0 / 15%);
  word-wrap: break-word;
  top: ${(props) => (props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40)}px;
  left: ${(props) => (props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20)}px;
  width: 42rem;
  transform: ${(props) => `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${props.verticalAlignment === 'top' ? '-100%' : '0%'})`};
`;

const TooltipTitle = styled.div`
  font-size: 2rem;
  color: var(--navy);  
  width: 100%;
  box-sizing: border-box;
  position: relative;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 2.4rem;
`;

const TooltipBody = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

interface ChipElDataType {
  bgColor?: string;
  fontColor?:string;
}

const ChipEl = styled.div<ChipElDataType>`
  padding: 0 1rem;
  font-size: 1.4rem;
  background-color: ${(props) => (props.bgColor ? props.bgColor : 'var(--blue-bg)')};
  color: ${(props) => (props.fontColor ? props.fontColor : 'var(--black)')};
  border-radius: 5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const FlexEl = styled.div`
  display: flex;
  margin-bottom: 0rem;
  flex-wrap: wrap;
`;

const ModalTitleEl = styled.div`
  margin: 1rem 0 0 0;
  font-size: 1.4rem;
  font-weight: bold;
  line-height: 2rem;
`;

const HR = styled.hr`
  margin: 1rem  0;
  border-top: 1px solid var(--black-100);
`;

const ModalBodyEl = styled.div`
  margin: 0.5rem 0 1rem 0;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

export const OutcomeTooltip = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <TooltipEl x={data.xPos} y={data.yPos} verticalAlignment={data.yPos > window.innerHeight / 2 ? 'top' : 'bottom'} horizontalAlignment={data.xPos > window.innerWidth / 2 ? 'left' : 'right'}>
      <div>
        <TooltipTitle>
          {data['UNSDCF/ Programme Outcome']}
        </TooltipTitle>
      </div>
      <TooltipBody>
        <HR />
        <ModalTitleEl>Horizon</ModalTitleEl>
        <ModalBodyEl>
          <FlexEl>
            <ChipEl
              bgColor='#AAA'
              fontColor='var(--black)'
            >
              {data.Timeline ? data.Timeline : 'Timeline NA'}
            </ChipEl>
          </FlexEl>
        </ModalBodyEl>
        <HR />
        <ModalTitleEl>Cooperation Framework Outcome Indicator(s)</ModalTitleEl>
        <ModalBodyEl>
          {data['Cooperation Framework Outcome Indicator(s)']}
        </ModalBodyEl>
      </TooltipBody>
    </TooltipEl>
  );
};
