const SUCCESS_STATUS = 1 as const
const ERROR_STATUS = 2 as const
const EXCEPTION_STATUS = 0 as const

const STATES = {
  SUCCESS: SUCCESS_STATUS,
  ERROR: ERROR_STATUS,
  EXCEPTION: EXCEPTION_STATUS
} as const

export { STATES }
