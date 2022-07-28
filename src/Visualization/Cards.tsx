// import uniq from 'lodash.uniq';
import uniq from 'lodash.uniq';
import styled from 'styled-components';
import { COLORVALUES, SDGCOLOR, STEEPVCOLOR } from '../Constants';
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

const CardContainer = styled.div`
  margin: 0 1rem;
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

export const Cards = (props: Props) => {
  const {
    data,
  } = props;
  // const SteepVList = data.fields['STEEP+V (multiple)'] ? [...data.fields['STEEP+V (multiple)']].push(data.fields['STEEP+V (Single)']) : [data.fields['STEEP+V (Single)']];
  const SteepVList = [data.fields['STEEP+V (Single)']];
  data.fields['STEEP+V (multiple)']?.forEach((d) => { SteepVList.push(d); });
  const SteepVUniq = uniq(SteepVList);
  return (
    <CardContainer>
      <div>
        <TooltipTitle>
          {data.fields['Signal Title (New)']}
        </TooltipTitle>
        <FlexEl>
          {
            SteepVUniq.map((d, i) => (
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
              : null
          }
        </FlexEl>
      </div>
      <TooltipBody>
        <HR />
        <ModalTitleEl>Horizon</ModalTitleEl>
        <ModalBodyEl>
          <FlexEl>
            <ChipEl
              bgColor={data.fields.Horizon ? COLORVALUES[data.fields.Horizon] : '#AAA'}
              fontColor='var(--black)'
            >
              {data.fields.Horizon ? data.fields.Horizon : 'Horizon NA'}
            </ChipEl>
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
            Risk Score (Average):
          </div>
          <ValueSpan className='bold'>
            {
              data.fields['Survey Risk (Average)'] ? data.fields['Survey Risk (Average)']?.toFixed(1) : 'NA'
            }
          </ValueSpan>
        </DivValuesEl>
      </TooltipBody>
    </CardContainer>
  );
};
