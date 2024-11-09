import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';

@Injectable()
export class FileService {
  constructor() {
  }
  public deepMkdir(tree: any[]) {
    for (const item of tree) {
      if (!existsSync(item.path)) mkdirSync(item.path)
      if (item.children) this.deepMkdir(item.children)
    }
  }
  public unlink(path: string) {
    try {
      unlinkSync(path)
    } catch (_) {
      return false
    }
    return true;
  }
  public static readonly Root = cwd();
  public static getSSLKey() {
    return readFileSync(join(this.Root, "keys", "ssh.key"))
  }
  public static getSSLPem() {
    return readFileSync(join(this.Root, "keys", "ssh.pem"))
  }
  private readonly Assets = join(FileService.Root, "assets")
}
