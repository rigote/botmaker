import { render, screen } from '@testing-library/react'

import HomeTemplate from '.'

describe('<HomeTemplate />', () => {
  it('should render the heading', () => {
    const { container } = render(<HomeTemplate />)

    expect(screen.getByRole('heading', { name: /HomeTemplate/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
