import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('header mostra nome', () => {
    render(<Header />);
    const nome = screen.getByRole('heading', { level: 1, name: 'Store' });
    expect(nome).toBeInTheDocument();
    const subNome = screen.getByText('App');
    expect(subNome).toBeInTheDocument();
  });

  test('ao clicar botao usuario exibir menu e ao clicar de novo esconder menu', async () => {
    render(<Header />);
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
    render(<Header />);
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