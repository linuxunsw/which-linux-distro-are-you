<script lang="ts">
	import { scaleBand } from "d3-scale";
	import { BarChart } from "layerchart";
	import * as Chart from "$lib/components/ui/chart/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { cubicInOut } from "svelte/easing";
  import type { QuestionStats } from "$lib/server/stats";
  import questions from "$lib/questions";

  type Props = {
    statistic: QuestionStats;
  }
  const { statistic }: Props = $props();

	const q = $derived(questions.find(q => q.id === statistic.id))!;
	const frequencies = $derived(statistic.value);

	const chartData = $derived.by(() => {
  	console.log(frequencies);
  	const data = frequencies.map(((v, i) => ({ label: `${i + 1}`, value: v })));
    const [lhs, rhs] = q.bounds ?? ['Disagree', 'Agree'];
    data[0].label = lhs;
    data[4].label = rhs;
    console.log(data);
    return data;
	});

	const chartConfig = {
		desktop: { label: "Desktop", color: "var(--chart-1)" },
	} satisfies Chart.ChartConfig;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{q.q}</Card.Title>
		<Card.Description>Distribution of answers</Card.Description>
	</Card.Header>
	<Card.Content>
		<Chart.Container config={chartConfig}>
			<BarChart
				data={chartData}
				xScale={scaleBand().padding(0.25)}
				axis="x"
				x="label"
				series={[{ key: "value", label: "Frequencies", color: chartConfig.desktop.color }]}
				props={{
					bars: {
						stroke: "none",
						rounded: "all",
						radius: 8,
						motion: { type: "tween", duration: 500, easing: cubicInOut },
					},
					highlight: { area: { fill: "none" } },
				}}
			>
				{#snippet tooltip()}
					<Chart.Tooltip hideLabel />
				{/snippet}
			</BarChart>
		</Chart.Container>
	</Card.Content>
</Card.Root>
