import { render, screen, fireEvent, act } from '@testing-library/react';
import App from './App';
import React from 'react';



it('renders correctly', () => {
  const {queryByPlaceholderText} = render(<App />)

  expect(queryByPlaceholderText('Search')).toBeTruthy();
})

describe('Input Value', () => {
    it('should update on change', () => {
        const {queryByPlaceholderText} = render(<App />);

        const searchInput = queryByPlaceholderText('Search');

        fireEvent.change(searchInput, {target: {value: 'test'}});

        expect(searchInput.value).toBe('test');
    })
})