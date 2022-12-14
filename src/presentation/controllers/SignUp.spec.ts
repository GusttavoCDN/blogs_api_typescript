import { CreateUserUseCase } from '../../application/useCases/create-user';
import { HttpResponse } from '../contracts';
import { RequestValidator } from '../contracts/RequestValidator';
import { SignUpController } from './SignUp';

interface SutTypes {
  sut: SignUpController
  requestValidatorStub: jest.Mocked<RequestValidator>
  createUserStub: jest.Mocked<CreateUserUseCase>
}

const validResponseMock = {
  statusCode: 201,
  body: {
    id: 1,
    name: 'any_name',
    email: 'any_email',
    password: 'any_password'
  }
};

const makeSut = (): SutTypes => {
  const requestValidatorStub: jest.Mocked<RequestValidator> = {
    validate: jest.fn().mockResolvedValue(true)
  };

  const createUserStub: jest.Mocked<CreateUserUseCase> = {
    execute: jest.fn().mockResolvedValue(validResponseMock.body)
  } as any;

  const sut = new SignUpController(requestValidatorStub, createUserStub);

  return { sut, requestValidatorStub, createUserStub };
};

describe('SignUp controller test', () => {
  it('Should return status 400 if receive invalid data', async () => {
    const { sut, requestValidatorStub } = makeSut();

    requestValidatorStub.validate.mockResolvedValueOnce(false);

    const httpResponse: HttpResponse = await sut.handle({
      body: { name: '', email: '', password: '' }
    });

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body.error).toBeDefined();
  });

  it('Should return status 201 if receive valid data', async () => {
    const { sut } = makeSut();

    const httpResponse: HttpResponse = await sut.handle({
      body: { name: 'any_name', email: 'any_email', password: '123456' }
    });

    expect(httpResponse.statusCode).toBe(201);
    expect(httpResponse).toEqual(validResponseMock);
  });
});
