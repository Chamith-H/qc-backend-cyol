import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtProvider {
  constructor(private jwtService: JwtService) {}

  async generateToken(payload: JwtPayload) {
    return await this.jwtService.sign(payload);
  }
}
