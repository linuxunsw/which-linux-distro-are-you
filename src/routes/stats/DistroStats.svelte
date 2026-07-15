<script lang="ts">
	import { Arc, PieChart, Text } from "layerchart";
	import * as Chart from "$lib/components/ui/chart/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
  import type { DistroFrequencies } from "$lib/server/stats";
  import distros from "$lib/distros";

	type Props = {
	  statistic: DistroFrequencies;
	}
	const { statistic }: Props = $props();

	const chartData = $derived(Object.entries(statistic.value).map(([id, freq]) => {
  	const distro = distros.find(d => d.id === id)!;
	  return {
			key: id,
			title: distro.name,
			freq,
			color: distro.color,
		};
	}));

	const chartConfig = {
		visitors: { label: "Visitors" },
		chrome: { label: "Chrome", color: "var(--chart-1)" },
		safari: { label: "Safari", color: "var(--chart-2)" },
		firefox: { label: "Firefox", color: "var(--chart-3)" },
		edge: { label: "Edge", color: "var(--chart-4)" },
		other: { label: "Other", color: "var(--chart-5)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root class="flex flex-col">
	<Card.Header class="items-center">
		<Card.Title>Distro Suggestions</Card.Title>
		<!-- <Card.Description>January - June 2024</Card.Description> -->
	</Card.Header>
	<Card.Content class="flex-1">
		<Chart.Container config={chartConfig} class="mx-auto aspect-square max-h-62.5">
			<PieChart
				data={chartData}
				key="key"
				value="freq"
				cRange={chartData.map((d) => d.color)}
				c="color"
				props={{
					pie: {
						motion: "tween",
					},
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
				{/snippet}
				{#snippet arc({ props, visibleData, index })}
					<Arc {...props}>
						{#snippet children({ getArcTextProps })}
							<Text
								value={visibleData[index].title}
								{...getArcTextProps("outer", {
									startOffset: "50%",
									outerPadding: 10,
								})}
								class="fill-foreground"
							/>
						{/snippet}
					</Arc>
				{/snippet}
			</PieChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
