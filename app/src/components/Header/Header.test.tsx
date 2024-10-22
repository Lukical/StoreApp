import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';
import { RecoilRoot } from 'recoil';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Header', () => {
  test('header mostra nome', () => {
    render(<RecoilRoot><Header /></RecoilRoot>);
    const nome = screen.getByRole('heading', { level: 1, name: 'Store' });
    expect(nome).toBeInTheDocument();
    const subNome = screen.getByText('App');
    expect(subNome).toBeInTheDocument();
  });

  test('ao clicar botao usuario exibir menu e ao clicar de novo esconder menu', async () => {
    render(<RecoilRoot><Header /></RecoilRoot>);
    const userIcon = screen.getByTestId('user_icon');

    fireEvent.click(userIcon);

    await waitFor(() => {
      const menu = screen.getByTestId('Menu');
      expect(menu).toBeInTheDocument();
    });

    fireEvent.click(userIcon);

    await waitFor(() => {
      const menu = screen.queryByTestId('Menu');
      expect(menu).toBeNull();
    });
  });
  test("Fechando menu clicando para fora", async ()=>{
    render(<RecoilRoot>
        <Header />
    </RecoilRoot>);
    const userIcon = screen.getByTestId('user_icon');
    fireEvent.click(userIcon);

    const menu = screen.getByTestId('Menu');
    await waitFor(() => {
      expect(menu).toBeInTheDocument();
    });
    fireEvent.mouseDown(document);
    await waitFor(() => {
      expect(menu).not.toBeInTheDocument();
    });
  })
});