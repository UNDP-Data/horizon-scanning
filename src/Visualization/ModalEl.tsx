import styled from 'styled-components';
import { Modal } from 'antd';
import { SignalDataType } from '../Types';
import {
  COLORVALUES, SDGCOLOR, SSCOLOR, STEEPVCOLOR,
} from '../Constants';

interface Props {
  data: SignalDataType;
  setMouseClickData: (_d: null) => void;
}

const SignalTitleEl = styled.div`
  margin: 2rem 0 1rem 0;
  font-size: 2.4rem;
  font-weight: bold;
  line-height: 2.8rem;
`;

const ModalTitleEl = styled.div`
  margin: 2rem 0 0 0;
  font-size: 1.8rem;
  font-weight: bold;
  line-height: 3rem;
`;

const ModalBodyEl = styled.div`
  margin: 0.5rem 0 1rem 0;
  font-size: 1.6rem;
  line-height: 2.4rem;
`;

interface ChipElDataType {
  bgColor?: string;
  fontColor?:string;
}

const ChipEl = styled.div<ChipElDataType>`
  padding: 0.5rem 1rem;
  font-size: 1.4rem;
  background-color: ${(props) => (props.bgColor ? props.bgColor : 'var(--blue-bg)')};
  color: ${(props) => (props.fontColor ? props.fontColor : 'var(--black)')};
  border-radius: 5rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
`;

const FlexEl = styled.div`
  display: flex;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
`;

const DivValuesEl = styled.div`
  display: flex;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  align-items: center;
`;

const HR = styled.hr`
  margin: 2rem  0 1rem 0;
  border-top: 1px solid var(--black-100);
`;

const ValueSpan = styled.div`
  background-color: #efdbff;
  color: #391085;
  text-align: center;
  margin-left: 0.5rem;
  padding: 0 1rem;
  align-items: center;
  display: flex;
  border-radius: 3rem;
  justify-content: center;
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
      <SignalTitleEl>{data['Signal Title (New)']}</SignalTitleEl>
      <FlexEl>
        {
          data['STEEP+V'].split(',').map((d, i) => (
            <ChipEl
              key={i}
              bgColor={STEEPVCOLOR.findIndex((el) => el.value === d) === -1 ? '#EAEAEA' : STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === d)].bgColor}
              fontColor={STEEPVCOLOR.findIndex((el) => el.value === d) === -1 ? '#000' : STEEPVCOLOR[STEEPVCOLOR.findIndex((el) => el.value === d)].textColor}
            >
              {d}
            </ChipEl>
          ))
        }
        {
        data['Key Themes'].split(',').map((d, i) => (
          <ChipEl key={i} bgColor='#EAEAEA'>
            {d}
          </ChipEl>
        ))
      }
      </FlexEl>
      <ModalBodyEl>
        {data['Signal Description']}
      </ModalBodyEl>
      <HR />
      <ModalTitleEl>Horizon</ModalTitleEl>
      <ModalBodyEl>
        <ChipEl
          style={{ width: 'fit-content' }}
          bgColor={data.Horizon ? COLORVALUES[data.Horizon] : '#AAA'}
          fontColor='var(--black)'
        >
          {data.Horizon ? data.Horizon : 'Horizon NA'}
        </ChipEl>
      </ModalBodyEl>
      <HR />
      <ModalTitleEl>Signature Solutions/Enablers</ModalTitleEl>
      <ModalBodyEl>
        <FlexEl>
          {
            data['Signature Solutions/ Enablers'].split(',').map((d, i) => (
              <ChipEl
                key={i}
                bgColor={SSCOLOR.findIndex((el) => el.value === d) !== -1 ? SSCOLOR[SSCOLOR.findIndex((el) => el.value === d)].bgColor : '#AAA'}
                fontColor={SSCOLOR.findIndex((el) => el.value === d) !== -1 ? SSCOLOR[SSCOLOR.findIndex((el) => el.value === d)].textColor : 'var(--black)'}
              >
                {d}
              </ChipEl>
            ))
          }
        </FlexEl>
      </ModalBodyEl>
      <HR />
      <ModalTitleEl>SDGs</ModalTitleEl>
      <ModalBodyEl>
        <FlexEl>
          {
          data.SDGs
            ? (
              <>
                {
                  data.SDGs.split(',').map((d, i) => (
                    <ChipEl
                      key={i}
                      bgColor={SDGCOLOR[SDGCOLOR.findIndex((el) => el.value === d)].bgColor}
                      fontColor={SDGCOLOR[SDGCOLOR.findIndex((el) => el.value === d)].textColor}
                    >
                      {d}
                    </ChipEl>
                  ))
                }
              </>
            )
            : 'NA'
        }
        </FlexEl>
      </ModalBodyEl>
      <HR />
      <ModalTitleEl>Impact and Relevance to UNDP</ModalTitleEl>
      <ModalBodyEl>
        {data['Impact/ Relevance UNDP']}
      </ModalBodyEl>
      <HR />
      <ModalBodyEl>
        <DivValuesEl>
          <div className='bold'>
            {data['Survey Risk (Average)'] ? 'Risk Score based on Survey Average' : 'Risk Score Avg. of Likelihood and Impact'}
          </div>
          <ValueSpan className='bold'>{data['Survey Risk (Average)'] ? data['Survey Risk (Average)'].toFixed(1) : data['Risk score (L x I)']}</ValueSpan>
        </DivValuesEl>
      </ModalBodyEl>
      <HR />
      <ModalTitleEl>Sources</ModalTitleEl>
      <ModalBodyEl>
        <ul>
          {
            data.Sources?.split('\n').filter((d) => d !== '' && d !== ' ').length === 0 ? null
              : (
                <>
                  {
                      data.Sources?.split('\n').filter((d) => d !== '' && d !== ' ').map((d, i) => (
                        <li key={i}>
                          {
                            d.substring(0, 4) === 'http'
                              ? <a href={d} target='_blank' rel='noreferrer'>{d}</a> : <>{d}</>
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
                              ? <a href={d} target='_blank' rel='noreferrer'>{d}</a> : <>{d}</>
                          }
                        </li>
                      ))
                    }
                </>
              )
          }
        </ul>
      </ModalBodyEl>
    </Modal>
  );
};
