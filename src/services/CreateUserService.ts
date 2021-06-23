import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"


interface IUserRequest {
      name: string;
      email: string;
      admin?: boolean 
}

class CreateUserService{

      async execute({name, email, admin} : IUserRequest){
            const userRepository = getCustomRepository(UsersRepositories);
            
            //Caso a pessoa não tenha colocado o email corretamente.
            if(!email){
              throw new Error("Email incorrect");
            }

            const userAlreadyExists = await userRepository
            .findOne({email});

            //Caso já exista um usuário com este e-mail.
            if(userAlreadyExists){
                    throw new Error("Users already exists with this Email.")
            }

            const user = userRepository.create({
              name,
              email,
              admin,
            });

            //Salvar os dados do Usuário.
            await userRepository.save(user);

            return user;

      }

}

export { CreateUserService }