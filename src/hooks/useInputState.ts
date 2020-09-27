import { useState } from 'react'

export default (initialVal: any) => {
  const [value, setValue] = useState(initialVal)
  const handleChange = (e: any) => {
    setValue(e.target.value)
  }
  const reset = () => {
    setValue('')
  }
  return [value, handleChange, reset]
}