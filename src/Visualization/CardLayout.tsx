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
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
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
  display: flex;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const HR = styled.hr`
  margin: 2rem  0 1rem 0;
  border-top: 1px solid var(--black-100);
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

const CardEl = styled.div`
  border-radius: 0.4rem;
  font-size: 1.4rem;
  padding: 2rem;
  background-color: var(--white);
  box-shadow: 0 0 1rem rgb(0 0 0 / 5%);
  border: 1px solid var(--black-300);
  word-wrap: break-word;
  margin-bottom: 2rem;
  width: calc(33.33% - 1.5rem);
  cursor: pointer;
`;

export const CardLayout = (props: Props) => {
  const {
    filteredSDG,
    filteredSteep,
  } = props;
  const [mouseClickData, setMouseClickData] = useState<SignalDataType | null>(null);
  const DataFilterBySDG = filteredSDG === 'All SDGs' ? [...Data] : Data.filter((d) => d.fields.SDGs && d.fields.SDGs?.indexOf(filteredSDG) !== -1);
  const DataFilterBySteep = filteredSteep === 'All STEEP+V' ? [...DataFilterBySDG] : DataFilterBySDG.filter((d) => (d.fields['STEEP+V (Single)'] || d.fields['STEEP+V (multiple)']) && (d.fields['STEEP+V (multiple)']?.indexOf(filteredSteep) !== -1 || d.fields['STEEP+V (Single)'] === filteredSteep));
  return (
    <>
      <FlexContainer>
        {
          DataFilterBySteep.map((d, i) => <CardEl onClick={() => { setMouseClickData(d as SignalDataType); }}><Cards data={d as SignalDataType} key={i} /></CardEl>)
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
                bgColor={STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === mouseClickData.fields['STEEP+V (Single)'])].bgColor}
                fontColor={STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === mouseClickData.fields['STEEP+V (Single)'])].textColor}
              >
                {mouseClickData.fields['STEEP+V (Single)']}
              </ChipEl>
              <ChipEl
                bgColor={mouseClickData.fields.Horizon ? COLORVALUES[mouseClickData.fields.Horizon] : '#AAA'}
                fontColor='var(--black)'
              >
                {mouseClickData.fields.Horizon ? mouseClickData.fields.Horizon : 'Horizon NA'}
              </ChipEl>
            </FlexEl>
            <ModalBodyEl>
              {mouseClickData.fields['Signal Description']}
            </ModalBodyEl>
            <HR />
            <ModalTitleEl>STEEP+V</ModalTitleEl>
            <ModalBodyEl>
              <FlexEl>
                {
                  mouseClickData.fields['STEEP+V (multiple)']
                    ? (
                      <>
                        {
                          mouseClickData.fields['STEEP+V (multiple)']?.map((d, i) => (
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
                    : 'NA'
                }
              </FlexEl>
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
            <ModalTitleEl>BRH/CO</ModalTitleEl>
            <ModalBodyEl className='bold'>
              {mouseClickData.fields['BRH/ CO']}
            </ModalBodyEl>
            <HR />
            <ModalTitleEl>Regional Impact</ModalTitleEl>
            <ModalBodyEl>
              <FlexEl>
                {
                  mouseClickData.fields['Regional impact?']
                    ? (
                      <ChipEl bgColor={mouseClickData.fields['Regional impact?'][0] === 'Yes' ? 'var(--primary-blue)' : 'var(--red)'} fontColor='var(--white)'>
                        {mouseClickData.fields['Regional impact?'][0]}
                      </ChipEl>
                    )
                    : 'NA'
                }
              </FlexEl>
            </ModalBodyEl>
            <HR />
            <ModalBodyEl>
              <DivValuesEl>
                <div className='bold'>
                  Likelihood
                </div>
                <ValueSpan className='bold'>{mouseClickData.fields.Likelihood}</ValueSpan>
              </DivValuesEl>
              <DivValuesEl>
                <div className='bold'>
                  Impact
                </div>
                <ValueSpan className='bold'>{mouseClickData.fields.Impact}</ValueSpan>
              </DivValuesEl>
              <DivValuesEl>
                <div className='bold'>
                  Risk Score (Average)
                </div>
                <ValueSpan className='bold'>{mouseClickData.fields['Survey Risk (Average)']?.toFixed(1)}</ValueSpan>
              </DivValuesEl>
            </ModalBodyEl>
            <HR />
            <ModalTitleEl>Sources</ModalTitleEl>
            <ModalBodyEl>
              {
                mouseClickData.fields.Sources?.split('\n').map((d, i) => (
                  <div key={i}>
                    <a href={d} target='_blank' rel='noreferrer'>{d}</a>
                  </div>
                ))
              }
            </ModalBodyEl>
          </Modal>
        )
          : null
      }
    </>
  );
};
