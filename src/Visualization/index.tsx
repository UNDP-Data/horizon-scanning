import styled from 'styled-components';
import { Select, Segmented, Modal } from 'antd';
import { useState } from 'react';
import uniqBy from 'lodash.uniqby';
import { SDGCOLOR, SSCOLOR, STEEPVCOLOR } from '../Constants';
import { CardLayout } from './CardLayout';
import { BubbleChart } from './BubbleChart';
import { OutcomeBarChart } from './OutcomeBarChart';
import Data from '../Data/Signal-2022.json';
import OutcomeData from '../Data/Outcomes.json';

import '../style/segmentedStyle.css';
import '../style/selectStyle.css';

const VizEl = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 128rem;
  margin: auto;
`;

const COLORVALUES = ['← Low', 'a', 'a', 'a', 'High →'];

const ColorBox = styled.div`
  width: 3rem;
  height: 0.75rem;
`;

const COLOR = ['#fdd0a2', '#fdae6b', '#fd8d3c', '#e6550d', '#a63603'];

export const Visualization = () => {
  const [filteredSteep, setFilteredSteep] = useState<string>('All STEEP+V');
  const [filteredSDG, setFilteredSDG] = useState<string>('All SDGs');
  const [outcomeCountry, setOutcomeCountry] = useState<string>('Bangladesh');
  const [filteredYear, setFilteredYear] = useState<string>('All Years');
  const [filteredSS, setFilteredSS] = useState<string>('All Signature Solutions/Enabler');
  const [filteredTheme, setFilteredTheme] = useState<string>('All Themes');
  const [showHelp, setShowHelp] = useState(false);
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
      <div className='flex-div flex-space-between flex-vert-align-center margin-top-09 margin-bottom-09'>
        <h2 className='undp-typography' style={{ marginBottom: 0 }}>
          Horizon Scanning
        </h2>
        <Segmented
          className='undp-segmented'
          options={
            [
              {
                label: 'Signal Overview',
                value: 'Bubble Chart',
              },
              {
                label: 'Signal Prioritization',
                value: 'Country Bar Chart',
              },
              {
                label: 'Signal Description',
                value: 'Card View',
              },
            ]
          }
          onChange={(value) => { setChartType(value as 'Bubble Chart' | 'Card View' | 'Country Bar Chart'); }}
        />
      </div>
      {
        chartType === 'Card View' || chartType === 'Bubble Chart' ? (
          <>
            <div className='flex-div margin-bottom-07 flex-wrap'>
              <Select
                className='undp-select'
                style={{ width: 'calc(20% - 0.8rem)' }}
                placeholder='Please select'
                defaultValue='All STEEP+V'
                value={filteredSteep}
                showSearch
                allowClear
                onChange={(values) => { setFilteredSteep(values || 'All STEEP+V'); }}
                clearIcon={<div className='clearIcon' />}
              >
                <Select.Option className='undp-select-option' key='All STEEP+V'>All STEEP+V</Select.Option>
                {
                    STEEPVCOLOR.map((d) => <Select.Option className='undp-select-option' key={d.value}>{d.value}</Select.Option>)
                  }
              </Select>
              <Select
                className='undp-select'
                style={{ width: 'calc(20% - 0.8rem)' }}
                placeholder='Please select'
                defaultValue='All Signature Solutions/Enabler'
                value={filteredSS}
                showSearch
                allowClear
                onChange={(values) => { setFilteredSS(values || 'All Signature Solutions/Enabler'); }}
                clearIcon={<div className='clearIcon' />}
              >
                <Select.Option className='undp-select-option' key='All Signature Solutions/Enabler'>All Signature Solutions/Enabler</Select.Option>
                {
                  SSCOLOR.map((d) => <Select.Option className='undp-select-option' key={d.value}>{d.value}</Select.Option>)
                }
              </Select>
              <Select
                className='undp-select'
                style={{ width: 'calc(20% - 0.8rem)' }}
                placeholder='Please select'
                defaultValue='All SDGs'
                value={filteredSDG}
                showSearch
                allowClear
                onChange={(values) => { setFilteredSDG(values || 'All SDGs'); }}
                clearIcon={<div className='clearIcon' />}
              >
                <Select.Option className='undp-select-option' key='All SDGs'>All SDGs</Select.Option>
                {
                  SDGCOLOR.map((d) => <Select.Option className='undp-select-option' key={d.value}>{d.value}</Select.Option>)
                }
              </Select>
              <Select
                className='undp-select'
                style={{ width: 'calc(20% - 0.8rem)' }}
                placeholder='Please select'
                showSearch
                allowClear
                value={filteredTheme}
                defaultValue='All Themes'
                onChange={(values) => { setFilteredTheme(values || 'All Themes'); }}
                clearIcon={<div className='clearIcon' />}
              >
                <Select.Option className='undp-select-option' key='All Themes'>All Themes</Select.Option>
                {
                  THEMELIST.map((d, i) => <Select.Option className='undp-select-option' key={`${d}__${i}`}>{d}</Select.Option>)
                }
              </Select>
              <Select
                className='undp-select'
                style={{ width: 'calc(20% - 0.8rem)' }}
                placeholder='Please select'
                defaultValue='All Years'
                onChange={(values) => { setFilteredYear(values || 'All Years'); }}
              >
                <Select.Option className='undp-select-option' key='All Years'>All Years</Select.Option>
                <Select.Option className='undp-select-option' key='2021'>2021</Select.Option>
                <Select.Option className='undp-select-option' key='2022'>2022</Select.Option>
              </Select>
            </div>
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
            <Select
              className='undp-select margin-bottom-05'
              placeholder='Please select'
              defaultValue='All STEEP+V'
              value={outcomeCountry}
              showSearch
              onChange={(values) => { setOutcomeCountry(values); }}
            >
              {
                OutcomeCountries.filter((d) => d !== 'RPD').map((d) => <Select.Option className='undp-select-option' key={d}>{d}</Select.Option>)
              }
            </Select>
            <div className='flex-div flex-space-between flex-vert-align-center margin-bottom-07 flex-wrap'>
              <div className='flex-div flex-wert-align-center flex-wrap' style={{ width: '15rem', gap: 0 }}>
                <p className='bold' style={{ width: '15rem', margin: 0 }}>Risk Score</p>
                <div className='flex-div flex-wert-align-center margin-bottom-07' style={{ gap: 0 }}>
                  {
                    COLOR.map((d, i) => (
                      <div style={{ fontSize: '0.875rem' }} key={i}>
                        <ColorBox style={{ backgroundColor: d }} />
                        <div style={{ color: `${i !== 0 && i !== 4 ? '#fff' : '#000'}`, textAlign: `${i !== 4 ? 'left' : 'right'}` }}>{COLORVALUES[i]}</div>
                      </div>
                    ))
                  }
                </div>
              </div>
              <button type='button' className='undp-button button-tertiary button-arrow' onClick={() => { setShowHelp(!showHelp); }}>How To Read</button>
            </div>
            <VizEl>
              <OutcomeBarChart
                country={outcomeCountry}
                data={OutcomeData}
              />
            </VizEl>
          </>
        )
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
              This visual has two aspects – the division of signals by SDGs collected throughout the Horizon Scanning 2.0 exercise (top half) and the number of outcomes taken from the Country Programme Documents of each country categorized by SDG (bottom half).
              <br />
              <br />
              On X axis, for both components are the 17 SDGs.
              <br />
              <br />
              For the top half, the Y axis is the number of signals in that particular SDG. These signals were categorized to SDGs manually. One Signal can belong to multiple SDGs.
              <br />
              <br />
              On color, is the risk of that signal given by the survey participants.
              <br />
              <br />
              For the bottom half, the Y axis is the number of outcomes taken from the Country Programme Document of the country chosen (on filter), in an SDG. These outcomes were also categorized manually and one outcome can belong to multiple SDGs.
              <br />
              <br />
              On color is the Strategic Plan document name.
              <br />
              <br />
              By comparing the two aspects, insights can be drawn about the number of signals in an SDG vs the number of outcomes that country is capturing for that SDG. For example, in the case of India, no CPD focusses on SDG 9, a Development Goal that has multiple identified signals of medium to high risk.
              <br />
              <br />
              From this insight, a user can then reflect if India must include more outcomes for SDG 9 in their CPD or if it is justifiable that they focus on other SDGs.
            </p>
          </Modal>
        )
          : null
      }
    </>
  );
};
