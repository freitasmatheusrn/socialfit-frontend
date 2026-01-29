import { SectionHeader } from "./section-header"
import { CategoryPill } from "./category-pill"
import type { Category } from "../_lib/types"

interface CategoriesGridProps {
  categories: Category[]
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <section className="space-y-3">
      <SectionHeader title="Categorias" href="/categories" />
      <div className="flex flex-wrap gap-2 px-4">
        {categories.map((category) => (
          <CategoryPill key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}
