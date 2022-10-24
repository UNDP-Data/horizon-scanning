import styled from 'styled-components';
import {
  COLORVALUES, SDGCOLOR, SSCOLOR, STEEPVCOLOR,
} from '../Constants';
import { SignalDataType } from '../Types';
import '../style/chipStyle.css';

interface Props {
  data: SignalDataType ;
}

const HeadingEl = styled.div`
  margin: 1rem 0 0 0;
  font-size: 1rem;
  font-weight: bold;
  line-height: 1.25rem;
`;

const HR = styled.hr`
  border-top: 1px solid var(--gray-300);
`;

export const CardEl = (props: Props) => {
  const {
    data,
  } = props;
  return (
    <>
      <div>
        <h5 className='bold undp-typography'>
          {data['Signal Title (New)']}
        </h5>
        <div className='flex-div flex-wrap'>
          {
            data['STEEP+V'].split(',').map((d, i) => (
              <div
                className='undp-chip'
                key={i}
                style={{
                  backgroundColor: STEEPVCOLOR.findIndex((el) => el.value === d) === -1 ? '#EAEAEA' : STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === d)].bgColor,
                  color: STEEPVCOLOR.findIndex((el) => el.value === d) === -1 ? '#000' : STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === d)].textColor,
                }}
              >
                {d}
              </div>
            ))
          }
          {
            data['Key Themes'].split(',').map((d, i) => (d !== ''
              ? (
                <div
                  className='undp-chip'
                  key={i}
                >
                  {d}
                </div>
              )
              : null
            ))
          }
        </div>
      </div>
      <div>
        <HR className='margin-top-06' />
        <HeadingEl>Horizon</HeadingEl>
        <div
          className='undp-chip margin-top-03'
          style={{
            backgroundColor: data.Horizon ? COLORVALUES[data.Horizon] : '#AAA',
          }}
        >
          {data.Horizon ? data.Horizon : 'Horizon NA'}
        </div>
        <HR className='margin-top-06' />
        <HeadingEl>Signature Solutions/Enablers</HeadingEl>
        <div className='flex-div flex-wrap margin-top-03'>
          {
              data['Signature Solutions/ Enablers'].split(',').map((d, i) => (d !== '' ? (
                <div
                  key={i}
                  className='undp-chip'
                  style={{
                    backgroundColor: SSCOLOR.findIndex((el) => el.value === d) !== -1 ? SSCOLOR[SSCOLOR.findIndex((el) => el.value === d)].bgColor : '#AAA',
                    color: SSCOLOR.findIndex((el) => el.value === d) !== -1 ? SSCOLOR[SSCOLOR.findIndex((el) => el.value === d)].textColor : 'var(--black)',
                  }}
                >
                  {d}
                </div>
              ) : null))
            }
        </div>
        <HR className='margin-top-06' />
        <HeadingEl>SDGs</HeadingEl>
        <div className='flex-div flex-wrap margin-top-03'>
          {
            data.SDGs
              ? (
                <>
                  {
                    data.SDGs.split(',').map((d, i) => (
                      <div
                        key={i}
                        className='undp-chip'
                        style={{
                          backgroundColor: SDGCOLOR[SDGCOLOR.findIndex((el) => el.value === d)].bgColor,
                          color: SDGCOLOR[SDGCOLOR.findIndex((el) => el.value === d)].textColor,
                        }}
                      >
                        {d}
                      </div>
                    ))
                  }
                </>
              )
              : 'NA'
          }
        </div>
        <HR className='margin-top-06' />
        <HeadingEl>
          {data['Survey Risk (Average)'] ? 'Risk Score based on Survey Average' : 'Risk Score Avg. of Likelihood and Impact'}
        </HeadingEl>
        <div
          className='undp-chip undp-chip-blue bold margin-top-03'
        >
          {
            data['Survey Risk (Average)'] ? data['Survey Risk (Average)']?.toFixed(1) : data['Risk score (L x I)']
          }
        </div>
      </div>
    </>
  );
};
