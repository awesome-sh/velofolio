// Generated by https://quicktype.io

import { LabSettingState, Portfolio } from '../../../atoms/labSettingState'
import { UserSerialized } from '../types'

export type BacktestPayload = {
  title: string
  data: Omit<LabSettingState, 'nextPortfolioId'>
  returns: { x: string; y: number }[][]
  indicators: {
    id: number
    cagr: number | null
    sharpe: number | null
  }[]
}

export type Backtest = {
  id: number
  user: UserSerialized
} & BacktestPayload