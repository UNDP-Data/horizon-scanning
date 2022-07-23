import {
  forceCollide, forceManyBody, forceSimulation, forceX, forceY,
} from 'd3-force';
import { scaleLinear } from 'd3-scale';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal, Spin } from 'antd';
import Data from '../data.json';
import { MouseOverDataType, SignalDataType, SignalDataTypeForBubbleChart } from '../Types';
import { COLORVALUES, SDGCOLOR, STEEPVCOLOR } from '../Constants';
import { Tooltip } from './tooltip';

interface Props {
  filteredSDG: string;
  filteredSteep: string;
}

const VizEl = styled.div`
  display: flex;
  justify-content: center;
  max-width: 128rem;
  width: 100%;
  margin: auto;
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

export const BubbleChart = (props: Props) => {
  const {
    filteredSDG,
    filteredSteep,
  } = props;
  const [finalData, setFinalData] = useState<SignalDataTypeForBubbleChart[] | null>(null);
  const [mouseOverData, setMouseOverData] = useState<MouseOverDataType | null>(null);
  const [mouseClickData, setMouseClickData] = useState<SignalDataTypeForBubbleChart | null>(null);
  const graphWidth = 1280;
  const graphHeight = 400;
  const radius = 10;

  const xScale = scaleLinear()
    .domain([2, 5])
    .range([25, graphWidth - 25]);

  useEffect(() => {
    const dataTemp = (Data as SignalDataType[]).filter((d) => d.fields['Survey Risk (Average)']);
    forceSimulation(dataTemp as any)
      .force('x', forceX((d: any) => xScale(d.fields['Survey Risk (Average)'])).strength(5))
      .force('y', forceY(graphHeight / 2).strength(1))
      .force('collide', forceCollide(() => radius + 2))
      .force('charge', forceManyBody().strength(-15))
      .on('end ', () => { setFinalData(dataTemp as SignalDataTypeForBubbleChart[]); });
  }, []);
  return (
    <>
      <VizEl>
        {
          finalData ? (
            <>
              <svg width='100%' viewBox={`0 0 ${graphWidth} ${graphHeight}`}>

                <text
                  x={0}
                  y={0}
                  dy={10}
                  dx={0}
                  fill='#222'
                  fontSize={14}
                >
                  ← Low Risk
                </text>
                <text
                  x={graphWidth}
                  y={0}
                  dy={10}
                  dx={0}
                  fill='#222'
                  textAnchor='end'
                  fontSize={14}
                >
                  High Risk →
                </text>
                {
                  [2, 3, 4, 5].map((d, i) => (
                    <g key={i} transform={`translate(${xScale(d)}, 0)`}>
                      <line
                        x1={0}
                        y1={30}
                        x2={0}
                        y2={graphHeight}
                        stroke='#AAA'
                        strokeWidth={1}
                        strokeDasharray='2, 2'
                        fill='none'
                      />
                      <text
                        x={0}
                        y={30}
                        dy={10}
                        dx={5}
                        fill='#222'
                        fontSize={14}
                      >
                        {d}
                      </text>
                    </g>
                  ))
                }
                {
                  finalData.map((d, i) => {
                    const opacitySteep = filteredSteep !== 'All STEEP+V'
                      ? (d.fields['STEEP+V (Single)'] || d.fields['STEEP+V (multiple)']) && (filteredSteep === d.fields['STEEP+V (Single)'] || d.fields['STEEP+V (multiple)']?.indexOf(filteredSteep) !== -1)
                        ? 1
                        : 0.15
                      : 1;
                    const opacitySDG = filteredSDG !== 'All SDGs'
                      ? d.fields.SDGs && d.fields.SDGs?.indexOf(filteredSDG) !== -1
                        ? 1
                        : 0.15
                      : 1;
                    return (
                      <circle
                        key={i}
                        cx={d.x}
                        cy={d.y}
                        r={radius}
                        fill={d.fields.Horizon ? COLORVALUES[d.fields.Horizon] : '#AAA'}
                        stroke={d.fields.Horizon ? COLORVALUES[d.fields.Horizon] : '#AAA'}
                        opacity={
                          mouseOverData
                            ? d.fields['Signal Title (New)'] === mouseOverData.fields['Signal Title (New)']
                              ? 1
                              : 0.15
                            : Math.min(opacitySDG, opacitySteep)
                        }
                        fillOpacity={0.8}
                        strokeWidth={1}
                        onMouseOver={(event) => { setMouseOverData({ ...d, xPos: event.clientX, yPos: event.clientY }); }}
                        onClick={() => { setMouseOverData(null); setMouseClickData({ ...d }); }}
                        onMouseMove={(event) => { setMouseOverData({ ...d, xPos: event.clientX, yPos: event.clientY }); }}
                        onMouseLeave={() => { setMouseOverData(null); }}
                        style={{ cursor: 'pointer' }}
                      />
                    );
                  })
                }
              </svg>
              {
                mouseOverData ? (
                  <Tooltip
                    data={mouseOverData}
                  />
                )
                  : null
              }
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
          ) : <Spin size='large' />
        }
      </VizEl>
    </>
  );
};
