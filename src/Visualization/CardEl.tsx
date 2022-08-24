import styled from 'styled-components';
import {
  COLORVALUES, SDGCOLOR, SSCOLOR, STEEPVCOLOR,
} from '../Constants';
import { SignalDataType } from '../Types';

interface Props {
  data: SignalDataType ;
}

const DivValuesEl = styled.div`
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
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
  width: fit-content;
  padding: 0 1rem;
  align-items: center;
  display: flex;
  border-radius: 3rem;
  justify-content: center;
`;

export const CardEl = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <>
      <div>
        <TooltipTitle>
          {data['Signal Title (New)']}
        </TooltipTitle>
        <FlexEl>
          {
            data['STEEP+V'].split(',').map((d, i) => (
              <ChipEl
                key={i}
                bgColor={STEEPVCOLOR.findIndex((el) => el.value === d) === -1 ? '#EAEAEA' : STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === d)].bgColor}
                fontColor={STEEPVCOLOR.findIndex((el) => el.value === d) === -1 ? '#000' : STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === d)].textColor}
              >
                {d}
              </ChipEl>
            ))
          }
          {
            data['Key Themes'].split(',').map((d, i) => (d !== ''
              ? (
                <ChipEl key={i} bgColor='#EAEAEA'>
                  {d}
                </ChipEl>
              )
              : null
            ))
          }
        </FlexEl>
      </div>
      <TooltipBody>
        <HR />
        <ModalTitleEl>Horizon</ModalTitleEl>
        <ModalBodyEl>
          <FlexEl>
            <ChipEl
              bgColor={data.Horizon ? COLORVALUES[data.Horizon] : '#AAA'}
              fontColor='var(--black)'
            >
              {data.Horizon ? data.Horizon : 'Horizon NA'}
            </ChipEl>
          </FlexEl>
        </ModalBodyEl>
        <HR />
        <ModalTitleEl>Signature Solutions/Enablers</ModalTitleEl>
        <ModalBodyEl>
          <FlexEl>
            {
              data['Signature Solutions/ Enablers'].split(',').map((d, i) => (d !== '' ? (
                <ChipEl
                  key={i}
                  bgColor={SSCOLOR.findIndex((el) => el.value === d) !== -1 ? SSCOLOR[SSCOLOR.findIndex((el) => el.value === d)].bgColor : '#AAA'}
                  fontColor={SSCOLOR.findIndex((el) => el.value === d) !== -1 ? SSCOLOR[SSCOLOR.findIndex((el) => el.value === d)].textColor : 'var(--black)'}
                >
                  {d}
                </ChipEl>
              ) : null))
            }
          </FlexEl>
        </ModalBodyEl>
        <HR />
        <ModalTitleEl>SDGs</ModalTitleEl>
        <ModalBodyEl>
          <FlexEl>
            {
              data.SDGs
                ? (
                  <>
                    {
                      data.SDGs.split(',').map((d, i) => (
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
            {data['Survey Risk (Average)'] ? 'Risk Score based on Survey Average' : 'Risk Score Avg. of Likelihood and Impact'}
          </div>
          <ValueSpan className='bold'>
            {
              data['Survey Risk (Average)'] ? data['Survey Risk (Average)']?.toFixed(1) : data['Risk score (L x I)']
            }
          </ValueSpan>
        </DivValuesEl>
      </TooltipBody>
    </>
  );
};
