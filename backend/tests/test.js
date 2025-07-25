const { handler } = require('../lambdas/upload');

const testEvent = {
  body: JSON.stringify({
    filename: 'curriculo.pdf',
    mimeType: 'application/pdf',
    size: 184320
  }),
  requestContext: {
    authorizer: {
      claims: {
        sub: 'user-1234'
      }
    }
  }
};

handler(testEvent).then(response => {
  console.log('--- Resultado ---');
  console.log(JSON.parse(response.body));
}).catch(err => {
  console.error('Erro:', err);
});
