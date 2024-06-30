import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthPayloadDto } from './dto/auth-payload.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthPayloadDto })
  @Post('login')
  @UseGuards(LocalGuard)
  @ApiOperation({
    summary: 'Loga o usuário e retorna um JWT caso seja autenticado.',
  })
  async login(@Req() req: Request) {
    return req.user;
  }

  @Get('status')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Verifica se o JWT ainda é válido e retorna o usuário caso seja.',
  })
  status(@Req() req: Request) {
    return req.user;
  }
}
