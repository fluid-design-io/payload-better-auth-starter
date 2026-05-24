import Link from 'next/link'

import { Container } from '@/components/layout/elements'
import { InView } from '@/components/motion-primitives/in-view'
import { H2, Muted } from '@/components/ui/typography'

import { inViewOptions } from '@/lib/animation'

const colors = [
	'foreground',
	'card',
	'popover',
	'primary',
	'secondary',
	'muted',
	'accent',
	'destructive',
	'card-foreground',
	'popover-foreground',
	'primary-foreground',
	'secondary-foreground',
	'muted-foreground',
	'accent-foreground',
	'destructive-foreground',
	'border',
	'input',
	'ring',
]

export const ThemeColors = () => {
	return (
		<Container>
			<InView {...inViewOptions()} as="section" className="mb-16">
				<H2>Theme Colors</H2>
				<Muted className="mt-4 mb-8">
					Visit{' '}
					<Link
						href="https://tweakcn.com/editor/theme"
						className="text-foreground font-medium underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						TweakCN
					</Link>{' '}
					to create new theme colors. Paste the colors into the{' '}
					<code className="bg-primary/15 rounded-md px-1 py-0.5">
						src/app/(frontend)/globals.css
					</code>{' '}
					file.
				</Muted>
				<div className="grid grid-cols-3 gap-4 rounded-3xl border px-4 py-8 md:grid-cols-4 lg:grid-cols-6">
					{colors.map((color) => (
						<ColorPalette key={color} color={color} />
					))}
				</div>
			</InView>
		</Container>
	)
}

const ColorPalette = ({ color }: { color: string }) => {
	return (
		<div className="flex flex-col items-center gap-2">
			<div
				className="size-16 rounded-full border"
				style={{
					backgroundColor: `var(--${color})`,
				}}
			/>
			<Muted className="text-center font-mono text-xs whitespace-pre-wrap uppercase">
				{color.replace(/-/g, '\n')}
			</Muted>
		</div>
	)
}
