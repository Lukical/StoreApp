import axios from 'axios';

const mockAxios = axios as jest.Mocked<typeof axios>;

export default mockAxios;
