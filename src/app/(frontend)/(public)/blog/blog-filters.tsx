'use client'

import { Entrance } from '@/components/motion-primitives'
import { Skeleton } from '@/components/ui/skeleton'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { useQueryStates } from 'nuqs'
import { BLOG_CATEGORIES, type BlogCategory, blogSearchParams } from './search-params'

export function BlogFilters() {
	const [{ category }, setQuery] = useQueryStates(blogSearchParams)

	const setActiveFilter = (newCategory: BlogCategory | '') => {
		setQuery(
			{
				category: newCategory,
				page: 1, // Reset to first page when changing category
			},
			{
				shallow: false,
			},
		)
	}

	return (
		<Entrance.Fade>
			<div className="mt-12 mb-6 -ml-0.5 flex justify-between gap-4 max-md:-mx-6 md:mt-16">
				<div className="overflow-x-auto py-3 max-md:px-6">
					<ToggleGroup
						aria-label="Blog categories"
						className="snap-x snap-mandatory"
						onValueChange={(value) => {
							const nextCategory = value[0]
							if (nextCategory) {
								setActiveFilter(nextCategory === 'all' ? '' : (nextCategory as BlogCategory))
							}
						}}
						value={[category || 'all']}
						variant="outline"
					>
						<ToggleGroupItem className="snap-center" value="all">
							All
						</ToggleGroupItem>
						{BLOG_CATEGORIES.map((cat) => (
							<ToggleGroupItem className="snap-center capitalize" key={cat} value={cat}>
								{cat}
							</ToggleGroupItem>
						))}
					</ToggleGroup>
				</div>
			</div>
		</Entrance.Fade>
	)
}

export function BlogFiltersSkeleton() {
	return <Skeleton className="h-10 w-full rounded-md" />
}
