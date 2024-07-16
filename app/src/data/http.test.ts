import axios from 'axios';
import http from './http';

describe('http', () => {
  it('testando http', async () => {
    const responseData = 'Connected with sucess!';
    jest.spyOn(axios, 'get').mockResolvedValue({ data: responseData });

    const response = await http.get('/health');

    expect(response.data.message).toEqual(responseData);
  });
});
