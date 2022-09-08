import { useRef, useEffect } from "react"

function useDebounce<Return, Dependencies>(callback: () => Return, delay: number, dependencies: Dependencies[]){

    let timerRef = useRef<string | number | NodeJS.Timeout | undefined>()

    useEffect(()=>{
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            callback()
          }, delay)

    }, [...dependencies, delay])

    useEffect(()=>{
        {timerRef && clearTimeout(timerRef.current)}
    }, [])

  }

export default useDebounce