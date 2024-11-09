import { Injectable } from '@nestjs/common';
import { BinaryLike, createHash, subtle, randomBytes, pbkdf2 } from "crypto"


@Injectable()
export class HashService {
  public md5(data: BinaryLike) {
    return createHash("md5").update(data).digest("hex")
  }

  public sha1(data: BinaryLike) {
    return createHash("sha1").update(data).digest("hex")
  }
  public async cryptoPassword(password: BinaryLike) {
    const salt = randomBytes(16).toString('hex'); // 生成随机盐
    const iterations = 10; // 迭代次数，可以根据硬件性能调整
    const keyLength = 64; // 生成的哈希长度
    const digest = 'sha512'; // 使用的哈希算法
    // 生成加盐的哈希
    const hashedPassword = await new Promise((resolve, reject) => {
      pbkdf2(password, salt, iterations, keyLength, digest, (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey.toString('hex'));
      });
    });
    return `${salt}:${hashedPassword}`; // 返回"盐:哈希"格式
  }
  public async verifyPassword(inputPassword: string, storedHash: string) {
    const [salt, originalHash] = storedHash.split(':'); // 从存储的格式提取盐和哈希
    const iterations = 10;
    const keyLength = 64;
    const digest = 'sha512';
    const hashedInputPassword = await new Promise((resolve, reject) => {
      pbkdf2(inputPassword, salt, iterations, keyLength, digest, (err, derivedKey) => {
        if (err) reject(err);
        else resolve(derivedKey.toString('hex'));
      });
    });

    return hashedInputPassword === originalHash;
  }

  public createUid(args = [] as string[]) {
    return this.md5(this.sha1(`${Math.random()}_${Date.now()}_${args.join("_")}`))
  }
  public async sha256(data: BufferSource) {
    const hashBuffer = await subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

}
