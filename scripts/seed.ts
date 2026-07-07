import { PrismaClient } from '@prisma/client';
import { menuData } from '../src/data/menu';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding menu data...');

  for (const categoryData of menuData) {
    // Determine category names to create
    // We will treat main categories (like Starters, Main Course) as the Category
    // If they have subcategories, we'll create categories named "Starters - Veg" or just use the subcategory as the Category.
    // Let's create categories for each distinct list of items.

    if (categoryData.items) {
      let category = await prisma.category.findUnique({ where: { name: categoryData.title } });
      if (!category) {
        category = await prisma.category.create({ data: { name: categoryData.title } });
      }

      for (const item of categoryData.items) {
        await prisma.menuItem.create({
          data: {
            name: item.name,
            description: item.description,
            price: item.price,
            calories: item.calories,
            protein: item.protein,
            image: item.image,
            categoryId: category.id,
          }
        });
      }
    }

    if (categoryData.subcategories) {
      for (const sub of categoryData.subcategories) {
        const catName = `${categoryData.title} - ${sub.title}`;
        let category = await prisma.category.findUnique({ where: { name: catName } });
        if (!category) {
          category = await prisma.category.create({ data: { name: catName } });
        }

        for (const item of sub.items) {
          await prisma.menuItem.create({
            data: {
              name: item.name,
              description: item.description,
              price: item.price,
              calories: item.calories,
              protein: item.protein,
              image: item.image,
              categoryId: category.id,
            }
          });
        }
      }
    }
  }

  console.log('Menu seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
