import { Container, Section } from '@/components/layout'
import { Entrance } from '@/components/motion-primitives'
import { Main } from '@/components/shell/main'
import { Badge } from '@/components/ui/badge'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { readFileSync } from 'node:fs'
import { join } from 'node:path'

async function getPackageJson() {
	try {
		const packageJsonPath = join(process.cwd(), 'package.json')
		const fileContents = readFileSync(packageJsonPath, 'utf8')
		const packageJson = JSON.parse(fileContents)

		return {
			dependencies: packageJson.dependencies || {},
			devDependencies: packageJson.devDependencies || {},
		}
	} catch (error) {
		console.error('Error reading package.json:', error)
		return {
			dependencies: {},
			devDependencies: {},
		}
	}
}

function sortDependencies(deps: Record<string, string>) {
	return Object.entries(deps).toSorted(([a], [b]) => a.localeCompare(b))
}

export default async function AboutPage() {
	const { dependencies, devDependencies } = await getPackageJson()

	const sortedDependencies = sortDependencies(dependencies)
	const sortedDevDependencies = sortDependencies(devDependencies)

	return (
		<Main>
			<Section spacing="sm" aria-labelledby="about-title">
				<Container>
					<Entrance render={<Section.Header />}>
						<Section.Eyebrow>Template</Section.Eyebrow>
						<Section.Title id="about-title" render={<h1 />}>
							About
						</Section.Title>
						<Section.Description>
							Learn about this starter template, view the changelog, and see what packages are
							included.
						</Section.Description>
					</Entrance>
				</Container>
			</Section>

			<Section aria-labelledby="dependencies-title">
				<Container>
					<Entrance render={<Section.Header />}>
						<Section.Eyebrow>Packages</Section.Eyebrow>
						<Section.Title id="dependencies-title">Dependencies</Section.Title>
						<Section.Description>
							Production dependencies included in this starter template.
						</Section.Description>
					</Entrance>
					<Section.Content className="mt-8">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Package Name</TableHead>
									<TableHead>Version</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sortedDependencies.length > 0 ? (
									sortedDependencies.map(([name, version]) => (
										<TableRow key={name}>
											<TableCell className="font-mono text-sm">{name}</TableCell>
											<TableCell>
												<Badge variant="outline" className="font-mono text-xs">
													{version}
												</Badge>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={2} className="text-muted-foreground text-center">
											No dependencies found
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</Section.Content>
				</Container>
			</Section>

			<Section variant="muted" aria-labelledby="dev-dependencies-title">
				<Container>
					<Section.Header>
						<Section.Eyebrow>Development</Section.Eyebrow>
						<Section.Title id="dev-dependencies-title">Dev Dependencies</Section.Title>
						<Section.Description>
							Development dependencies used for building and tooling.
						</Section.Description>
					</Section.Header>
					<Section.Content className="mt-8">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Package Name</TableHead>
									<TableHead>Version</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sortedDevDependencies.length > 0 ? (
									sortedDevDependencies.map(([name, version]) => (
										<TableRow key={name}>
											<TableCell className="font-mono text-sm">{name}</TableCell>
											<TableCell>
												<Badge variant="outline" className="font-mono text-xs">
													{version}
												</Badge>
											</TableCell>
										</TableRow>
									))
								) : (
									<TableRow>
										<TableCell colSpan={2} className="text-muted-foreground text-center">
											No dev dependencies found
										</TableCell>
									</TableRow>
								)}
							</TableBody>
						</Table>
					</Section.Content>
				</Container>
			</Section>
		</Main>
	)
}
