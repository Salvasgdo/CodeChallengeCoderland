import React from 'react';
import {render, waitFor, fireEvent, act} from '@testing-library/react-native';
import axios from 'axios';
import ListScreen from '../screens/ListScreen';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

describe('ListadoScreen', () => {
  beforeEach(() => {
    mock.reset();
  });

  it('should display a loading indicator while fetching data', () => {
    const {getByTestId} = render(<ListScreen />);
    expect(getByTestId('Loading')).toBeTruthy();
  });

  it('should display a list of items after fetching data', async () => {
    const mockData = [
      {id: '1', name: 'Data 1', avatar: 'https://ipfs.io/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/114.jpg'},
      {id: '2', name: 'Data 2', avatar: 'https://ipfs.io/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/114.jpg'},
    ];
    mock
      .onGet('https://6172cfe5110a740017222e2b.mockapi.io/elements')
      .reply(200, mockData);

    const {getByText} = render(<ListScreen />);

    await act(async () => {
      await waitFor(() => {
        expect(getByText('Data 1')).toBeTruthy();
        expect(getByText('Data 2')).toBeTruthy();
      });
    });
  });

  it('should display a placeholder if the image fails to load', async () => {
    const mockData = [
      {
        id: '1',
        name: 'Data 1',
        avatar:
          'https://ipfs.io/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/114.jpg',
      },
    ];
    mock
      .onGet('https://6172cfe5110a740017222e2b.mockapi.io/elements')
      .reply(200, mockData);

    const {getByText, getByTestId} = render(<ListScreen />);

    await act(async () => {
      await waitFor(() => {
        expect(getByText('Data 1')).toBeTruthy();
      });

      // Simulate image load failure
      fireEvent(getByTestId('FastImage'), 'onError');

      await waitFor(() => {
        expect(getByText('Failed to load image')).toBeTruthy();
      });
    });
  });
});
