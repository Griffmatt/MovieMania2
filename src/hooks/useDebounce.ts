import { useRef, useEffect } from "react"

function useDebounce<T>(callback: () => T, delay: number, dependencies: any[]): T | void {
    let timerRef = useRef<string | number | NodeJS.Timeout | undefined>()

    useEffect(()=>{
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            return callback()
          }, delay)

    }, [...dependencies, delay])

    useEffect(()=>{
        {timerRef && clearTimeout(timerRef.current)}
    }, [])

  }

export default useDebounce