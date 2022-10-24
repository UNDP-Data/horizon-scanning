/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import styled from 'styled-components';
import Data from '../Data/Signal-2022.json';
import { SignalDataType } from '../Types';
import { Cards } from './Cards';
import { ModalEl } from './ModalEl';

interface Props {
  filteredSDG: string;
  filteredSteep: string;
  filteredYear: string;
  filteredTheme: string;
  filteredSS: string;
}

const CardEl = styled.div`
  border-radius: 0.4rem;
  font-size: 1.4rem;
  padding: 1.25rem;
  background-color: var(--gray-100);
  word-wrap: break-word;
  width: calc(33.33% - 0.67rem);
  cursor: pointer;
`;

export const CardLayout = (props: Props) => {
  const {
    filteredSDG,
    filteredSteep,
    filteredYear,
    filteredTheme,
    filteredSS,
  } = props;
  const [mouseClickData, setMouseClickData] = useState<SignalDataType | null>(null);
  const DataFilterBySDG = filteredSDG === 'All SDGs' ? [...Data] : Data.filter((d) => d.SDGs.split(',').indexOf(filteredSDG) !== -1);
  const DataFilterBySteep = filteredSteep === 'All STEEP+V' ? [...DataFilterBySDG] : DataFilterBySDG.filter((d) => (d['STEEP+V']) && (d['STEEP+V'].split(',').indexOf(filteredSteep) !== -1));
  const DataFilterByHorizon = filteredYear === 'All Years' ? [...DataFilterBySteep] : DataFilterBySteep.filter((d) => (d.Year === parseInt(filteredYear, 10)));
  const DataFilterByTheme = filteredTheme === 'All Themes' ? [...DataFilterByHorizon] : DataFilterByHorizon.filter((d) => (d['Key Themes'].split(',').indexOf(filteredTheme.split('__')[0]) !== -1));
  const DataFilteredBySS = filteredSS === 'All Signature Solutions/Enabler' ? [...DataFilterByTheme] : DataFilterByTheme.filter((d) => (d['Signature Solutions/ Enablers'].split(',').indexOf(filteredSS) !== -1));
  return (
    <>
      <div className='flex-div flex-wrap'>
        {
          DataFilteredBySS.map((d, i) => <CardEl onClick={() => { setMouseClickData(d as SignalDataType); }} key={i}><Cards data={d as SignalDataType} /></CardEl>)
        }
      </div>
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
  );
};
