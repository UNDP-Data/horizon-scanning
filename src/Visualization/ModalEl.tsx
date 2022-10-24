import styled from 'styled-components';
import { Modal } from 'antd';
import { SignalDataType } from '../Types';
import {
  COLORVALUES, SDGCOLOR, SSCOLOR, STEEPVCOLOR,
} from '../Constants';

import '../style/modalStyle.css';

interface Props {
  data: SignalDataType;
  setMouseClickData: (_d: null) => void;
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

const ButtonEl = styled.button`
  padding: 1rem 1.5rem !important;
  background-color: var(--primary-blue) !important;
  color: var(--white) !important;
  font-weight: bold !important;
  font-size: 1.6rem !important;
  text-transform: uppercase;
  border: 0 !important;
`;

export const ModalEl = (props: Props) => {
  const {
    data,
    setMouseClickData,
  } = props;
  return (
    <Modal
      className='undp-modal'
      visible
      title={data['Signal Title (New)']}
      onOk={() => { setMouseClickData(null); }}
      onCancel={() => { setMouseClickData(null); }}
      footer={[
        <ButtonEl onClick={() => { setMouseClickData(null); }}>
          Done
        </ButtonEl>,
      ]}
      width={960}
    >
      <div className='flex-div flex-wrap margin-bottom-05'>
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
      <p className='undp-typography'>
        {data['Signal Description']}
      </p>
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
      <HeadingEl>Impact and Relevance to UNDP</HeadingEl>
      <p className='undp-typography margin-top-05'>
        {data['Impact/ Relevance UNDP']}
      </p>
      <HR className='margin-top-06' />
      <div className='flex-div flex-vert-align-center margin-top-06'>
        <HeadingEl style={{ margin: 0 }}>
          {data['Survey Risk (Average)'] ? 'Risk Score based on Survey Average' : 'Risk Score Avg. of Likelihood and Impact'}
        </HeadingEl>
        <div
          className='undp-chip undp-chip-blue bold'
        >
          {
            data['Survey Risk (Average)'] ? data['Survey Risk (Average)']?.toFixed(1) : data['Risk score (L x I)']
          }
        </div>
      </div>
      <HR className='margin-top-06' />
      <HeadingEl>Sources</HeadingEl>
      <ul style={{ padding: '0 0 0 1rem' }}>
        {
          data.Sources?.split('\n').filter((d) => d !== '' && d !== ' ').length === 0 ? null
            : (
              <>
                {
                    data.Sources?.split('\n').filter((d) => d !== '' && d !== ' ').map((d, i) => (
                      <li key={i}>
                        {
                          d.substring(0, 4) === 'http'
                            ? <a href={d} target='_blank' rel='noreferrer' className='undp-style'>{d}</a> : <>{d}</>
                        }
                      </li>
                    ))
                  }
              </>
            )
        }
        {
          data['Sources II']?.split('\n').filter((d) => d !== '' && d !== ' ').length === 0 ? null
            : (
              <>
                {
                    data['Sources II']?.split('\n').filter((d) => d !== '' && d !== ' ').map((d, i) => (
                      <li key={i}>
                        {
                          d.substring(0, 4) === 'http'
                            ? <a href={d} target='_blank' rel='noreferrer' className='undp-style'>{d}</a> : <>{d}</>
                        }
                      </li>
                    ))
                  }
              </>
            )
        }
      </ul>
    </Modal>
  );
};
