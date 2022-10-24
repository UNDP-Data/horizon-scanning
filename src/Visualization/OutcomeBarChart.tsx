import { useState } from 'react';
import styled from 'styled-components';
import sortBy from 'lodash.sortby';
import uniqBy from 'lodash.uniqby';
import Data from '../Data/Signal-2022.json';
import { Tooltip } from './tooltip';
import { ModalEl } from './ModalEl';
import { OutcomeDataType, OutcomeMouseOverDataType } from '../Types';
import { OutcomeTooltip } from './OutcomeTooltip';
import { COLORARRAY } from '../Constants';

interface Props {
  data: OutcomeDataType[];
  country: string;
}

const VizEl = styled.div`
  display: flex;
  justify-content: center;
  max-width: 128rem;
  width: 100%;
  margin: auto;
`;

const Container = styled.div`
  width: 100%;
  max-width: 128rem;
`;

const COLOR = ['#fdd0a2', '#fdae6b', '#fd8d3c', '#e6550d', '#a63603'];

const OutcomeColorKeyEl = styled.div`
  font-size: 0.875rem;
  display: flex;
  margin-bottom: 0.5rem;
`;

const OutcomeColorKey = styled.div`
  margin-left: 7.8125%;
  transform: translate(0%,calc(-100% - 60px));
`;

const OutcomeColorBox = styled.div`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  margin-right: 5px;
  margin-top: 1px;
`;

const TextEl = styled.div`
  width: calc(100% - 2.1rem);
`;

export const OutcomeBarChart = (props: Props) => {
  const {
    data,
    country,
  } = props;
  const [mouseOverData, setMouseOverData] = useState<OutcomeMouseOverDataType | null>(null);
  const [signalMouseOverData, setSignalMouseOverData] = useState<any>(null);
  const [mouseClickData, setMouseClickData] = useState<any>(null);
  const graphWidth = 1280;
  const graphHeight = 800;
  const leftPadding = 90;
  const barUnit = 70;
  const singlerbarHeight = 5;
  const OutcomeDataFiltered = data.filter((d) => d.Office === country);
  const ProgrammeOutcomeList = uniqBy(OutcomeDataFiltered, 'UNSDCF/ Programme Outcome').map((d) => d['UNSDCF/ Programme Outcome']);
  const dataFormated = Data.map((d) => {
    const SDGsCode = d.SDGs.split(',').map((sdg) => `SDG ${sdg.split('.')[0]}`);
    const riskScore = d['Survey Risk (Average)'] || d['Risk score (L x I)'];
    return { ...d, SDGsCode, riskScore };
  });
  const SDGArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  return (
    <Container>
      <VizEl>
        <>
          <svg width='100%' viewBox={`0 0 ${graphWidth} ${graphHeight}`}>
            <text
              fontSize={16}
              textAnchor='middle'
              transform={`translate(75,${380 / 2}) rotate(-90)`}
              fontWeight='bold'
            >
              No. of Signals →
            </text>
            <text
              fontSize={16}
              textAnchor='middle'
              transform={`translate(75,${410 + (390 / 2)}) rotate(-90)`}
              fontWeight='bold'
            >
              ← No. of Outcomes in programme doc.
            </text>
            <g
              transform={`translate(${leftPadding},0)`}
            >
              {
                SDGArray.map((d, i) => (
                  <text
                    fontSize={14}
                    textAnchor='middle'
                    fontWeight='bold'
                    x={barUnit * i + (barUnit / 2)}
                    y={400}
                    key={i}
                  >
                    SDG
                    {' '}
                    {d}
                  </text>
                ))
              }
              {
                SDGArray.map((d, i) => (
                  <g
                    transform={`translate(${barUnit * i + 10},0)`}
                    key={i}
                  >
                    {
                      sortBy(dataFormated.filter((el) => el.SDGsCode.indexOf(`SDG ${d}`) !== -1), 'riskScore').map((el, j) => (
                        <rect
                          key={j}
                          x={0}
                          y={380 - ((j + 1) * singlerbarHeight) + 1}
                          fill={COLOR[Math.floor(el.riskScore) - 1]}
                          width={55}
                          height={singlerbarHeight - 2}
                          opacity={mouseOverData ? 0.2 : signalMouseOverData ? signalMouseOverData['Signal Title (New)'] === el['Signal Title (New)'] ? 1 : 0.2 : 1}
                          onMouseLeave={() => { setSignalMouseOverData(null); }}
                          onMouseOver={(event) => { setSignalMouseOverData({ ...el, xPos: event.clientX, yPos: event.clientY }); }}
                          onClick={() => { setSignalMouseOverData(null); setMouseClickData({ ...el }); }}
                          onMouseMove={(event) => { setSignalMouseOverData({ ...el, xPos: event.clientX, yPos: event.clientY }); }}
                        />
                      ))
                    }
                    {
                      OutcomeDataFiltered.filter((el) => el.SDGs === d).map((el, j) => (
                        <rect
                          key={j}
                          x={0}
                          y={410 + ((j) * singlerbarHeight) + 1}
                          width={55}
                          height={singlerbarHeight - 2}
                          opacity={mouseOverData ? mouseOverData['Cooperation Framework Outcome Indicator(s)'] === el['Cooperation Framework Outcome Indicator(s)'] && mouseOverData.SDGs === el.SDGs ? 1 : 0.2 : 1}
                          fill={COLORARRAY[ProgrammeOutcomeList.indexOf(el['UNSDCF/ Programme Outcome']) % 6]}
                          onMouseOver={(event) => {
                            setMouseOverData({
                              ...el, xPos: event.clientX, yPos: event.clientY,
                            });
                          }}
                          onMouseMove={(event) => {
                            setMouseOverData({
                              ...el, xPos: event.clientX, yPos: event.clientY,
                            });
                          }}
                          onMouseLeave={() => { setMouseOverData(null); }}
                        />
                      ))
                    }
                  </g>
                ))
              }
            </g>
          </svg>
          {
            mouseOverData ? (
              <OutcomeTooltip
                data={mouseOverData}
              />
            )
              : null
          }
          {
            signalMouseOverData ? (
              <Tooltip
                data={signalMouseOverData}
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
        </>
      </VizEl>
      <OutcomeColorKey>
        {
          ProgrammeOutcomeList.map((d, i) => (
            <OutcomeColorKeyEl key={i}>
              <OutcomeColorBox style={{ backgroundColor: COLORARRAY[i % 6] }} />
              <TextEl>{d}</TextEl>
            </OutcomeColorKeyEl>
          ))
        }
      </OutcomeColorKey>
    </Container>
  );
};
