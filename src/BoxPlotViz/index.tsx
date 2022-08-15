import styled from 'styled-components';
import Data from '../Data/BoxPlotData.json';

const Container = styled.div`
  width: 100%;
  max-width: 128rem;
  margin: 3rem auto;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 3.6rem;
  margin: 0 1rem 2rem 0;
`;

const COLOR = ['#d7191c', '#fdae61', '#ffffbf', '#abdda4', '#2b83ba'];

export const BoxPlotViz = () => (
  <>
    <Container>
      <H1>
        Signal Survey Validation & Prioritization
      </H1>
      <svg width='100%' viewBox={`0 0 1280 ${(Data.length * 90) + 50}`}>
        {
          Data.map((d, i) => (
            <g transform={`translate(0,${(i * 90) + 50})`} key={i}>
              {
                [1, 2, 3, 4, 5].map((imp) => (
                  <rect
                    key={imp - 1}
                    x={(d.importanceArray.filter((el) => el < imp).length * 1280) / d.importanceArray.length}
                    y={22}
                    height={40}
                    fill={COLOR[imp - 1]}
                    width={(d.importanceArray.filter((el) => el === imp).length * 1280) / d.importanceArray.length}
                  />
                ))
              }
            </g>
          ))
        }
        {
          [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((d, i) => (
            <g key={i} transform={`translate(${(d * 1280) / 100}, 0)`}>
              <line
                x1={0}
                y1={30}
                x2={0}
                y2={(Data.length * 90) + 50}
                stroke='#AAA'
                strokeWidth={1}
                strokeDasharray='2, 2'
                fill='none'
              />
              <text
                x={0}
                y={30}
                dy={10}
                dx={d === 100 ? -5 : 5}
                fill='#222'
                fontSize={14}
                textAnchor={d === 100 ? 'end' : 'start'}
              >
                {d}
              </text>
            </g>
          ))
        }
        {
          Data.map((d, i) => (
            <g transform={`translate(0,${(i * 90) + 50})`} key={i}>
              <text
                fontSize={16}
                fontWeight='bold'
                x={0}
                y={0}
                dy={15}
                dx={0}
                fill='#001A5D'
              >
                {d.Signal}
              </text>
            </g>
          ))
        }
      </svg>
    </Container>
  </>
);
