const axios = require('axios');
const { expect } = require('chai');
const { StatusCodes } = require('http-status-codes');

describe('First Api Tests', () => {
  it('Consume GET Service', async () => {
    const response = await axios.get('https://httpbin.org/ip');

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data).to.have.property('origin');
  });

  it('Consume GET Service with query parameters', async () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York',
    };

    const response = await axios.get('https://httpbin.org/get', { query });

    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.query).to.eql(query);
  });

  it('Consume HEAD Service', async () => {
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'es-ES,es;q=0.9',
      Host: 'httpbin.org',
      Referer: 'https://httpbin.org/',
      'Sec-Ch-Ua':
        '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
      'Sec-Ch-Ua-Mobile': '?0',
      'Sec-Ch-Ua-Platform': '"Windows"',
      'Sec-Fetch-Dest': 'empty',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Site': 'same-origin',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
      'X-Amzn-Trace-Id': 'Root=1-62c45eb1-2ce4a32044b387e946acce9c',
    };

    const response = await axios.head('https://httpbin.org/headers', {
      headers,
    });
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config.headers).to.eql(headers);
    expect(response.headers['content-type']).to.eql('application/json');
    expect(response.headers['content-length']).to.eql('745');
  });

  it('Consume PATCH Service', async () => {
    const info = {
      nombre: 'fredy',
      edad: '18',
    };
    const response = await axios.patch('https://httpbin.org/anything', info);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.be.eql(info);
  });

  it('Consume PUT Service', async () => {
    const person = {
      name: 'Fredy Arroyave',
      edad: '28',
      direccion: 'cr 45 calle 125',
    };

    const response = await axios.put('https://httpbin.org/anything', person);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.data.json).to.be.eql(person);
  });

  it('Consume DELETE Service', async () => {
    const user = {
      name: 'Abdul',
      age: 30,
    };

    const response = await axios.delete('https://httpbin.org/anything', user);
    expect(response.status).to.equal(StatusCodes.OK);
    expect(response.config).contains(user);
  });
});
