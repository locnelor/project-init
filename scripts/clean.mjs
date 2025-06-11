import { readdirSync, rmSync } from 'node:fs'
import { join } from 'node:path';

// 递归清理指定目录下的目标文件夹
const recursiveCleanDirectories = (directoryPath, targetDirs) => {
  try {
    const entries = readdirSync(directoryPath);

    for (const entry of entries) {
      const fullPath = join(directoryPath, entry)

      if (targetDirs.includes(entry)) {
        // 如果是目标文件夹，直接删除
        rmSync(fullPath, { recursive: true, force: true })
        continue
      }

      // 递归处理子目录
      recursiveCleanDirectories(fullPath, targetDirs)
    }
  } catch (err) {
    // 忽略访问权限错误等
    if (err.code !== 'ENOTDIR') {
      throw err
    }
  }
}

// 主函数
(() => {
  const directoriesToClean = ['node_modules', 'dist', '.turbo']

  try {
    recursiveCleanDirectories(process.cwd(), directoriesToClean)
  } catch (error) {
    console.error('清理文件夹时发生错误:', error)
    process.exit(1)
  }
})()