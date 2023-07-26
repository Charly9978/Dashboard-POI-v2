import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OAuth2Client } from 'google-auth-library';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const keys = require('../../client_secret.json');

@Injectable()
export class AuthService {
  oAuth2Client: OAuth2Client;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    this.oAuth2Client = new OAuth2Client(
      keys.web.client_id,
      keys.web.client_secret,
      keys.web.redirect_uris[0],
    );
  }
  getGoogleAuthUrl() {
    const scope = ['openid', 'email', 'profile'];
    return this.oAuth2Client.generateAuthUrl({
      scope,
      prompt: 'consent',
    });
  }

  async auth(code: string) {
    const { tokens } = await this.oAuth2Client.getToken(code);
    const ticket = await this.oAuth2Client.verifyIdToken({
      idToken: tokens.id_token,
    });
    const payload = ticket.getPayload();
    const user = {
      name: payload.name,
      picture: payload.picture,
      email: payload.email,
    };
    const userToUpdate = await this.userRepository.findOneOrFail({
      where: { email: user.email },
    });

    Object.assign(userToUpdate, user);

    const userUpdated = await this.userRepository.save(userToUpdate);

    return await this.jwtService.signAsync({
      name: userUpdated.name,
      picture: userUpdated.picture,
      admin: userUpdated.admin,
      logRole: userUpdated.logRole,
      dashboardRole: userUpdated.dashBoardRole,
    });
  }
}
