import { AuthService } from '@/user/service/auth.service';
import { Controller } from '@nestjs/common';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
