import styled, { css, DefaultTheme } from 'styled-components'
import { darken } from 'polished'

import { ButtonProps } from '.'

export type WrapperProps = {
  hasIcon: boolean
} & Pick<ButtonProps, 'size' | 'fullWidth' | 'minimal' | 'color'>

const wrapperModifiers = {
  small: (theme: DefaultTheme) => css`
    height: 3rem;
    font-size: ${theme.font.sizes.xsmall};
  `,
  medium: (theme: DefaultTheme) => css`
    height: 4rem;
    font-size: ${theme.font.sizes.small};
    padding: 0.9rem 2rem;
  `,
  large: (theme: DefaultTheme) => css`
    height: 5rem;
    font-size: ${theme.font.sizes.medium};
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xlarge};
  `,
  fullWidth: () => css`
    width: 100%;
    width: max-content;
  `,
  withIcon: (theme: DefaultTheme) => css`
    svg {
      width: 1.5rem;

      & + span {
        margin-left: ${theme.spacings.xxsmall};
      }
    }
  `,
  minimal: (theme: DefaultTheme) => css`
    background: none;
    color: ${theme.colors.primary};

    &:hover {
      color: ${darken(0.1, theme.colors.primary)};
      background: none;
    }
  `,
  disabled: () => css`
    &:disabled {
      cursor: not-allowed;
      //filter: saturate(30%);
      opacity: 0.5;
    }
  `,
  blue: (theme: DefaultTheme) =>
    css`
      background-color: ${theme.colors.primary};
      &:hover {
        background-color: ${darken(0.1, theme.colors.primary)};
      }
    `,
  green: (theme: DefaultTheme) =>
    css`
      background-color: ${theme.colors.green};
      &:hover {
        background-color: ${darken(0.1, theme.colors.green)};
      }
    `,
  gray: (theme: DefaultTheme) =>
    css`
      background-color: ${theme.colors.mediumGray};
      &:hover {
        background-color: ${darken(0.1, theme.colors.mediumGray)};
      }
    `,
  darkBlue: (theme: DefaultTheme) =>
    css`
      background-color: ${theme.colors.darkBlue};
      &:hover {
        background-color: ${darken(0.1, theme.colors.darkBlue)};
      }
    `,
  white: (theme: DefaultTheme) =>
    css`
      background-color: #fff;
      color: ${theme.colors.black};
      border: 1px solid #dee2e6;
      &:hover {
        background-color: ${theme.colors.white};
      }
    `,
  red: (theme: DefaultTheme) =>
    css`
      background-color: ${theme.colors.white};
      color: ${theme.colors.red};
      border: 1px solid ${theme.colors.red};
      &:hover {
        background-color: ${darken(0.1, theme.colors.red)};
        color: #fff;
      }
    `,
  redFull: (theme: DefaultTheme) =>
    css`
      background-color: ${theme.colors.red};
      color: ${theme.colors.white};
      border: 1px solid ${theme.colors.red};
      &:hover {
        background-color: ${darken(0.1, theme.colors.red)};
        color: #fff;
      }
    `,
  clean: (theme: DefaultTheme) =>
    css`
      background-color: ${theme.colors.white};
      color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary};
      &:hover {
        background-color: ${darken(0.1, theme.colors.primary)};
        color: #fff;
      }
    `,
  fullClean: (theme: DefaultTheme) =>
    css`
      background-color: transparent;
      color: ${theme.colors.primary};
      &:hover {
        border: 1px solid ${theme.colors.primary};
      }
    `
}

export const Wrapper = styled.button<WrapperProps>`
  ${({ theme, size, fullWidth, hasIcon, minimal, disabled, color }) => css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    //background: linear-gradient(180deg, #ff5f5f 0%, #f062c0 50%);
    color: ${theme.colors.white};
    font-family: ${theme.font.family};
    border: 0;
    cursor: pointer;
    border-radius: 0.4rem;
    padding: 1rem 1.2rem;
    text-decoration: none;

    .spinner {
      margin-right: 1.3rem;
    }

    &:focus {
      box-shadow: 0 0 0 3px ${theme.colors.secondary};
    }

    &:hover {
      background: ${minimal ? 'none' : 'none'};
    }

    ${!!size && wrapperModifiers[size](theme)};
    ${!!color && wrapperModifiers[color](theme)};
    ${!!fullWidth && wrapperModifiers.fullWidth()};
    ${!!hasIcon && wrapperModifiers.withIcon(theme)};
    ${!!minimal && wrapperModifiers.minimal(theme)};
    ${disabled && wrapperModifiers.disabled()};
  `}
`
