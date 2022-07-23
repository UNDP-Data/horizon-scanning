import styled from 'styled-components';
import { COLORVALUES, SDGCOLOR, STEEPVCOLOR } from '../Constants';
import { MouseOverDataType } from '../Types';

interface Props {
  data: MouseOverDataType ;
}

interface TooltipElProps {
  x: number;
  y: number;
  verticalAlignment: string;
  horizontalAlignment: string;
}

const DivValuesEl = styled.div`
  display: flex;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

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
  max-width: 42rem;
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

const ValueSpan = styled.div`
  background-color: #efdbff;
  color: #391085;
  text-align: center;
  margin-left: 0.5rem;
  padding: 0 1rem;
  align-items: center;
  display: flex;
  border-radius: 3rem;
  justify-content: center;
`;

export const Tooltip = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <TooltipEl x={data.xPos} y={data.yPos} verticalAlignment={data.yPos > window.innerHeight / 2 ? 'top' : 'bottom'} horizontalAlignment={data.xPos > window.innerWidth / 2 ? 'left' : 'right'}>
      <div>
        <TooltipTitle>
          {data.fields['Signal Title (New)']}
        </TooltipTitle>
        <FlexEl>
          <ChipEl
            bgColor={STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === data.fields['STEEP+V (Single)'])].bgColor}
            fontColor={STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === data.fields['STEEP+V (Single)'])].textColor}
          >
            {data.fields['STEEP+V (Single)']}
          </ChipEl>
          <ChipEl
            bgColor={data.fields.Horizon ? COLORVALUES[data.fields.Horizon] : '#AAA'}
            fontColor='var(--black)'
          >
            {data.fields.Horizon ? data.fields.Horizon : 'Horizon NA'}
          </ChipEl>
        </FlexEl>
      </div>
      <TooltipBody>
        <HR />
        <ModalTitleEl>STEEP+V</ModalTitleEl>
        <ModalBodyEl>
          <FlexEl>
            {
              data.fields['STEEP+V (multiple)']
                ? (
                  <>
                    {
                      data.fields['STEEP+V (multiple)']?.map((d, i) => (
                        <ChipEl
                          key={i}
                          bgColor={STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === d)].bgColor}
                          fontColor={STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === d)].textColor}
                        >
                          {d}
                        </ChipEl>
                      ))
                    }
                  </>
                )
                : 'NA'
            }
          </FlexEl>
        </ModalBodyEl>
        <HR />
        <ModalTitleEl>Key Themes</ModalTitleEl>
        <ModalBodyEl>
          <FlexEl>
            {
              data.fields['Key themes']
                ? (
                  <>
                    {
                      data.fields['Key themes']?.map((d, i) => (
                        <ChipEl key={i} bgColor='#EAEAEA'>
                          {d}
                        </ChipEl>
                      ))
                    }
                  </>
                )
                : 'NA'
            }
          </FlexEl>
        </ModalBodyEl>
        <HR />
        <ModalTitleEl>SDGs</ModalTitleEl>
        <ModalBodyEl>
          <FlexEl>
            {
              data.fields.SDGs
                ? (
                  <>
                    {
                      data.fields.SDGs?.map((d, i) => (
                        <ChipEl
                          key={i}
                          bgColor={SDGCOLOR[SDGCOLOR.findIndex((el) => el.value === d)].bgColor}
                          fontColor={SDGCOLOR[SDGCOLOR.findIndex((el) => el.value === d)].textColor}
                        >
                          {d}
                        </ChipEl>
                      ))
                    }
                  </>
                )
                : 'NA'
            }
          </FlexEl>
        </ModalBodyEl>
        <HR />
        <DivValuesEl>
          <div className='bold'>
            Likelihood
          </div>
          <ValueSpan className='bold'>{data.fields.Likelihood}</ValueSpan>
        </DivValuesEl>
        <DivValuesEl>
          <div className='bold'>
            Impact
          </div>
          <ValueSpan className='bold'>{data.fields.Impact}</ValueSpan>
        </DivValuesEl>
        <DivValuesEl>
          <div className='bold'>
            Risk Score (Average)
          </div>
          <ValueSpan className='bold'>{data.fields['Survey Risk (Average)']?.toFixed(1)}</ValueSpan>
        </DivValuesEl>
      </TooltipBody>
    </TooltipEl>
  );
};
