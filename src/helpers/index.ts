export const parseClassName = (position: string) => {
  let className= ''
  switch(position) {
    case 'left':
      className = 'text-position-left'
     break
    case 'right':
      className = 'text-position-right'
      break
    case 'center':
      className = 'text-position-center'
      break
  }
  return className
}

export const parseCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
}