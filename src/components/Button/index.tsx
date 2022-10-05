import { forwardRef, AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Spinner } from 'react-bootstrap'
import * as S from './styles'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  color?:
    | 'blue'
    | 'green'
    | 'gray'
    | 'darkBlue'
    | 'white'
    | 'red'
    | 'redFull'
    | 'clean'
    | 'fullClean'
  size?: 'small' | 'medium' | 'large'
  fullWidth?: boolean
  minimal?: boolean
  icon?: JSX.Element
  loading?: boolean
  textLoading?: string
  as?: React.ElementType
} & ButtonTypes

const Button: React.ForwardRefRenderFunction<S.WrapperProps, ButtonProps> = (
  {
    children,
    icon,
    size = 'medium',
    color = 'blue',
    fullWidth = false,
    minimal = false,
    loading = false,
    textLoading = '',
    ...props
  },
  ref
) => (
  <S.Wrapper
    size={size}
    color={color}
    fullWidth={fullWidth}
    hasIcon={!!icon}
    minimal={minimal}
    loading={loading}
    ref={ref}
    {...props}
  >
    {loading ? (
      <Spinner animation="border" className={textLoading && 'spinner'} />
    ) : (
      icon
    )}
    {!!children && <span>{loading ? textLoading : children}</span>}
  </S.Wrapper>
)

export default forwardRef(Button)
