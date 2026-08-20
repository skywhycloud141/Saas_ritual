import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() dto:RegisterDto){
    return this.authService.register(dto)
  }
  @Post("login")
  login(@Body() dto:LoginDto){
    return this.authService.login(dto)
  }
  @Get("my")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getProfile(@Req()req:{
    user:{agencyId}
  }){
    return this.authService.getProfile(req.user.agencyId)
  }

}


