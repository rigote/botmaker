import styled, { css } from 'styled-components'
import media from 'styled-media-query'

export const Wrapper = styled.main`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: ${theme.font.sizes.medium};
    color: ${theme.colors.darkGray};

    ${media.greaterThan('huge')`
      align-items: left;
    `}

    ${media.lessThan('medium')`
      align-items: center;
    `}

    form {
      ${media.greaterThan('huge')`
        width: calc(90% - 1.5rem);
      `}

      ${media.lessThan('medium')`
        width: 100%;
      `}

      div {
        margin-bottom: 1.5rem;
        input,
        select {
          font-size: ${theme.font.sizes.medium};
          color: ${theme.colors.darkGray};
        }
      }
    }

    button {
      padding: 8px;
      font-size: 1.4rem;
      text-transform: uppercase;
      font-weight: 600;

      ${media.greaterThan('huge')`
        width: calc(90% - 1.5rem);

      `}

      ${media.lessThan('medium')`
        width: 100%;
      `}
    }
  `}
`

export const Name = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
  `}
`
