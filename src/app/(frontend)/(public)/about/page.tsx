import {
    Container,
    LayoutHeader,
    SectionHeader,
    SectionSpacing,
} from '@/components/layout/elements';
import { Main } from '@/components/layout/main';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';


import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { remark } from 'remark';
import html from 'remark-html';

async function getChangelogContent() {
	try {
		const changelogPath = join(process.cwd(), 'CHANGELOG.md')
		const fileContents = readFileSync(changelogPath, 'utf8')

		const processedContent = await remark().use(html).process(fileContents)
		const contentHtml = processedContent.toString()

		return contentHtml
	} catch (error) {
		console.error('Error reading changelog:', error)
		return null
	}
}

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
	const changelogHtml = await getChangelogContent()
	const { dependencies, devDependencies } = await getPackageJson()

	const sortedDependencies = sortDependencies(dependencies)
	const sortedDevDependencies = sortDependencies(devDependencies)

	return (
		<Main>
			<LayoutHeader
				title="About"
				badge="Template"
				description="Learn about this starter template, view the changelog, and see what packages are included."
			/>

			<SectionSpacing>
				{/* Dependencies Section */}
				<Container>
					<SectionHeader
						title="Dependencies"
						badge="Packages"
						description="Production dependencies included in this starter template."
					/>
					<div className="mt-8">
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
					</div>
				</Container>

				{/* DevDependencies Section */}
				<Container>
					<SectionHeader
						title="Dev Dependencies"
						badge="Development"
						description="Development dependencies used for building and tooling."
					/>
					<div className="mt-8">
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
					</div>
				</Container>
			</SectionSpacing>
		</Main>
	)
}
