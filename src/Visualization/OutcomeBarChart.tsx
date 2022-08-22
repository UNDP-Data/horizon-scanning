import { useState } from 'react';
import styled from 'styled-components';
import SignalSDG from '../Data/SignalSDG.json';

interface DataType {
  Office: string;
  Outcomes: string;
  SDGs: number;
}

interface MouseOverDataType {
  xPos: number;
  yPos: number;
  value: string;
  SDG: number;
}

interface Props {
  data: DataType[];
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
  border-radius: 0.2rem;
  font-size: 1.6rem;
  padding: 0.5rem 1rem;
  background-color: var(--white);
  box-shadow: 0 0 1rem rgb(0 0 0 / 15%);
  word-wrap: break-word;
  top: ${(props) => (props.verticalAlignment === 'bottom' ? props.y - 40 : props.y + 40)}px;
  left: ${(props) => (props.horizontalAlignment === 'left' ? props.x - 20 : props.x + 20)}px;
  max-width: 42rem;
  transform: ${(props) => `translate(${props.horizontalAlignment === 'left' ? '-100%' : '0%'},${props.verticalAlignment === 'top' ? '-100%' : '0%'})`};
`;

export const OutcomeBarChart = (props: Props) => {
  const {
    data,
    country,
  } = props;
  const [mouseOverData, setMouseOverData] = useState<MouseOverDataType | null>(null);
  const graphWidth = 1280;
  const graphHeight = 800;
  const leftPadding = 90;
  const barUnit = 70;
  const singlerbarHeight = 5;
  const OutcomeDataFiltered = data.filter((d) => d.Office === country);
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
                  >
                    {
                      SignalSDG.filter((el) => el.SDGs === d).map((el, j) => (
                        <rect
                          key={j}
                          x={0}
                          y={380 - ((j + 1) * singlerbarHeight) + 1}
                          width={55}
                          height={singlerbarHeight - 2}
                          fill={mouseOverData ? mouseOverData.value === el['Signal Title (New)'] && mouseOverData.SDG === el.SDGs ? '#212121' : '#EAEAEA' : '#AAA'}
                          onMouseOver={(event) => {
                            setMouseOverData({
                              SDG: el.SDGs, value: el['Signal Title (New)'], xPos: event.clientX, yPos: event.clientY,
                            });
                          }}
                          onMouseMove={(event) => {
                            setMouseOverData({
                              SDG: el.SDGs, value: el['Signal Title (New)'], xPos: event.clientX, yPos: event.clientY,
                            });
                          }}
                          onMouseLeave={() => { setMouseOverData(null); }}
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
                          fill={mouseOverData ? mouseOverData.value === el.Outcomes && mouseOverData.SDG === el.SDGs ? '#212121' : '#EAEAEA' : '#AAA'}
                          onMouseOver={(event) => {
                            setMouseOverData({
                              SDG: el.SDGs, value: el.Outcomes, xPos: event.clientX, yPos: event.clientY,
                            });
                          }}
                          onMouseMove={(event) => {
                            setMouseOverData({
                              SDG: el.SDGs, value: el.Outcomes, xPos: event.clientX, yPos: event.clientY,
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
              <TooltipEl x={mouseOverData.xPos} y={mouseOverData.yPos} verticalAlignment={mouseOverData.yPos > window.innerHeight / 2 ? 'top' : 'bottom'} horizontalAlignment={mouseOverData.xPos > window.innerWidth / 2 ? 'left' : 'right'}>
                {mouseOverData.value}
              </TooltipEl>
            )
              : null
          }
        </>
      </VizEl>
    </Container>
  );
};
