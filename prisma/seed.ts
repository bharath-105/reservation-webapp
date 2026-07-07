import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.category.deleteMany();
  await prisma.menuItem.deleteMany();

  const starters = await prisma.category.create({
    data: { name: 'Starters' }
  });

  const mainCourse = await prisma.category.create({
    data: { name: 'Main Course' }
  });

  const beverages = await prisma.category.create({
    data: { name: 'Beverages' }
  });

  await prisma.menuItem.createMany({
    data: [
      { categoryId: starters.id, name: 'French Fries', price: 149, calories: 365, protein: 4 },
      { categoryId: starters.id, name: 'Peri Peri Fries', price: 169, calories: 390, protein: 4 },
      { categoryId: starters.id, name: 'Cheese Fries', price: 199, calories: 520, protein: 11 },
      { categoryId: starters.id, name: 'Gobi Manchurian', price: 269, calories: 390, protein: 8 },
      { categoryId: starters.id, name: 'Chilli Paneer', price: 299, calories: 480, protein: 21 },
      
      { categoryId: mainCourse.id, name: 'Dal Makhani', price: 289, calories: 410, protein: 18 },
      { categoryId: mainCourse.id, name: 'Paneer Butter Masala', price: 349, calories: 550, protein: 22 },
      { categoryId: mainCourse.id, name: 'Chicken Biryani', price: 399, calories: 650, protein: 35 },
      { categoryId: mainCourse.id, name: 'Butter Chicken', price: 399, calories: 620, protein: 38 },
      { categoryId: mainCourse.id, name: 'Garlic Naan', price: 89, calories: 180, protein: 5 },

      { categoryId: beverages.id, name: 'Fresh Lime Soda', price: 119, calories: 120, protein: 0 },
      { categoryId: beverages.id, name: 'Cold Coffee', price: 199, calories: 320, protein: 8 },
      { categoryId: beverages.id, name: 'Mango Lassi', price: 149, calories: 250, protein: 6 }
    ]
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
