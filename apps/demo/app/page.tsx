import { prisma } from "@repo/database"

const Home = async () => {
  await prisma.sys_user.deleteMany();
  await prisma.sys_user.create({
    data: {
      account: "test1",
      password: "helloWorld",
      name: "test"
    }
  })
  const res = await prisma.sys_user.page({
    page: 1,
    size: 10
  })

  return (
    <div>
      {crypto.randomUUID()}
      {JSON.stringify(res)}
    </div>
  )
}
export default Home