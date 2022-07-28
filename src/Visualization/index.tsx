import styled from 'styled-components';
import { Select } from 'antd';
import { useState } from 'react';
import flattenDeep from 'lodash.flattendeep';
import sortedUniq from 'lodash.sorteduniq';
import uniq from 'lodash.uniq';
import { SDGCOLOR, STEEPVCOLOR } from '../Constants';
import { CardLayout } from './CardLayout';
import { BubbleChart } from './BubbleChart';
import Data from '../data.json';

const SettingsEl = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 128rem;
  margin: auto;
  margin-bottom: 4rem;
`;

const VizEl = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 128rem;
  margin: auto;
`;

const SelectionEl = styled.div`
  width: calc(30% - 17rem);
  font-size: 1.4rem;
`;

const ToggleContainer = styled.div`
  height: 5.2rem;
  border: 2px solid #000;
  display: flex;
`;

interface ToggleDataType {
  selected: boolean;
}

const ToggleEl = styled.div<ToggleDataType>`
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1rem 2rem;
  align-items: center;
  text-transform: uppercase;
  color: ${(props) => (props.selected ? 'var(--white)' : 'var(--black-700)')};;
  cursor: pointer;
  background-color: ${(props) => (props.selected ? 'var(--primary-blue)' : 'var(--white)')};  
`;

export const Visualization = () => {
  const [filteredSteep, setFilteredSteep] = useState<string>('All STEEP+V');
  const [filteredSDG, setFilteredSDG] = useState<string>('All SDGs');
  const [filteredHorizon, setFilteredHorizon] = useState<string>('All Horizons');
  const [filteredTheme, setFilteredTheme] = useState<string>('All Themes');
  const [chartType, setChartType] = useState<'Bubble Chart' | 'Card View'>('Bubble Chart');
  const HORIZONLIST = sortedUniq(uniq(Data.map((d) => d.fields.Horizon))).filter((d) => d !== undefined);
  const THEMELIST = sortedUniq(flattenDeep(Data.map((d) => d.fields['Key themes']))).filter((d) => d !== undefined);
  return (
    <>
      <SettingsEl>
        <SelectionEl>
          <Select
            className='select-box'
            style={{ width: '100%' }}
            placeholder='Please select'
            defaultValue='All STEEP+V'
            onChange={(values) => { setFilteredSteep(values); }}
          >
            <Select.Option key='All STEEP+V'>All STEEP+V</Select.Option>
            {
              STEEPVCOLOR.map((d) => <Select.Option key={d.value}>{d.value}</Select.Option>)
            }
          </Select>
        </SelectionEl>
        <SelectionEl>
          <Select
            className='select-box'
            style={{ width: '100%' }}
            placeholder='Please select'
            defaultValue='All SDGs'
            onChange={(values) => { setFilteredSDG(values); }}
          >
            <Select.Option key='All SDGs'>All SDGs</Select.Option>
            {
              SDGCOLOR.map((d) => <Select.Option key={d.value}>{d.value}</Select.Option>)
            }
          </Select>
        </SelectionEl>
        <SelectionEl>
          <Select
            className='select-box'
            style={{ width: '100%' }}
            placeholder='Please select'
            showSearch
            defaultValue='All Themes'
            onChange={(values) => { setFilteredTheme(values); }}
          >
            <Select.Option key='All Themes'>All Themes</Select.Option>
            {
              THEMELIST.map((d, i) => <Select.Option key={`${d}__${i}`}>{d}</Select.Option>)
            }
          </Select>
        </SelectionEl>
        <SelectionEl>
          <Select
            className='select-box'
            style={{ width: '100%' }}
            placeholder='Please select'
            defaultValue='All Horizons'
            onChange={(values) => { setFilteredHorizon(values); }}
          >
            <Select.Option key='All Horizons'>All Horizons</Select.Option>
            {
              HORIZONLIST.map((d) => <Select.Option key={`${d}`}>{d}</Select.Option>)
            }
          </Select>
        </SelectionEl>
        <ToggleContainer>
          <ToggleEl selected={chartType === 'Bubble Chart'} onClick={() => { setChartType('Bubble Chart'); }}>Bubble Chart</ToggleEl>
          <ToggleEl selected={chartType === 'Card View'} onClick={() => { setChartType('Card View'); }}>Card View</ToggleEl>
        </ToggleContainer>
      </SettingsEl>
      <VizEl>
        {
          chartType === 'Card View'
            ? (
              <CardLayout
                filteredSDG={filteredSDG}
                filteredSteep={filteredSteep}
                filteredHorizon={filteredHorizon}
                filteredTheme={filteredTheme}
              />
            )
            : (
              <BubbleChart
                filteredSDG={filteredSDG}
                filteredSteep={filteredSteep}
                filteredHorizon={filteredHorizon}
                filteredTheme={filteredTheme}
              />
            )
        }
      </VizEl>
    </>
  );
};
