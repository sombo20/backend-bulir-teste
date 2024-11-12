import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ where: { email } });
  }

  async findProviderById(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id, role: 'PROVIDER' } });
  }

  async findClientById(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id, role: 'CLIENT' } });
  }

  async updateProviderBalance(
    userId: number,
    newBalance: number,
  ): Promise<void> {
    const balance = await this.userModel.findOne({
      where: { id: userId, role: 'PROVIDER' },
    });
    if (balance) {
      await balance.update({ balance: newBalance });
    }
    return null;
  }

  async findByNif(nif: string): Promise<User> {
    return this.userModel.findOne({ where: { nif } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  getUserModel(): typeof User {
    return this.userModel;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (user) {
      await user.update(updateUserDto);
      return user;
    }
    return null;
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    if (user) {
      await user.destroy();
    }
  }
}
