import { useRef, useEffect } from 'react'

function useDebounce<Return, Dependencies>(
  callback: () => Return,
  delay: number,
  dependencies: Dependencies[]
) {
  const timerRef = useRef<string | number | NodeJS.Timeout | undefined>()

  useEffect(() => {
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      callback()
    }, delay)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, delay])

  useEffect(() => {
    {
      timerRef && clearTimeout(timerRef.current)
    }
  }, [])
}

export default useDebounce
