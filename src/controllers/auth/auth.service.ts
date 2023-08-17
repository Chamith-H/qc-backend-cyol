import {
  ConflictException,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/auth/user.schema';
import { JwtProvider } from './jwt/jwt.provider';
import { JwtPayload } from './jwt/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtProvider: JwtProvider,
  ) {}

  //--> Validate user in database from JWT strategy --------------------------------------------------<
  async validateUser(payload: JwtPayload) {
    const currentUser = await this.userModel
      .findOne({
        userID: payload.userId,
      })
      .populate({ path: 'role' });
    if (currentUser === null) {
      throw new UnauthorizedException('Unauthorized user');
    }
    delete currentUser.password;
    return currentUser;
  }

  //--> Register || Create a new user ----------------------------------------------------------------<
  async create_newUser(dto: RegisterDto) {
    const existUser = await this.userModel.findOne({ userID: dto.userID });
    if (existUser !== null) {
      throw new ConflictException('User already exist');
    }

    const newUser = new this.userModel(dto);
    return await newUser.save();
  }

  //--> Login from currennt saved user ---------------------------------------------------------------<
  async login_currentUser(dto: LoginDto) {
    const existUser = await this.userModel
      .findOne({ userID: dto.userID })
      .populate({ path: 'role' });
    if (existUser === null) {
      throw new UnauthorizedException('User ID not found');
    }

    if (existUser.password !== dto.password) {
      throw new UnauthorizedException('Incorrect password');
    }

    const payload: JwtPayload = {
      userId: existUser.userID,
      name: existUser.name,
      role: existUser.role.roleName,
    };

    const token = await this.jwtProvider.generateToken(payload);
    return { statusCode: 200, token: token };
  }

  //--> Getting users all data without the password --------------------------------------------------<
  async get_allUsers() {
    return await this.userModel
      .find({})
      .select('-password')
      .populate({
        path: 'role',
        select: '-permissions',
      })
      .exec();
  }

  //--> Getting selected user data -------------------------------------------------------------------<
  async get_selectedUser(id: string) {
    return await this.userModel
      .findOne({ _id: id })
      .select('-password')
      .populate({
        path: 'role',
        populate: {
          path: 'permissions',
        },
      })
      .exec();
  }
}
