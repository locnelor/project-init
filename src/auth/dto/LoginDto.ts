import { Length, MinLength } from "class-validator"

export class LoginDto {
  @Length(2, 20, { message: '用户名长度2-20' })
  account: string

  @MinLength(6, { message: '密码长度不能小于6' })
  password: string
}