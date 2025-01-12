const { PrismaClient } = require("@prisma/client");
const process = require('process');
const prisma = new PrismaClient();

async function main() {
  const roleAdmin = await prisma.role.create({
    data: {
      name: "Admin",
    },
  });
  console.log("Role Admin created:", roleAdmin);

  const roleAuthor = await prisma.role.create({
    data: {
      name: "Author",
    },
  });
  console.log("Role Author created:", roleAuthor);

  const roleUser = await prisma.role.create({
    data: {
      name: "User",
    },
  });
  console.log("Role User created:", roleUser);

  const user1 = await prisma.user.create({
    data: {
      email: "unique_user1@example.com",
      password: "password1",
      roleId: roleUser.id,
    },
  });
  console.log("User 1 created:", user1);

  const user2 = await prisma.user.create({
    data: {
      email: "unique_user2@example.com",
      password: "password2",
      roleId: roleAuthor.id,
    },
  });
  console.log("User 2 created:", user2);

  const user3 = await prisma.user.create({
    data: {
      email: "unique_user3@example.com",
      password: "password3",
      roleId: roleAdmin.id,
    },
  });
  console.log("User 3 created:", user3);

  const category1 = await prisma.category.create({
    data: {
      name: "Desserts",
    },
  });
  console.log("Category 1 created:", category1);

  const category2 = await prisma.category.create({
    data: {
      name: "Main Courses",
    },
  });
  console.log("Category 2 created:", category2);

  await prisma.recipe.create({
    data: {
      title: "Chocolate Cake",
      content: "Delicious chocolate cake recipe...",
      categoryId: category1.id,
      userId: user2.id,
    },
  });
  console.log("Recipe 1 created");

  await prisma.recipe.create({
    data: {
      title: "Grilled Chicken",
      content: "Tasty grilled chicken recipe...",
      categoryId: category2.id,
      userId: user3.id,
    },
  });
  console.log("Recipe 2 created");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });