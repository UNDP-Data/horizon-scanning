import styled from 'styled-components';
import { Select } from 'antd';
import { useState } from 'react';
import uniqBy from 'lodash.uniqby';
import { SDGCOLOR, SSCOLOR, STEEPVCOLOR } from '../Constants';
import { CardLayout } from './CardLayout';
import { BubbleChart } from './BubbleChart';
import { OutcomeBarChart } from './OutcomeBarChart';
import Data from '../Data/Signal-2022.json';
import OutcomeData from '../Data/Outcomes.json';

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
  width: calc(20% - 2rem);
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

const Container = styled.div`
  display:flex;
  justify-content: space-between;
  width: 100%;
  max-width: 128rem;
  margin: 3rem auto;
  align-items: center;
`;

const H1 = styled.h1`
  font-size: 3.6rem;
  margin: 0 1rem 0 0;

`;

export const Visualization = () => {
  const [filteredSteep, setFilteredSteep] = useState<string>('All STEEP+V');
  const [filteredSDG, setFilteredSDG] = useState<string>('All SDGs');
  const [outcomeCountry, setOutcomeCountry] = useState<string>('Bangladesh');
  const [filteredYear, setFilteredYear] = useState<string>('All Years');
  const [filteredSS, setFilteredSS] = useState<string>('All Signature Solutions/Enabler');
  const [filteredTheme, setFilteredTheme] = useState<string>('All Themes');
  const [chartType, setChartType] = useState<'Bubble Chart' | 'Card View' | 'Country Bar Chart'>('Bubble Chart');
  const THEMELIST: string[] = [];
  const COUNTRYLIST: string[] = [];
  Data.forEach((d) => {
    d['Key Themes'].split(',').forEach((theme) => {
      if (THEMELIST.indexOf(theme) === -1) THEMELIST.push(theme);
    });
  });
  Data.forEach((d) => {
    if (d['BRH/ CO']) if (COUNTRYLIST.indexOf(d['BRH/ CO']) === -1) COUNTRYLIST.push(d['BRH/ CO']);
  });
  const OutcomeCountries = uniqBy(OutcomeData, 'Office').map((d) => d.Office);
  return (
    <>
      <Container>
        <H1>
          Horizon Scanning
        </H1>
        <ToggleContainer>
          <ToggleEl selected={chartType === 'Bubble Chart'} onClick={() => { setChartType('Bubble Chart'); }}>Signal Overview</ToggleEl>
          <ToggleEl selected={chartType === 'Country Bar Chart'} onClick={() => { setChartType('Country Bar Chart'); }}>Signal Prioritization</ToggleEl>
          <ToggleEl selected={chartType === 'Card View'} onClick={() => { setChartType('Card View'); }}>Signal Description</ToggleEl>
        </ToggleContainer>
      </Container>
      {
        chartType === 'Card View' || chartType === 'Bubble Chart' ? (
          <>
            <SettingsEl>
              <SelectionEl>
                <Select
                  className='select-box'
                  style={{ width: '100%' }}
                  placeholder='Please select'
                  defaultValue='All STEEP+V'
                  value={filteredSteep}
                  showSearch
                  allowClear
                  onChange={(values) => { setFilteredSteep(values || 'All STEEP+V'); }}
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
                  defaultValue='All Signature Solutions/Enabler'
                  value={filteredSS}
                  showSearch
                  allowClear
                  onChange={(values) => { setFilteredSS(values || 'All Signature Solutions/Enabler'); }}
                >
                  <Select.Option key='All Signature Solutions/Enabler'>All Signature Solutions/Enabler</Select.Option>
                  {
                SSCOLOR.map((d) => <Select.Option key={d.value}>{d.value}</Select.Option>)
              }
                </Select>
              </SelectionEl>
              <SelectionEl>
                <Select
                  className='select-box'
                  style={{ width: '100%' }}
                  placeholder='Please select'
                  defaultValue='All SDGs'
                  value={filteredSDG}
                  showSearch
                  allowClear
                  onChange={(values) => { setFilteredSDG(values || 'All SDGs'); }}
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
                  allowClear
                  value={filteredTheme}
                  defaultValue='All Themes'
                  onChange={(values) => { setFilteredTheme(values || 'All Themes'); }}
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
                  defaultValue='All Years'
                  onChange={(values) => { setFilteredYear(values || 'All Years'); }}
                >
                  <Select.Option key='All Years'>All Years</Select.Option>
                  <Select.Option key='2021'>2021</Select.Option>
                  <Select.Option key='2022'>2022</Select.Option>
                </Select>
              </SelectionEl>
            </SettingsEl>
            <VizEl>
              {
                chartType === 'Card View'
                  ? (
                    <CardLayout
                      filteredSDG={filteredSDG}
                      filteredSteep={filteredSteep}
                      filteredYear={filteredYear}
                      filteredTheme={filteredTheme}
                      filteredSS={filteredSS}
                    />
                  )
                  : (
                    <BubbleChart
                      filteredSDG={filteredSDG}
                      filteredSteep={filteredSteep}
                      filteredYear={filteredYear}
                      filteredTheme={filteredTheme}
                      filteredSS={filteredSS}
                    />
                  )
              }
            </VizEl>
          </>
        ) : (
          <>
            <SettingsEl>
              <Select
                className='select-box'
                style={{ width: '100%' }}
                placeholder='Please select'
                defaultValue='All STEEP+V'
                value={outcomeCountry}
                showSearch
                allowClear
                onChange={(values) => { setOutcomeCountry(values); }}
              >
                {
                  OutcomeCountries.map((d) => <Select.Option key={d}>{d}</Select.Option>)
                }
              </Select>
            </SettingsEl>
            <VizEl>
              <OutcomeBarChart
                country={outcomeCountry}
                data={OutcomeData}
              />
            </VizEl>
          </>
        )
      }
    </>
  );
};
