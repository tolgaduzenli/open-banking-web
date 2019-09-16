import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import YesNoModal from '../components/common/YesNoModal'

test('Renders component without crash', () => {
    const application = {
        title: 'title',
        description: 'description',
    }
    const action = 'DELETE'

    const { getByText } = render(
        <YesNoModal
            application={application}
            action={action}
            onClickYes={jest.fn()}
            onClickNo={jest.fn()}
            showModal
        />,
    )
    getByText(/yes/i)
    getByText(/no/i)
    getByText('Do you want to DELETE the application')
})
