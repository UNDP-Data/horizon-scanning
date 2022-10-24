import {
  forceCollide, forceManyBody, forceSimulation, forceX, forceY,
} from 'd3-force';
import { scaleLinear } from 'd3-scale';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Modal } from 'antd';
import Data from '../Data/Signal-2022.json';
import { MouseOverDataType, SignalDataType, SignalDataTypeForBubbleChart } from '../Types';
import { Tooltip } from './tooltip';
import { ModalEl } from './ModalEl';
import { HORIZONTYPE } from '../Constants';

import '../style/buttonStyle.css';
import '../style/modalStyle.css';

interface Props {
  filteredSDG: string;
  filteredSteep: string;
  filteredYear: string;
  filteredTheme: string;
  filteredSS: string;
}

const VizEl = styled.div`
  display: flex;
  justify-content: center;
  max-width: 128rem;
  width: 100%;
  margin: auto;
`;

const ColorBox = styled.div`
  width: 1rem;
  height: 1rem;
  margin-right: 5px;
`;

const Container = styled.div`
  width: 100%;
  max-width: 128rem;
`;

const HORIZONLIST = ['Short Term', 'Medium Term', 'Long Term'];

export const BubbleChart = (props: Props) => {
  const {
    filteredSDG,
    filteredSteep,
    filteredYear,
    filteredTheme,
    filteredSS,
  } = props;
  const [finalData, setFinalData] = useState<SignalDataTypeForBubbleChart[] | null>(null);
  const [mouseOverData, setMouseOverData] = useState<MouseOverDataType | null>(null);
  const [mouseClickData, setMouseClickData] = useState<SignalDataTypeForBubbleChart | null>(null);
  const [showHelp, setShowHelp] = useState(false);
  const graphWidth = 1280;
  const graphHeight = 800;
  const rightPadding = 50;
  const radius = 5;

  const xScale = scaleLinear()
    .domain([1, 5])
    .range([50, graphWidth - rightPadding]);

  useEffect(() => {
    const dataTemp = (Data as SignalDataType[]).filter((d) => d.Horizon);
    forceSimulation(dataTemp as any)
      .force('x', forceX((d: SignalDataTypeForBubbleChart) => (d['Survey Risk (Average)'] ? xScale(d['Survey Risk (Average)'] as number) : xScale(d['Risk score (L x I)'] as number))).strength(5))
      .force('y', forceY((d: SignalDataTypeForBubbleChart) => (HORIZONLIST.indexOf(HORIZONTYPE[d.Horizon as '2022-2023' | '2024-2025' | '2026-2030' | '2021-2022' | '2023-2025']) + 1) * (graphHeight / 4)).strength(1))
      .force('collide', forceCollide(() => radius + 1))
      .force('charge', forceManyBody().strength(-15))
      .on('end ', () => { setFinalData(dataTemp as SignalDataTypeForBubbleChart[]); });
  }, []);
  return (
    <Container>
      <div className='flex-div flex-vert-align-center margin-bottom-05 flex-space-between'>
        <div className='flex-div flex-vert-align-center'>
          <div className='flex-div flex-vert-align-center' style={{ gap: 0, fontSize: '0.875rem' }}>
            <ColorBox style={{ backgroundColor: '#F49FBC' }} />
            <div>
              Signals from 2021
            </div>
          </div>
          <div className='flex-div flex-vert-align-center' style={{ gap: 0, fontSize: '0.875rem' }}>
            <ColorBox style={{ backgroundColor: '#805D93' }} />
            <div>
              Signals from 2022
            </div>
          </div>
        </div>
        <button type='button' className='undp-button button-tertiary button-arrow' onClick={() => { setShowHelp(!showHelp); }}>How To Read</button>
      </div>
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
                  x={graphWidth - rightPadding}
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
                  [1, 2, 3, 4, 5].map((d, i) => (
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
                  Short Term
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
                  Medium Term
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
                  Long Term
                </text>
                {
                  finalData.map((d, i) => {
                    const opacitySteep = filteredSteep !== 'All STEEP+V'
                      ? d['STEEP+V'].split(',').indexOf(filteredSteep) !== -1
                        ? 1
                        : 0.15
                      : 1;
                    const opacitySDG = filteredSDG !== 'All SDGs'
                      ? d.SDGs.split(',').indexOf(filteredSDG) !== -1
                        ? 1
                        : 0.15
                      : 1;
                    const opacityTheme = filteredTheme !== 'All Themes'
                      ? d['Key Themes'].split(',').indexOf(filteredTheme.split('__')[0]) !== -1
                        ? 1
                        : 0.15
                      : 1;
                    const opacityHorizon = filteredYear !== 'All Years'
                      ? d.Year === parseInt(filteredYear, 10)
                        ? 1
                        : 0.15
                      : 1;
                    const opacitySS = filteredSS !== 'All Signature Solutions/Enabler'
                      ? d['Signature Solutions/ Enablers'].split(',').indexOf(filteredSS) !== -1
                        ? 1
                        : 0.15
                      : 1;
                    return (
                      <circle
                        key={i}
                        cx={d.x}
                        cy={d.y}
                        r={radius}
                        fill={d.Year === 2022 ? '#805D93' : '#F49FBC'}
                        stroke={d.Year === 2022 ? '#805D93' : '#F49FBC'}
                        opacity={
                          mouseOverData
                            ? d['Signal Title (New)'] === mouseOverData['Signal Title (New)']
                              ? 1
                              : 0.15
                            : Math.min(opacitySDG, opacitySteep, opacityTheme, opacityHorizon, opacitySS)
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
                  <ModalEl
                    data={mouseClickData}
                    setMouseClickData={setMouseClickData}
                  />
                )
                  : null
              }
              {
                showHelp ? (
                  <Modal
                    className='undp-modal'
                    visible
                    title='How To Read This Chart'
                    onOk={() => { setShowHelp(false); }}
                    onCancel={() => { setShowHelp(false); }}
                    width={960}
                  >
                    <p className='undp-typography'>
                      Each dot represents on signal provided by colleagues.
                      <br />
                      <br />
                      On the X-axis are the timelines that were given to colleagues according to which they entered signals.
                      <br />
                      <br />
                      In Horizon Scanning 1.0 Short term is 2021-2022, Medium Term is 2023-2025 and Long Term is 2026-2030. Similarly, In Horizon Scanning 2.0 Short term is 2022-2023, Medium Term is 2024-2025 and Long Term is 2026-2030
                      <br />
                      <br />
                      On the Y axis is the risk score given by colleagues or calculated based on the product of average likelihood and impact of the signal (attributed manually by the research team based on the signals). More than the exact number of the risk, it is the ranges that are important.
                      <br />
                      <br />
                      On color is the year/round of horizon scanning exercise in which the signal was collected.
                      <br />
                      <br />
                      One insight that can be drawn from this is that colleagues think there are more signals in the short term than in the long term. Additionally, there are no low risk long term signals that were identified.
                    </p>
                  </Modal>
                )
                  : null
              }
            </>
          ) : <div className='undp-loader margin-top-09' />
        }
      </VizEl>
    </Container>
  );
};
