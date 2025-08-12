import { render, screen } from '@testing-library/react';
import Greeting from '../Greeting';

test('renders greeting message', () => {
render(<Greeting name="Oumayma" />);
expect(screen.getByText('Hello, Oumayma!')).toBeInTheDocument();
});
