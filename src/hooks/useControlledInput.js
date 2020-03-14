import { useState } from 'react'

const useControlledInput = initialValue => {
  const [value, setValue] = useState(initialValue)

  const onValueChange = e => {
    setValue(e.target.value)
  }

  return {
    value,
    onChange: onValueChange
  }
}

export default useControlledInput