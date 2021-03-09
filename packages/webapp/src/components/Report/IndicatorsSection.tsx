import { css } from '@emotion/react'
import { useEffect, useMemo } from 'react'
import { useInitialAmountState } from '../../atoms/labSettingState'
import { useMonthsCountValue, useReportValue } from '../../atoms/reportState'
import palette from '../../lib/palette'
import {
  convertToPercentage,
  returnRate,
} from '../../lib/utils/calculateIndicators'
import ReportSection from './ReportSection'
export interface IndicatorsSectionProps {}

function IndicatorsSection({}: IndicatorsSectionProps) {
  const [initialAmount] = useInitialAmountState()
  const monthsCount = useMonthsCountValue()
  const report = useReportValue()

  const moreThanOneYear = useMemo(() => monthsCount && monthsCount >= 12, [
    monthsCount,
  ])

  const moreThanTwoYears = useMemo(() => monthsCount && monthsCount >= 24, [
    monthsCount,
  ])

  if (report.length === 0) return null

  return (
    <ReportSection title="Indicators">
      <table css={tableStyle}>
        <thead>
          <tr>
            <th>Portfolio Name</th>
            <th>Final Balance</th>
            {moreThanOneYear && <th>CAGR</th>}
            <th>Stdev</th>
            <th>Max Drawdown</th>
            <th>Best {moreThanTwoYears ? 'Year' : 'Month'}</th>
            <th>Worst {moreThanTwoYears ? 'Year' : 'Month'}</th>
            <th>Sharpe Ratio</th>
            <th>Sortino Ratio</th>
          </tr>
        </thead>
        <tbody>
          {report.map(
            ({
              id,
              indicator: {
                finalBalance,
                cagr,
                stdev,
                mdd,
                sharpeRatio,
                sortinoRatio,
                best,
                worst,
              },
              name,
            }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>
                  ${Math.floor(finalBalance).toLocaleString()} (
                  {convertToPercentage(returnRate(initialAmount, finalBalance))}
                  )
                </td>
                {moreThanOneYear && <td>{convertToPercentage(cagr)}</td>}
                <td>{convertToPercentage(stdev)}</td>
                <td>{convertToPercentage(mdd)}</td>
                <td>
                  {convertToPercentage(
                    moreThanTwoYears ? best.year : best.month
                  )}
                </td>
                <td>
                  {convertToPercentage(
                    moreThanTwoYears ? worst.year : worst.month
                  )}
                </td>
                <td>{sharpeRatio.toFixed(2)}</td>
                <td>{sortinoRatio ? sortinoRatio.toFixed(2) : 'N/A'}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </ReportSection>
  )
}

const tableStyle = css`
  border-radius: 4px;
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  td,
  th {
    padding: 0.75rem;
    border: 1px solid ${palette.blueGrey[200]};
  }

  tr:nth-of-type(even) {
    background: ${palette.grey[100]};
  }

  tr td:first-child {
    width: 20rem;
  }

  thead th {
    color: ${palette.blueGrey[800]};
  }
`

export default IndicatorsSection

/*
.bordered th:first-child {
  -moz-border-radius: 6px 0 0 0;
  -webkit-border-radius: 6px 0 0 0;
  border-radius: 6px 0 0 0;
}

.bordered th:last-child {
  -moz-border-radius: 0 6px 0 0;
  -webkit-border-radius: 0 6px 0 0;
  border-radius: 0 6px 0 0;
}

.bordered th:only-child{
  -moz-border-radius: 6px 6px 0 0;
  -webkit-border-radius: 6px 6px 0 0;
  border-radius: 6px 6px 0 0;
}

.bordered tr:last-child td:first-child {
  -moz-border-radius: 0 0 0 6px;
  -webkit-border-radius: 0 0 0 6px;
  border-radius: 0 0 0 6px;
}

.bordered tr:last-child td:last-child {
  -moz-border-radius: 0 0 6px 0;
  -webkit-border-radius: 0 0 6px 0;
  border-radius: 0 0 6px 0;
}
*/