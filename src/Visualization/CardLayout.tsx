/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Modal } from 'antd';
import { useState } from 'react';
import styled from 'styled-components';
import { COLORVALUES, SDGCOLOR, STEEPVCOLOR } from '../Constants';
import Data from '../data.json';
import { SignalDataType } from '../Types';
import { Cards } from './Cards';

interface Props {
  filteredSDG: string;
  filteredSteep: string;
  filteredHorizon: string;
  filteredTheme: string;
}

const FlexContainer = styled.div`
  display: flex;
  width: calc(100% + 2rem);
  flex-wrap: wrap;
  justify-content: center;
  margin: 0 -1rem;
`;

const SignalTitleEl = styled.div`
  margin: 2rem 0 1rem 0;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 2.8rem;
`;

const ModalTitleEl = styled.div`
  margin: 2rem 0 0 0;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 3rem;
`;

const ModalBodyEl = styled.div`
  margin: 0.5rem 0 1rem 0;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

interface ChipElDataType {
  bgColor?: string;
  fontColor?:string;
}

const ChipEl = styled.div<ChipElDataType>`
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  background-color: ${(props) => (props.bgColor ? props.bgColor : 'var(--blue-bg)')};
  color: ${(props) => (props.fontColor ? props.fontColor : 'var(--black)')};
  border-radius: 5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const FlexEl = styled.div`
  display: flex;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
`;

const DivValuesEl = styled.div`
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const HR = styled.hr`
  margin: 2rem  0 1rem 0;
  border-top: 1px solid var(--black-100);
`;

const ValueSpan = styled.div`
  width: fit-content;
  background-color: #efdbff;
  display: flex;
  color: #391085;
  padding: 0 1rem;
  align-items: center;
  display: flex;
  border-radius: 3rem;
  justify-content: center;
`;

const CardEl = styled.div`
  border-radius: 0.4rem;
  font-size: 1.4rem;
  padding: 2rem;
  background-color: var(--white);
  box-shadow: 0 0 1rem rgb(0 0 0 / 5%);
  border: 1px solid var(--black-300);
  word-wrap: break-word;
  margin: 0 1rem 2rem 1rem;
  width: calc(33.33% - 2rem);
  cursor: pointer;
`;

export const CardLayout = (props: Props) => {
  const {
    filteredSDG,
    filteredSteep,
    filteredHorizon,
    filteredTheme,
  } = props;
  const [mouseClickData, setMouseClickData] = useState<SignalDataType | null>(null);
  const DataFilterBySDG = filteredSDG === 'All SDGs' ? [...Data] : Data.filter((d) => d.fields.SDGs && d.fields.SDGs?.indexOf(filteredSDG) !== -1);
  const DataFilterBySteep = filteredSteep === 'All STEEP+V' ? [...DataFilterBySDG] : DataFilterBySDG.filter((d) => (d.fields['STEEP+V (Single)'] || d.fields['STEEP+V (multiple)']) && (d.fields['STEEP+V (multiple)']?.indexOf(filteredSteep) !== -1 || d.fields['STEEP+V (Single)'] === filteredSteep));
  const DataFilterByHorizon = filteredHorizon === 'All Horizons' ? [...DataFilterBySteep] : DataFilterBySteep.filter((d) => (d.fields.Horizon === filteredHorizon));
  const DataFilterByTheme = filteredTheme === 'All Themes' ? [...DataFilterByHorizon] : DataFilterByHorizon.filter((d) => (d.fields['Key themes'] && d.fields['Key themes']?.indexOf(filteredTheme.split('__')[0]) !== -1));
  return (
    <>
      <FlexContainer>
        {
          DataFilterByTheme.map((d, i) => <CardEl onClick={() => { setMouseClickData(d as SignalDataType); }}><Cards data={d as SignalDataType} key={i} /></CardEl>)
        }
      </FlexContainer>
      {
        mouseClickData ? (
          <Modal
            visible
            title={mouseClickData.fields['Signal Title (New)']}
            onOk={() => { setMouseClickData(null); }}
            onCancel={() => { setMouseClickData(null); }}
            width={960}
          >
            <SignalTitleEl>{mouseClickData.fields['Signal Title (New)']}</SignalTitleEl>
            <FlexEl>
              <ChipEl
                bgColor={STEEPVCOLOR.findIndex((el) => el.value === mouseClickData.fields['STEEP+V (Single)']) === -1 ? '#EAEAEA' : STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === mouseClickData.fields['STEEP+V (Single)'])].bgColor}
                fontColor={STEEPVCOLOR.findIndex((el) => el.value === mouseClickData.fields['STEEP+V (Single)']) === -1 ? '#000' : STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === mouseClickData.fields['STEEP+V (Single)'])].textColor}
              >
                {mouseClickData.fields['STEEP+V (Single)']}
              </ChipEl>
              {
                mouseClickData.fields['STEEP+V (multiple)']?.map((d, i) => (d === mouseClickData.fields['STEEP+V (Single)'] ? null
                  : (
                    <ChipEl
                      key={i}
                      bgColor={STEEPVCOLOR.findIndex((el) => el.value === d) === -1 ? '#EAEAEA' : STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === d)].bgColor}
                      fontColor={STEEPVCOLOR.findIndex((el) => el.value === d) === -1 ? '#000' : STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === d)].textColor}
                    >
                      {d}
                    </ChipEl>
                  )))
              }
              {
                mouseClickData.fields['Key themes']
                  ? (
                    <>
                      {
                        mouseClickData.fields['Key themes']?.map((d, i) => (
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
            <ModalBodyEl>
              {mouseClickData.fields['Signal Description']}
            </ModalBodyEl>
            <HR />
            <ModalTitleEl>Horizon</ModalTitleEl>
            <ModalBodyEl>
              <ChipEl
                style={{ width: 'fit-content' }}
                bgColor={mouseClickData.fields.Horizon ? COLORVALUES[mouseClickData.fields.Horizon] : '#AAA'}
                fontColor='var(--black)'
              >
                {mouseClickData.fields.Horizon ? mouseClickData.fields.Horizon : 'Horizon NA'}
              </ChipEl>
            </ModalBodyEl>
            <HR />
            <ModalTitleEl>SDGs</ModalTitleEl>
            <ModalBodyEl>
              <FlexEl>
                {
                  mouseClickData.fields.SDGs
                    ? (
                      <>
                        {
                          mouseClickData.fields.SDGs?.map((d, i) => (
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
            <ModalTitleEl>Impact and Relevance to UNDP</ModalTitleEl>
            <ModalBodyEl>
              {mouseClickData.fields['Impact/ Relevance UNDP']}
            </ModalBodyEl>
            <HR />
            <ModalBodyEl>
              <DivValuesEl>
                <div className='bold'>
                  Risk Score (Average)
                </div>
                <ValueSpan className='bold'>{mouseClickData.fields['Survey Risk (Average)'] ? mouseClickData.fields['Survey Risk (Average)'].toFixed(1) : 'NA'}</ValueSpan>
              </DivValuesEl>
            </ModalBodyEl>
            <HR />
            <ModalTitleEl>Sources</ModalTitleEl>
            <ModalBodyEl>
              {
                        mouseClickData.fields.Sources?.split('\n').filter((d) => d !== '' && d !== ' ').length === 0 ? 'No Sources Avaailable'
                          : (
                            <ul>
                              {
                                mouseClickData.fields.Sources?.split('\n').filter((d) => d !== '' && d !== ' ').map((d, i) => (
                                  <li key={i}>
                                    <a href={d} target='_blank' rel='noreferrer'>{d}</a>
                                  </li>
                                ))
                              }
                            </ul>
                          )
                      }
            </ModalBodyEl>
          </Modal>
        )
          : null
      }
    </>
  );
};
