import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from './decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  public get authService(): AuthService {
    return this._authService;
  }
  constructor(private readonly _authService: AuthService) {}

  @Public()
  @Get('google')
  Login(@Res() res: Response) {
    const url = this.authService.getGoogleAuthUrl();
    res.redirect(url);
  }

  @Public()
  @Get('google/callback')
  async callBack(@Request() req, @Res({ passthrough: true }) res) {
    try {
      const code = req.query.code as string;
      if (!code) throw new Error('Pas de code dans la requete');
      const access_token = await this.authService.auth(code);
      res
        .cookie('Access_Token', access_token, {
          httpOnly: true,
          secure: false,
          sameSite: 'lax',
        })
        .redirect('http://localhost:9000');
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('profile')
  getProfile(@Request() req) {
    console.log('test profile')
    return req.user;
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('Access_Token');
    res.redirect('http://localhost:3000');
  }
}
