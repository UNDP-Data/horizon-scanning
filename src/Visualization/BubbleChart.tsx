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
  filteredHorizon: string;
  filteredTheme: string;
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

const HORIZONLIST = ['2022-2023', '2024-2025', '2026-2030'];

export const BubbleChart = (props: Props) => {
  const {
    filteredSDG,
    filteredSteep,
    filteredHorizon,
    filteredTheme,
  } = props;
  const [finalData, setFinalData] = useState<SignalDataTypeForBubbleChart[] | null>(null);
  const [mouseOverData, setMouseOverData] = useState<MouseOverDataType | null>(null);
  const [mouseClickData, setMouseClickData] = useState<SignalDataTypeForBubbleChart | null>(null);
  const graphWidth = 1280;
  const graphHeight = 800;
  const radius = 10;

  const xScale = scaleLinear()
    .domain([2, 5])
    .range([50, graphWidth - 25]);

  useEffect(() => {
    const dataTemp = (Data as SignalDataType[]).filter((d) => d.fields['Survey Risk (Average)'] && d.fields.Horizon);
    forceSimulation(dataTemp as any)
      .force('x', forceX((d: any) => xScale(d.fields['Survey Risk (Average)'])).strength(5))
      .force('y', forceY((d: any) => (HORIZONLIST.indexOf(d.fields.Horizon) + 1) * (graphHeight / 4)).strength(1))
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
              <svg width='100%' viewBox={`0 0 ${graphWidth} ${graphHeight - 50}`}>

                <text
                  x={50}
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

                <text
                  x={0}
                  y={0}
                  dy={25}
                  dx={0}
                  fill='#001A5D'
                  textAnchor='middle'
                  transform={`translate(0,${graphHeight / 4}) rotate(-90)`}
                  fontSize={20}
                  fontWeight='bold'
                >
                  2022 - 2023
                </text>
                <text
                  x={0}
                  y={0}
                  dy={25}
                  dx={0}
                  fill='#001A5D'
                  textAnchor='middle'
                  transform={`translate(0,${graphHeight / 2}) rotate(-90)`}
                  fontSize={20}
                  fontWeight='bold'
                >
                  2024 - 2025
                </text>
                <text
                  x={0}
                  y={0}
                  dy={25}
                  dx={0}
                  fill='#001A5D'
                  textAnchor='middle'
                  transform={`translate(0,${graphHeight * 0.75}) rotate(-90)`}
                  fontSize={20}
                  fontWeight='bold'
                >
                  2026 - 2030
                </text>
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
                    const opacityTheme = filteredTheme !== 'All Themes'
                      ? d.fields['Key themes'] && d.fields['Key themes']?.indexOf(filteredTheme.split('__')[0]) !== -1
                        ? 1
                        : 0.15
                      : 1;
                    const opacityHorizon = filteredHorizon !== 'All Horizons'
                      ? d.fields.Horizon === filteredHorizon
                        ? 1
                        : 0.15
                      : 1;
                    return (
                      <circle
                        key={i}
                        cx={d.x}
                        cy={d.y}
                        r={radius}
                        fill='#001A5D'
                        stroke='#001A5D'
                        opacity={
                          mouseOverData
                            ? d.fields['Signal Title (New)'] === mouseOverData.fields['Signal Title (New)']
                              ? 1
                              : 0.15
                            : Math.min(opacitySDG, opacitySteep, opacityTheme, opacityHorizon)
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
          ) : <Spin size='large' />
        }
      </VizEl>
    </>
  );
};
