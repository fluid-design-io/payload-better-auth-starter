import Image from 'next/image'

import { ImageZoom } from '@/components/core/image-zoom'
import { Container, MediaFrame, Section } from '@/components/layout'
import { Entrance, GlowEffect } from '@/components/motion-primitives'
import { Main } from '@/components/shell/main'

import image from '../../../../../public/website-template-OG.png'

const features = [
	{
		description:
			'A focused set of building blocks keeps the common path fast without hiding the details that make each project distinct.',
		title: 'Curated, not crowded',
	},
	{
		description:
			'Layout, media, and motion stay independent, so each layer can evolve without pulling the others into its API.',
		title: 'Composition all the way down',
	},
] as const

export default function FeaturesPage() {
	return (
		<Main className="gap-0 px-0 md:px-0">
			<Entrance>
				<Section aria-labelledby="features-title" spacing="lg">
					<Container size="narrow">
						<Section.Header align="center">
							<Section.Eyebrow>Acme</Section.Eyebrow>
							<Section.Title
								id="features-title"
								className="text-balance sm:text-5xl"
								render={<h1 />}
							>
								Small primitives. Ambitious pages.
							</Section.Title>
							<Section.Description className="mx-auto text-balance">
								Build expressive product surfaces from explicit layout, media, and motion
								pieces—then change any layer without unraveling the rest.
							</Section.Description>
						</Section.Header>
					</Container>
				</Section>
			</Entrance>

			<Section aria-labelledby="feature-grid-title" spacing="lg" variant="secondary">
				<Container>
					<Entrance render={<Section.Header />}>
						<Section.Eyebrow>Designed to combine</Section.Eyebrow>
						<Section.Title id="feature-grid-title">Use only what the page needs</Section.Title>
					</Entrance>
					<Section.Content className="mt-10">
						<Entrance.Stagger className="grid gap-6 lg:grid-cols-2" effect="slide-up">
							{features.map((feature) => (
								<Entrance.Stagger.Item key={feature.title}>
									<MediaFrame className="bg-background overflow-hidden rounded-3xl border shadow-xs">
										<MediaFrame.Content className="aspect-16/10 overflow-hidden">
											<Image
												src={image}
												alt="Acme application interface"
												className="size-full object-cover transition-transform duration-500 hover:scale-[1.02]"
												sizes="(max-width: 1024px) 100vw, 50vw"
											/>
										</MediaFrame.Content>
										<MediaFrame.Caption className="space-y-2 p-6 pt-5">
											<strong className="text-foreground block text-xl">{feature.title}</strong>
											<span className="block leading-6 text-pretty">{feature.description}</span>
										</MediaFrame.Caption>
									</MediaFrame>
								</Entrance.Stagger.Item>
							))}
						</Entrance.Stagger>
					</Section.Content>
				</Container>
			</Section>

			<Section aria-labelledby="full-width-feature-title" spacing="lg" variant="muted">

				<Entrance render={<Container />}>
					<Section.Header align="center">
						<Section.Eyebrow>Every layer is explicit</Section.Eyebrow>
						<Section.Title id="full-width-feature-title">
							A closer look, when you want it
						</Section.Title>
						<Section.Description className="mx-auto">
							Zoom, glow, framing, and entrance motion are composed here at the page—not bundled
							inside the section.
						</Section.Description>
					</Section.Header>
				</Entrance>


				<Section.Media className="mt-12">
					<Entrance viewport={{ margin: '0px 0px -10% 0px' }}>
						<MediaFrame className="isolate mx-auto max-w-[120rem] px-4 md:px-8">
							<MediaFrame.Overlay className="inset-x-[8%] inset-y-[6%] -z-10">
								<GlowEffect
									aria-hidden="true"
									blur="strongest"
									className="opacity-35"
									colors={['#0894FF', '#C959DD', '#FF2E54', '#0894FF']}
									mode="static"
								/>
							</MediaFrame.Overlay>
							<MediaFrame.Content className="bg-background overflow-hidden rounded-3xl border p-2 shadow-2xl md:p-4">
								<ImageZoom
									src={image}
									alt="Expanded view of the Acme application interface"
									className="w-full rounded-2xl object-cover"
									sizes="100vw"
								/>
							</MediaFrame.Content>
							<MediaFrame.Caption className="text-center">
								Select the image to inspect the interface in detail.
							</MediaFrame.Caption>
						</MediaFrame>
					</Entrance>
				</Section.Media>
			</Section>

			<Section aria-labelledby="feature-story-title" spacing="lg">
				<Container>
					<Section.Content className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
						<Entrance>
							<Section.Eyebrow>Built for the next project</Section.Eyebrow>
							<Section.Title id="feature-story-title">An API that stays readable</Section.Title>
							<Section.Description>
								The component tree tells the story: the section arranges the page, the frame gives
								media structure, and animation wraps only what should move.
							</Section.Description>
						</Entrance>
						<Entrance.Fade>
							<MediaFrame className="bg-muted overflow-hidden rounded-3xl border p-3 shadow-xl">
								<MediaFrame.Content className="overflow-hidden rounded-2xl">
									<ImageZoom
										src={image}
										alt="Composable Acme dashboard"
										className="size-full object-cover"
										sizes="(max-width: 1024px) 100vw, 60vw"
									/>
								</MediaFrame.Content>
							</MediaFrame>
						</Entrance.Fade>
					</Section.Content>
				</Container>
			</Section>
		</Main>
	)
}
